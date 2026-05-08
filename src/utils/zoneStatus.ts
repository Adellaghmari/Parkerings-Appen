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
      return "Ledigt";
    case "medium":
      return "Osäkert";
    case "low":
      return "Fullt";
    case "unknown":
      return "Okänd";
  }
};

export const statusDescription = (status: ZoneStatus) => {
  switch (status) {
    case "high":
      return "Grönt betyder att det finns flera lediga platser.";
    case "medium":
      return "Orange betyder att det finns få platser kvar eller osäker ledighet.";
    case "low":
      return "Rött betyder att parkeringen är full just nu.";
    case "unknown":
      return "Grått betyder att ledighet saknas för den här platsen.";
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
