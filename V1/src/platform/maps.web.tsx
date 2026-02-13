import { Text, View } from "react-native";
import type { ComponentType, PropsWithChildren } from "react";

export type Region = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

type MapViewProps = PropsWithChildren<{
  style?: unknown;
  initialRegion?: Region;
  region?: Region;
  onRegionChangeComplete?: (region: Region) => void;
  showsUserLocation?: boolean;
  showsMyLocationButton?: boolean;
  rotateEnabled?: boolean;
  customMapStyle?: unknown;
}>;

type MarkerProps = PropsWithChildren<{
  coordinate: { latitude: number; longitude: number };
  title?: string;
  onPress?: () => void;
}>;

type PolylineProps = {
  coordinates: { latitude: number; longitude: number }[];
  strokeColor?: string;
  strokeWidth?: number;
};

export const MapView: ComponentType<MapViewProps> = ({ children }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#f1f5f9",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
    }}
  >
    <View
      style={{
        backgroundColor: "#ffffff",
        padding: 16,
        borderRadius: 12,
        maxWidth: 360,
      }}
    >
      <Text style={{ fontSize: 14, fontWeight: "700", color: "#0f172a" }}>
        Kartvy stöds inte i webben
      </Text>
      <Text style={{ marginTop: 6, fontSize: 12, color: "#64748b" }}>
        Öppna appen i Expo Go för att se karta och zoner.
      </Text>
    </View>
    {children}
  </View>
);

export const Marker: ComponentType<MarkerProps> = () => null;
export const Polyline: ComponentType<PolylineProps> = () => null;
