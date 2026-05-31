import { useEffect, useMemo, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import * as Location from "expo-location";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { fetchZones } from "../api/zones";
import { useAppStore } from "../store/useAppStore";
import { EmptyState } from "../components/EmptyState";
import { PrimaryButton } from "../components/PrimaryButton";
import { distanceKm } from "../utils/distance";
import { recommendZone, findAlternativeZone } from "../utils/recommendation";
import { MapPin } from "../components/MapPin";
import { MapView, Marker, Polyline, type Region } from "../platform/maps";
import { mapStyleDark, softMapStyle } from "../utils/mapStyle";
import { t } from "../utils/i18n";

type Props = NativeStackScreenProps<RootStackParamList, "RoutePreview">;

export const RoutePreviewScreen = ({ navigation }: Props) => {
  const destination = useAppStore((state) => state.destination);
  const setSelectedZone = useAppStore((state) => state.setSelectedZone);
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number }>();
  const mapRef = useRef<any>(null);

  const { data: zones } = useQuery({
    queryKey: ["zones"],
    queryFn: fetchZones,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        const req = await Location.requestForegroundPermissionsAsync();
        status = req.status;
      }
      if (status !== "granted" || cancelled) {
        return;
      }
      const position = await Location.getCurrentPositionAsync({});
      if (cancelled) {
        return;
      }
      setUserCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!userCoords || !destination) {
      return;
    }
    const t = setTimeout(() => {
      mapRef.current?.fitToCoordinates(
        [
          { latitude: userCoords.lat, longitude: userCoords.lng },
          {
            latitude: destination.coords.lat,
            longitude: destination.coords.lng,
          },
        ],
        {
          edgePadding: { top: 72, right: 28, bottom: 300, left: 28 },
          animated: true,
        }
      );
    }, 400);
    return () => clearTimeout(t);
  }, [userCoords, destination]);

  const remainingKm = useMemo(() => {
    if (!destination || !userCoords) {
      return null;
    }
    return distanceKm(userCoords, destination.coords);
  }, [destination, userCoords]);

  const recommended = useMemo(() => {
    if (!destination || !zones) {
      return null;
    }
    return recommendZone(zones, destination.coords, 2);
  }, [destination, zones]);

  const nearestOptions = useMemo(() => {
    if (!destination || !zones) {
      return [];
    }
    return [...zones]
      .map((zone) => ({
        zone,
        distance: distanceKm(destination.coords, zone.coords),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((item) => item.zone);
  }, [destination, zones]);

  const alternative = useMemo(() => {
    if (!destination || !zones) {
      return null;
    }
    return findAlternativeZone(zones, destination.coords);
  }, [destination, zones]);

  if (!destination) {
    return (
      <View style={styles.center}>
        <EmptyState
          title="Ingen destination vald"
          description="Sök efter en destination för att se rutt och rekommendation."
        />
        <View style={styles.actions}>
          <PrimaryButton
            title="Sök destination"
            onPress={() => navigation.navigate("SearchModal")}
          />
        </View>
      </View>
    );
  }

  const initialRegion: Region = {
    latitude: destination.coords.lat,
    longitude: destination.coords.lng,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={initialRegion}
        customMapStyle={theme === "dark" ? mapStyleDark : softMapStyle}
        showsUserLocation={false}
      >
        {userCoords ? (
          <Marker
            coordinate={{ latitude: userCoords.lat, longitude: userCoords.lng }}
            title="Du"
          />
        ) : null}
        <Marker
          coordinate={{
            latitude: destination.coords.lat,
            longitude: destination.coords.lng,
          }}
          title={destination.name}
        />
        {recommended ? (
          <Marker
            coordinate={{
              latitude: recommended.coords.lat,
              longitude: recommended.coords.lng,
            }}
            onPress={() => setSelectedZone(recommended)}
          >
            <MapPin zone={recommended} />
          </Marker>
        ) : null}
        {userCoords ? (
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

      <View style={styles.topBar}>
        <Pressable
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>← Tillbaka</Text>
        </Pressable>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: theme === "dark" ? "#f1f5f9" : "#0f172a" },
          ]}
        >
          Rutt mot {destination.name}
        </Text>
        {remainingKm !== null ? (
          <Text
            style={[
              styles.subtitle,
              { color: theme === "dark" ? "#94a3b8" : "#64748b" },
            ]}
          >
            Avstånd kvar: {remainingKm.toFixed(1)} km
          </Text>
        ) : null}
        {remainingKm !== null && remainingKm <= 2 ? (
          <Text
            style={[
              styles.notice,
              { color: theme === "dark" ? "#e2e8f0" : "#0f172a" },
            ]}
          >
            Du är inom 2 km – rekommenderad zon visas.
          </Text>
        ) : (
          <Text
            style={[
              styles.notice,
              { color: theme === "dark" ? "#e2e8f0" : "#0f172a" },
            ]}
          >
            När du är inom 2 km föreslår vi bästa zonen.
          </Text>
        )}

        {recommended ? (
          <View style={styles.recommendation}>
            <Text
              style={[
                styles.recommendTitle,
                { color: theme === "dark" ? "#94a3b8" : "#475569" },
              ]}
            >
              Rekommenderad zon
            </Text>
            <Text
              style={[
                styles.recommendName,
                { color: theme === "dark" ? "#f1f5f9" : "#0f172a" },
              ]}
            >
              {recommended.name}
            </Text>
            <PrimaryButton
              title="Navigera till zon"
              onPress={() => {
                setSelectedZone(recommended);
                navigation.goBack();
              }}
            />
          </View>
        ) : null}

        {nearestOptions.length > 0 ? (
          <View style={styles.altList}>
            <Text
              style={[
                styles.recommendTitle,
                { color: theme === "dark" ? "#94a3b8" : "#475569" },
              ]}
            >
              Flera alternativ
            </Text>
            {nearestOptions.map((zone) => (
              <Text
                key={zone.id}
                style={[
                  styles.alt,
                  { color: theme === "dark" ? "#94a3b8" : "#64748b" },
                ]}
              >
                • {zone.name} ({zone.operator})
              </Text>
            ))}
          </View>
        ) : null}

        {alternative ? (
          <Text
            style={[
              styles.alt,
              { color: theme === "dark" ? "#94a3b8" : "#64748b" },
            ]}
          >
            Alternativ nära: {alternative.name}
          </Text>
        ) : null}

        <Text
          style={[
            styles.inAppHint,
            { color: theme === "dark" ? "#94a3b8" : "#64748b" },
          ]}
        >
          {t("followRouteInApp", language)}
        </Text>
        <View style={styles.actions}>
          <PrimaryButton
            title={t("backToMap", language)}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  topBar: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  back: {
    backgroundColor: "rgba(15,23,42,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  backText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748b",
  },
  notice: {
    marginTop: 8,
    fontSize: 12,
    color: "#0f172a",
  },
  recommendation: {
    marginTop: 12,
    gap: 6,
  },
  recommendTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  recommendName: {
    fontSize: 14,
    fontWeight: "700",
  },
  alt: {
    marginTop: 8,
    fontSize: 12,
    color: "#64748b",
  },
  altList: {
    marginTop: 10,
    gap: 4,
  },
  inAppHint: {
    marginTop: 8,
    fontSize: 12,
    color: "#64748b",
    lineHeight: 17,
  },
  actions: {
    marginTop: 12,
    gap: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#ffffff",
  },
});
