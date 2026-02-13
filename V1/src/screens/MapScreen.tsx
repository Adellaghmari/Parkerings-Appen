import { useEffect, useMemo, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { fetchZones, tickAvailability } from "../api/zones";
import { Zone } from "../types/zone";
import { MapPin } from "../components/MapPin";
import { Legend } from "../components/Legend";
import { ParkingDetailBottomSheet } from "../components/ParkingDetailBottomSheet";
import { NearestParkingSheet } from "../components/NearestParkingSheet";
import { useAppStore } from "../store/useAppStore";
import { EmptyState } from "../components/EmptyState";
import { t } from "../utils/i18n";
import { MapView, Marker, Region } from "../platform/maps";
import { softMapStyle } from "../utils/mapStyle";
import { distanceKm } from "../utils/distance";

type Props = NativeStackScreenProps<RootStackParamList, "Map">;

const stockholmRegion: Region = {
  latitude: 59.3327,
  longitude: 18.0649,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export const MapScreen = ({ navigation }: Props) => {
  const language = useAppStore((state) => state.language);
  const hasPermission = useAppStore((state) => state.hasLocationPermission);
  const destination = useAppStore((state) => state.destination);
  const selectedZone = useAppStore((state) => state.selectedZone);
  const setSelectedZone = useAppStore((state) => state.setSelectedZone);
  const [region, setRegion] = useState<Region>(stockholmRegion);
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
    Location.getCurrentPositionAsync({}).then((position) => {
      setUserCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setRegion({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    });
  }, [hasPermission]);

  const openNavigation = async (zone: Zone) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${zone.coords.lat},${zone.coords.lng}`;
    await Linking.openURL(url);
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

  if (!hasPermission) {
    return (
      <View style={styles.center}>
        <EmptyState
          title="Platsdelning är avstängd"
          description="Gå till onboarding och slå på platsdelning för att se kartan."
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation
        showsMyLocationButton
        rotateEnabled={false}
        customMapStyle={softMapStyle}
      >
        {mapMarkers}
      </MapView>

      <View style={styles.legend}>
        <Legend />
      </View>

      <View style={styles.topBar}>
        <Pressable
          style={styles.home}
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: "Auth" }] })
          }
        >
          <Text style={styles.homeText}>🏠</Text>
        </Pressable>
        <Pressable
          style={styles.settings}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.settingsText}>☰</Text>
        </Pressable>
      </View>

      <View style={styles.searchRow}>
        <Pressable
          style={styles.searchButton}
          onPress={() => navigation.navigate("SearchModal")}
        >
          <Text style={styles.searchText}>{t("searchDestination", language)}</Text>
        </Pressable>
        <Pressable style={styles.nearestButton} onPress={buildNearestZones}>
          <Text style={styles.nearestText}>Närmast parkering</Text>
        </Pressable>
      </View>

      {selectedZone ? (
        <ParkingDetailBottomSheet
          zone={selectedZone}
          onNavigate={() => openNavigation(selectedZone)}
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
    top: 140,
    left: 16,
  },
  topBar: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  home: {
    backgroundColor: "rgba(15,23,42,0.7)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  homeText: {
    color: "#ffffff",
    fontSize: 16,
  },
  settings: {
    backgroundColor: "rgba(15,23,42,0.7)",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsText: {
    color: "#ffffff",
    fontSize: 16,
  },
  searchRow: {
    position: "absolute",
    top: 70,
    left: 16,
    right: 16,
    gap: 8,
  },
  searchButton: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  searchText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  nearestButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  nearestText: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
});
