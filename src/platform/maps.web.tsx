import "leaflet/dist/leaflet.css";
import { View } from "react-native";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type Ref,
} from "react";
import type { ComponentType, PropsWithChildren } from "react";
import {
  CircleMarker,
  MapContainer,
  Polygon as LeafletPolygon,
  Polyline as LeafletPolyline,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import type { LatLngBoundsExpression, LatLngExpression, Map as LeafletMap } from "leaflet";

const WebMapContainer = MapContainer as any;
const WebTileLayer = TileLayer as any;
const WebCircleMarker = CircleMarker as any;
const WebPolyline = LeafletPolyline as any;
const WebPolygon = LeafletPolygon as any;

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
  onMapReady?: () => void;
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

type PolygonProps = {
  coordinates: { latitude: number; longitude: number }[];
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
};

const MIN_ZOOM = 4;
const MAX_ZOOM = 18;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const deltaToZoom = (longitudeDelta?: number) => {
  if (!longitudeDelta || longitudeDelta <= 0) {
    return 13;
  }
  const z = Math.round(Math.log2(360 / longitudeDelta));
  return clamp(z, MIN_ZOOM, MAX_ZOOM);
};

const toRegionFromMap = (map: LeafletMap): Region => {
  const center = map.getCenter();
  const bounds = map.getBounds();
  return {
    latitude: center.lat,
    longitude: center.lng,
    latitudeDelta: Math.abs(bounds.getNorth() - bounds.getSouth()),
    longitudeDelta: Math.abs(bounds.getEast() - bounds.getWest()),
  };
};

const RegionEvents = ({
  onRegionChangeComplete,
}: {
  onRegionChangeComplete?: (region: Region) => void;
}) => {
  useMapEvents({
    moveend(mapEvent: any) {
      onRegionChangeComplete?.(toRegionFromMap(mapEvent.target));
    },
  });
  return null;
};

const defaultRegion: Region = {
  latitude: 59.3327,
  longitude: 18.0649,
  latitudeDelta: 0.08,
  longitudeDelta: 0.08,
};

export const MapView = forwardRef<unknown, MapViewProps>(function WebMap(
  { children, onMapReady, initialRegion, onRegionChangeComplete }: MapViewProps,
  _ref: Ref<unknown>
) {
  const mapRef = useRef<LeafletMap | null>(null);
  const startRegion = initialRegion ?? defaultRegion;
  const center = useMemo<LatLngExpression>(
    () => [startRegion.latitude, startRegion.longitude],
    [startRegion.latitude, startRegion.longitude]
  );
  const zoom = useMemo(
    () => deltaToZoom(startRegion.longitudeDelta),
    [startRegion.longitudeDelta]
  );

  useImperativeHandle(_ref, () => ({
    animateToRegion(nextRegion: Region) {
      mapRef.current?.setView(
        [nextRegion.latitude, nextRegion.longitude],
        deltaToZoom(nextRegion.longitudeDelta)
      );
    },
    fitToCoordinates(
      coordinates: { latitude: number; longitude: number }[],
      options?: { edgePadding?: { top: number; right: number; bottom: number; left: number } }
    ) {
      if (!mapRef.current || coordinates.length === 0) {
        return;
      }
      const bounds: LatLngBoundsExpression = coordinates.map((c) => [
        c.latitude,
        c.longitude,
      ]);
      mapRef.current.fitBounds(bounds, {
        paddingTopLeft: options?.edgePadding
          ? [options.edgePadding.left, options.edgePadding.top]
          : [24, 24],
        paddingBottomRight: options?.edgePadding
          ? [options.edgePadding.right, options.edgePadding.bottom]
          : [24, 24],
      });
    },
  }));

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    onMapReady?.();
  }, [onMapReady]);

  return (
    <View style={{ flex: 1 }}>
      <WebMapContainer
        center={center}
        zoom={zoom}
        minZoom={MIN_ZOOM}
        maxZoom={MAX_ZOOM}
        style={{ height: "100%", width: "100%" }}
        ref={(map: LeafletMap | null) => {
          mapRef.current = map;
          onMapReady?.();
        }}
      >
        <WebTileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RegionEvents onRegionChangeComplete={onRegionChangeComplete} />
        {children}
      </WebMapContainer>
    </View>
  );
}) as unknown as ComponentType<MapViewProps>;

export const Marker: ComponentType<MarkerProps> = ({
  coordinate,
  onPress,
}: MarkerProps) => (
  <WebCircleMarker
    center={[coordinate.latitude, coordinate.longitude]}
    radius={7}
    pathOptions={{ color: "#0f172a", fillColor: "#0ea5e9", fillOpacity: 0.95, weight: 1.5 }}
    eventHandlers={
      onPress
        ? {
            click: () => onPress(),
          }
        : undefined
    }
  />
);

export const Polyline: ComponentType<PolylineProps> = ({
  coordinates,
  strokeColor,
  strokeWidth,
}: PolylineProps) => (
  <WebPolyline
    positions={coordinates.map((c) => [c.latitude, c.longitude] as LatLngExpression)}
    pathOptions={{
      color: strokeColor ?? "#0ea5e9",
      weight: strokeWidth ?? 4,
      opacity: 0.85,
    }}
  />
);

export const Polygon: ComponentType<PolygonProps> = ({
  coordinates,
  fillColor,
  strokeColor,
  strokeWidth,
}: PolygonProps) => (
  <WebPolygon
    positions={coordinates.map((c) => [c.latitude, c.longitude] as LatLngExpression)}
    pathOptions={{
      fillColor: fillColor ?? "rgba(14,165,233,0.28)",
      fillOpacity: 0.35,
      color: strokeColor ?? "#0f172a",
      weight: strokeWidth ?? 1.5,
    }}
  />
);
