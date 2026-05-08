/**
 * Cirkel-exkludering: (lat−lat0)² + (lng−lng0)² < r2 ⇒ ingen mock-zon där.
 * Justerbart. Zoner placeras också längs sträckor i `roadPathClusters.ts`.
 */
export type ExclusionBlob = {
  lat: number;
  lng: number;
  r2: number;
  label?: string;
  kind?: "water" | "nature" | "other";
};

export const extraExclusionBlobs: ExclusionBlob[] = [
  { lat: 59.27, lng: 17.902, r2: 0.00135, label: "Mälaren Vårby syd", kind: "water" },
  { lat: 59.262, lng: 17.91, r2: 0.0011, label: "Mälaren söder Tullingesidan", kind: "water" },
  { lat: 59.255, lng: 18.0, r2: 0.00075, label: "Gömmaren / Haga vattennära", kind: "water" },
  { lat: 59.244, lng: 18.03, r2: 0.0009, label: "Gömmaren östra", kind: "water" },
  { lat: 59.248, lng: 18.05, r2: 0.00065, kind: "nature" },
  { lat: 59.252, lng: 18.04, r2: 0.0006, label: "Gömsta Äng syd", kind: "nature" },
  { lat: 59.238, lng: 18.06, r2: 0.00055, kind: "nature" },
  { lat: 59.315, lng: 18.14, r2: 0.00065, label: "Skogsö syd", kind: "nature" },
  { lat: 59.327, lng: 18.11, r2: 0.0005, kind: "nature" },
  { lat: 59.2, lng: 18.42, r2: 0.00055, kind: "nature" },
  { lat: 59.32, lng: 18.38, r2: 0.00055, kind: "nature" },
  { lat: 59.265, lng: 17.99, r2: 0.0006, label: "Gömmaren nordväst", kind: "nature" },
  { lat: 59.26, lng: 18.04, r2: 0.00055, kind: "nature" },
];
