import BaseMapView, { Marker, Polygon, Polyline, Region } from "react-native-maps";
import ClusteredMapView from "react-native-map-clustering";

export { Marker, Polygon, Polyline };
export type { Region };

export const MapView = ClusteredMapView ?? BaseMapView;
