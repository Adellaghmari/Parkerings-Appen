import { Zone } from "../types/zone";

export type ZoneStatus = "high" | "medium" | "low" | "unknown";

export const getZoneStatus = (zone: Zone): ZoneStatus => {
  if (zone.free === null) {
    return "unknown";
  }
  if (zone.free >= 5) {
    return "high";
  }
  if (zone.free >= 1) {
    return "medium";
  }
  return "low";
};

export const statusLabel = (status: ZoneStatus) => {
  switch (status) {
    case "high":
      return "Hög chans";
    case "medium":
      return "Osäker";
    case "low":
      return "Ingen ledighet";
    case "unknown":
      return "Okänd";
  }
};

export const statusColor = (status: ZoneStatus) => {
  switch (status) {
    case "high":
      return "#16a34a";
    case "medium":
      return "#f97316";
    case "low":
      return "#dc2626";
    case "unknown":
      return "#64748b";
  }
};
