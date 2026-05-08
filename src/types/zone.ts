export type City =
  | "Stockholm"
  | "Göteborg"
  | "Malmö"
  | "Uppsala"
  | "Linköping"
  | "Sverige";

export type ZoneType = "street" | "garage" | "free";

export type Zone = {
  id: string;
  name: string;
  operator: string;
  city: City;
  coords: { lat: number; lng: number };
  /** Approximerad yta för kartan (färg per operatör). */
  polygon?: { latitude: number; longitude: number }[];
  capacity: number;
  free: number | null;
  pricing: { perHour: number | null; note?: string };
  type: ZoneType;
  supports: { ev?: boolean; disabled?: boolean; wide?: boolean };
};
