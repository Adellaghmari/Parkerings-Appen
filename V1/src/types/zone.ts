export type City =
  | "Stockholm"
  | "Göteborg"
  | "Malmö"
  | "Uppsala"
  | "Linköping";

export type ZoneType = "street" | "garage" | "free";

export type Zone = {
  id: string;
  name: string;
  operator: string;
  city: City;
  coords: { lat: number; lng: number };
  capacity: number;
  free: number | null;
  pricing: { perHour: number | null; note?: string };
  type: ZoneType;
  supports: { ev?: boolean; disabled?: boolean; wide?: boolean };
};
