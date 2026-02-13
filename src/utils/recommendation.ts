import { Zone } from "../types/zone";
import { distanceKm } from "./distance";
import { getZoneStatus, ZoneStatus } from "./zoneStatus";

const statusRank: Record<ZoneStatus, number> = {
  high: 0,
  medium: 1,
  low: 2,
  unknown: 3,
};

export const recommendZone = (
  zones: Zone[],
  destination: { lat: number; lng: number },
  maxDistanceKm = 2
) => {
  const candidates = zones
    .map((zone) => ({
      zone,
      distance: distanceKm(zone.coords, destination),
      status: getZoneStatus(zone),
    }))
    .filter((item) => item.distance <= maxDistanceKm)
    .sort((a, b) => {
      if (statusRank[a.status] !== statusRank[b.status]) {
        return statusRank[a.status] - statusRank[b.status];
      }
      return a.distance - b.distance;
    });

  return candidates[0]?.zone ?? null;
};

export const findAlternativeZone = (
  zones: Zone[],
  destination: { lat: number; lng: number },
  minDistanceKm = 0.5,
  maxDistanceKm = 1.0
) => {
  const candidates = zones
    .map((zone) => ({
      zone,
      distance: distanceKm(zone.coords, destination),
      status: getZoneStatus(zone),
    }))
    .filter(
      (item) => item.distance >= minDistanceKm && item.distance <= maxDistanceKm
    )
    .sort((a, b) => {
      if (statusRank[a.status] !== statusRank[b.status]) {
        return statusRank[a.status] - statusRank[b.status];
      }
      return a.distance - b.distance;
    });

  return candidates[0]?.zone ?? null;
};
