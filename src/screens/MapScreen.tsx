import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type NativeMapView from "react-native-maps";
import { RootStackParamList } from "../navigation/types";
import { fetchZones, tickAvailability } from "../api/zones";
import { Zone } from "../types/zone";
import { MapPin } from "../components/MapPin";
import { Legend } from "../components/Legend";
import { ParkingDetailBottomSheet } from "../components/ParkingDetailBottomSheet";
import { NearestParkingSheet } from "../components/NearestParkingSheet";
import { useAppStore } from "../store/useAppStore";
import { t } from "../utils/i18n";
import { MapView, Marker, Polygon, Polyline, type Region } from "../platform/maps";
import { softMapStyle } from "../utils/mapStyle";
import { mapStyleDark } from "../utils/mapStyle";
import { distanceKm } from "../utils/distance";
import { operatorColor, operatorFillColor } from "../utils/operatorColor";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

const stockholmRegion: Region = {
  latitude: 59.3327,
  longitude: 18.0649,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export const MapScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);
  const hasPermission = useAppStore((state) => state.hasLocationPermission);
  const destination = useAppStore((state) => state.destination);
  const selectedZone = useAppStore((state) => state.selectedZone);
  const setSelectedZone = useAppStore((state) => state.setSelectedZone);
  const setDestination = useAppStore((state) => state.setDestination);
  const mapRef = useRef<NativeMapView | null>(null);
  const [mapLayoutReady, setMapLayoutReady] = useState(false);
  const didInitialZoom = useRef(false);
  const [zones, setZones] = useState<Zone[]>([]);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>();
  const [nearestZones, setNearestZones] = useState<Zone[] | null>(null);

  const { data } = useQuery({
    queryKey: ["zones"],
    queryFn: fetchZones,
  });

  useEffect(() => {
    if (data) {
      setZones(data);
    }
  }, [data]);

  useEffect(() => {
    const interval = setInterval(() => {
      setZones((prev) => tickAvailability(prev));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!hasPermission) {
      return;
    }
    Location.getCurrentPositionAsync({})
      .then((position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      })
      .catch(() => {
        setUserCoords(undefined);
      });
  }, [hasPermission]);

  useEffect(() => {
    if (!mapLayoutReady || !userCoords || !mapRef.current || didInitialZoom.current) {
      return;
    }
    didInitialZoom.current = true;
    mapRef.current.animateToRegion(
      {
        latitude: userCoords.lat,
        longitude: userCoords.lng,
        latitudeDelta: 0.042,
        longitudeDelta: 0.042,
      },
      650
    );
  }, [mapLayoutReady, userCoords]);

  const zoomToMyLocation = useCallback(() => {
    if (!userCoords || !mapRef.current) {
      return;
    }
    mapRef.current.animateToRegion(
      {
        latitude: userCoords.lat,
        longitude: userCoords.lng,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      },
      500
    );
  }, [userCoords]);

  const startInAppNavigation = (zone: Zone) => {
    setDestination({ name: zone.name, coords: zone.coords });
    setSelectedZone(null);
    navigation.navigate("RoutePreview");
  };

  const buildNearestZones = () => {
    const base =
      destination?.coords ??
      (userCoords ? { lat: userCoords.lat, lng: userCoords.lng } : null);
    if (!base) {
      return;
    }
    const sorted = [...zones]
      .map((zone) => ({
        zone,
        distance: distanceKm(base, zone.coords),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 5)
      .map((item) => item.zone);
    setNearestZones(sorted);
  };

  const mapStyle = theme === "dark" ? mapStyleDark : softMapStyle;

  const mapPolygons = useMemo(
    () =>
      zones
        .filter((z) => z.polygon && z.polygon.length >= 3)
        .map((zone) => {
          const stroke = operatorColor(zone.operator);
          return (
            <Polygon
              key={`poly-${zone.id}`}
              coordinates={zone.polygon!}
              fillColor={operatorFillColor(zone.operator, 0.28)}
              strokeColor={stroke}
              strokeWidth={1.5}
            />
          );
        }),
    [zones]
  );

  const mapMarkers = useMemo(
    () =>
      zones.map((zone) => (
        <Marker
          key={zone.id}
          coordinate={{ latitude: zone.coords.lat, longitude: zone.coords.lng }}
          onPress={() => setSelectedZone(zone)}
        >
          <MapPin zone={zone} isSelected={selectedZone?.id === zone.id} />
        </Marker>
      )),
    [zones, selectedZone, setSelectedZone]
  );

  const panel = "rgba(15,23,42,0.88)";
  const onPrimary = "#ffffff";
  const onSecondary = theme === "dark" ? "#e2e8f0" : "#0f172a";
  const secondaryBg =
    theme === "dark" ? "rgba(30,41,59,0.95)" : "rgba(255,255,255,0.98)";

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={stockholmRegion}
        onMapReady={() => setMapLayoutReady(true)}
        showsUserLocation={hasPermission}
        showsMyLocationButton={false}
        rotateEnabled={false}
        customMapStyle={mapStyle}
      >
        {mapPolygons}
        {mapMarkers}
        {userCoords && destination ? (
          <Polyline
            coordinates={[
              { latitude: userCoords.lat, longitude: userCoords.lng },
              {
                latitude: destination.coords.lat,
                longitude: destination.coords.lng,
              },
            ]}
            strokeColor="#0ea5e9"
            strokeWidth={4}
          />
        ) : null}
      </MapView>

      <View
        style={[
          styles.floatingRow,
          { top: insets.top + 10, left: 12, right: 12 },
        ]}
      >
        <View style={styles.leftButtons}>
          <Pressable
            style={[styles.pill, { backgroundColor: panel }]}
            onPress={() => navigation.navigate("SearchModal")}
          >
            <Text style={[styles.pillTextPrimary, { color: onPrimary }]}> 
              {t("searchDestination", language)}
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.pill,
              { backgroundColor: secondaryBg, borderWidth: 1, borderColor: "rgba(148,163,184,0.5)" },
            ]}
            onPress={buildNearestZones}
          >
            <Text style={[styles.pillTextSecondary, { color: onSecondary }]}> 
              {t("nearestParking", language)}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.pill, { backgroundColor: panel }]}
            onPress={zoomToMyLocation}
            disabled={!userCoords}
          >
            <Text style={[styles.pillTextPrimary, { color: onPrimary, opacity: userCoords ? 1 : 0.5 }]}> 
              {t("myLocation", language)}
            </Text>
          </Pressable>
        </View>
        <Pressable
          style={[styles.iconBtn, { backgroundColor: panel }]}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.iconBtnText}>⚙</Text>
        </Pressable>
      </View>

      <View style={styles.legend}>
        <Legend />
      </View>

      {selectedZone ? (
        <ParkingDetailBottomSheet
          zone={selectedZone}
          onNavigate={() => startInAppNavigation(selectedZone)}
          onPay={() => navigation.navigate("Payment")}
          onClose={() => setSelectedZone(null)}
        />
      ) : null}

      {nearestZones && nearestZones.length > 0 ? (
        <NearestParkingSheet
          zones={nearestZones}
          onSelect={(zone) => {
            setSelectedZone(zone);
            setNearestZones(null);
          }}
          onClose={() => setNearestZones(null)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  legend: {
    position: "absolute",
    bottom: 120,
    left: 10,
  },
  floatingRow: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 8,
  },
  leftButtons: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  pill: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  pillTextPrimary: {
    fontSize: 14,
    fontWeight: "700",
  },
  pillTextSecondary: {
    fontSize: 14,
    fontWeight: "700",
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBtnText: {
    color: "#ffffff",
    fontSize: 22,
  },
});
