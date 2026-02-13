import BaseMapView, { Marker, Polyline, Region } from "react-native-maps";
import ClusteredMapView from "react-native-map-clustering";

export { Marker, Polyline };
export type { Region };

export const MapView = ClusteredMapView ?? BaseMapView;
