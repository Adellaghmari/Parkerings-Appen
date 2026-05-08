import type { Zone, ZoneType } from "../types/zone";
import {
  type RoadPathCluster,
  stockholmRoads,
  swedenRoads,
} from "./roadPathClusters";
import { extraExclusionBlobs } from "./zoneExclusions";

const operators = [
  "EasyPark",
  "Aimo Park",
  "Parkster",
  "Stockholm Parkering",
  "Parkman",
] as const;

const typeCycle: ZoneType[] = ["street", "garage", "free"];

const hashPick = (n: number, mod: number) => {
  const x = Math.sin(n * 12.9898) * 10000;
  return Math.floor((x - Math.floor(x)) * mod);
};

/** Vatten/land + zoneExclusions.ts (extra cirklar). */
const baseExclusionBlobs: { lat: number; lng: number; r2: number }[] = [
  { lat: 59.32, lng: 17.92, r2: 0.0065 },
  { lat: 59.38, lng: 17.68, r2: 0.003 },
  { lat: 59.3, lng: 18.3, r2: 0.0028 },
  { lat: 59.25, lng: 18.2, r2: 0.0045 },
  { lat: 59.2, lng: 18.45, r2: 0.01 },
  { lat: 59.0, lng: 18.1, r2: 0.015 },
  { lat: 59.3, lng: 17.2, r2: 0.01 },
  { lat: 58.9, lng: 17.9, r2: 0.02 },
  { lat: 63.1, lng: 20.0, r2: 0.12 },
  { lat: 62.5, lng: 17.5, r2: 0.15 },
  { lat: 57.55, lng: 11.2, r2: 0.008 },
  { lat: 59.0, lng: 12.1, r2: 0.1 },
  { lat: 65.0, lng: 22.0, r2: 0.3 },
  { lat: 57.0, lng: 16.5, r2: 0.2 },
  { lat: 59.272, lng: 17.908, r2: 0.0011 },
  { lat: 59.258, lng: 17.918, r2: 0.0009 },
  { lat: 59.248, lng: 17.932, r2: 0.00075 },
  { lat: 59.265, lng: 17.925, r2: 0.00075 },
  { lat: 59.26, lng: 17.912, r2: 0.0007 },
];

const mergedExclusionBlobs: { lat: number; lng: number; r2: number }[] = [
  ...baseExclusionBlobs,
  ...extraExclusionBlobs.map(({ lat, lng, r2 }) => ({ lat, lng, r2 })),
];

function inExclusionZone(lat: number, lng: number): boolean {
  return mergedExclusionBlobs.some(
    (w) => (lat - w.lat) * (lat - w.lat) + (lng - w.lng) * (lng - w.lng) < w.r2
  );
}

/** Tätort om väg helt i exkludering. */
const URBAN_FALLBACKS: { lat: number; lng: number }[] = [
  { lat: 59.334, lng: 18.062 },
  { lat: 59.316, lng: 18.072 },
  { lat: 59.28, lng: 18.02 },
  { lat: 59.4, lng: 17.96 },
  { lat: 59.37, lng: 18.12 },
  { lat: 57.709, lng: 11.97 },
  { lat: 57.7, lng: 11.95 },
  { lat: 55.606, lng: 13.002 },
  { lat: 55.59, lng: 12.99 },
  { lat: 59.86, lng: 17.64 },
  { lat: 59.6, lng: 16.55 },
  { lat: 59.28, lng: 15.2 },
  { lat: 58.41, lng: 15.63 },
  { lat: 57.78, lng: 14.16 },
  { lat: 63.83, lng: 20.26 },
  { lat: 60.68, lng: 17.15 },
  { lat: 65.59, lng: 22.15 },
  { lat: 59.38, lng: 13.5 },
  { lat: 56.05, lng: 12.7 },
  { lat: 55.7, lng: 13.2 },
];

function safeUrbanPoint(seed: number): { lat: number; lng: number } {
  for (let o = 0; o < URBAN_FALLBACKS.length * 4; o += 1) {
    const base = URBAN_FALLBACKS[(seed + o) % URBAN_FALLBACKS.length];
    const u = 0.00012 * (1 + (o % 12));
    const a = hashPick(seed * 7 + o, 8);
    const lat = base.lat + ((a % 4) - 1.5) * u;
    const lng = base.lng + (((a >> 2) % 4) - 1.5) * u;
    if (!inExclusionZone(lat, lng)) {
      return { lat, lng };
    }
  }
  return URBAN_FALLBACKS[seed % URBAN_FALLBACKS.length];
}

/** `t` ∈ (0,1) längs polylinjen (båg-längd). */
function pointAlongPolyline(
  path: { lat: number; lng: number }[],
  t: number
): { lat: number; lng: number } {
  if (path.length === 0) {
    return { lat: 59.33, lng: 18.07 };
  }
  if (path.length === 1) {
    return { ...path[0] };
  }
  const segs: number[] = [];
  for (let i = 0; i < path.length - 1; i++) {
    segs.push(
      Math.hypot(
        path[i + 1].lat - path[i].lat,
        path[i + 1].lng - path[i].lng
      )
    );
  }
  const total = segs.reduce((a, b) => a + b, 0);
  if (total < 1e-12) {
    return { ...path[0] };
  }
  let u = t * total;
  for (let i = 0; i < segs.length; i++) {
    const s = segs[i];
    if (u < s || i === segs.length - 1) {
      const f = s > 0 ? u / s : 0;
      const a = path[i];
      const b = path[i + 1];
      return {
        lat: a.lat + f * (b.lat - a.lat),
        lng: a.lng + f * (b.lng - a.lng),
      };
    }
    u -= s;
  }
  const last = path[path.length - 1];
  return { ...last };
}

function findPointOutsideExclusion(
  path: { lat: number; lng: number }[],
  tPrefer: number,
  globalIdx: number
): { lat: number; lng: number } {
  const tryOrder = [tPrefer];
  for (let i = 0; i <= 48; i += 1) {
    tryOrder.push(0.02 + (i * 0.96) / 48);
  }
  for (const raw of tryOrder) {
    const t = Math.min(0.99, Math.max(0.01, raw));
    const p = pointAlongPolyline(path, t);
    if (!inExclusionZone(p.lat, p.lng)) {
      return p;
    }
  }
  const c = pointAlongPolyline(path, 0.5);
  for (let k = 1; k <= 140; k += 1) {
    const d = 0.000035 * k;
    const dirs: [number, number][] = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
      [0.7, 0.7],
      [0.7, -0.7],
      [-0.7, 0.7],
      [-0.7, -0.7],
    ];
    for (const [ux, uy] of dirs) {
      const lat = c.lat + uy * d;
      const lng = c.lng + ux * d;
      if (!inExclusionZone(lat, lng)) {
        return { lat, lng };
      }
    }
  }
  for (let s = 1; s <= 220; s += 1) {
    const lng = c.lng + s * 0.00004;
    const lat = c.lat;
    if (!inExclusionZone(lat, lng)) {
      return { lat, lng };
    }
  }
  for (let s = 1; s <= 220; s += 1) {
    const lat = c.lat + ((hashPick(globalIdx + s, 200) - 100) / 200) * 0.0005;
    const lng = c.lng - s * 0.00004;
    if (!inExclusionZone(lat, lng)) {
      return { lat, lng };
    }
  }
  for (const p of path) {
    if (!inExclusionZone(p.lat, p.lng)) {
      return { lat: p.lat, lng: p.lng };
    }
  }
  return safeUrbanPoint(tPrefer * 1e4 + globalIdx);
}

function alongRoadWithJitter(
  c: RoadPathCluster,
  pointIndex: number,
  globalIdx: number
): { lat: number; lng: number } {
  const { path, count } = c;
  if (count <= 0) {
    return pointAlongPolyline(path, 0.5);
  }
  const tBase = (pointIndex + 0.5) / count;
  for (let att = 0; att < 20; att++) {
    const jt =
      (hashPick(globalIdx * 31 + att * 7 + 3, 201) - 100) * 0.00028 * 0.12;
    const t = Math.min(0.98, Math.max(0.02, tBase + jt));
    const base = pointAlongPolyline(path, t);
    if (path.length < 2) {
      if (!inExclusionZone(base.lat, base.lng)) {
        return base;
      }
      continue;
    }
    if (!inExclusionZone(base.lat, base.lng)) {
      return { lat: base.lat, lng: base.lng };
    }
  }
  const t = Math.min(0.98, Math.max(0.02, tBase));
  const found = findPointOutsideExclusion(path, t, globalIdx);
  if (!inExclusionZone(found.lat, found.lng)) {
    return found;
  }
  return safeUrbanPoint(globalIdx);
}

function mockMetaForGeneratedZone(global: number) {
  const capacity = 10 + (hashPick(global, 100) as number);
  if (hashPick(global, 12) === 0) {
    return {
      capacity,
      free: null as number | null,
      type: "free" as const,
      pricing: {
        perHour: null,
        note: "Gratis",
      },
    };
  }
  const band = hashPick(global, 10);
  let free: number;
  let note: "Fullt" | "Stor chans" | "Ledigt";
  if (band <= 3) {
    const ratio = 0.02 + (hashPick(global + 1, 9) / 9) * 0.1;
    free = Math.min(capacity, Math.max(0, Math.floor(capacity * ratio)));
    note = "Fullt";
  } else if (band <= 5) {
    const t = 0.42 + (hashPick(global, 17) / 17) * 0.2;
    free = Math.min(capacity, Math.max(0, Math.round(capacity * t)));
    note = "Stor chans";
  } else if (band <= 8) {
    const t = 0.55 + (hashPick(global, 20) / 20) * 0.3;
    free = Math.min(capacity, Math.max(1, Math.round(capacity * t)));
    note = "Ledigt";
  } else {
    const t = 0.2 + (hashPick(global, 22) / 22) * 0.3;
    free = Math.min(capacity, Math.max(0, Math.round(capacity * t)));
    const f = free / Math.max(1, capacity);
    if (f < 0.2) {
      note = "Fullt";
    } else if (f < 0.55) {
      note = "Stor chans";
    } else {
      note = "Ledigt";
    }
  }
  return {
    capacity,
    free,
    type: typeCycle[global % typeCycle.length],
    pricing: {
      perHour: hashPick(global, 5) === 0 ? null : 8 + hashPick(global, 8) * 4,
      note,
    },
  };
}

function buildFromRoadClusters(
  clusters: RoadPathCluster[],
  idOffset: number
): Zone[] {
  const zones: Zone[] = [];
  let idx = 0;
  for (const c of clusters) {
    for (let n = 0; n < c.count; n++) {
      const global = idOffset + idx;
      const pt = alongRoadWithJitter(c, n, global);
      const op = operators[hashPick(global, operators.length)];
      const meta = mockMetaForGeneratedZone(global);
      zones.push({
        id: `gen-urban-${global}`,
        name: `P${c.label} ${n + 1}`,
        operator: op,
        city: c.city,
        coords: { lat: pt.lat, lng: pt.lng },
        capacity: meta.capacity,
        free: meta.free,
        pricing: meta.pricing,
        type: meta.type,
        supports: {},
      });
      idx += 1;
    }
  }
  return zones;
}

export const buildExtraZones = (): Zone[] => {
  const a = buildFromRoadClusters(stockholmRoads, 0);
  const b = buildFromRoadClusters(swedenRoads, a.length);
  return [...a, ...b];
};
