import type { City } from "../types/zone";

/** Zoner fördelas längs polylinjer; exkluderingar i `zoneExclusions.ts`. */
export type RoadPathCluster = {
  city: City;
  label: string;
  count: number;
  path: { lat: number; lng: number }[];
};

const L = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) => [
  { ...a },
  { ...b },
];

export const stockholmRoads: RoadPathCluster[] = [
  { city: "Stockholm", label: "Norrmalm", count: 8, path: L({ lat: 59.333, lng: 18.05 }, { lat: 59.33, lng: 18.1 }) },
  { city: "Stockholm", label: "Södermalm", count: 8, path: L({ lat: 59.32, lng: 18.06 }, { lat: 59.31, lng: 18.12 }) },
  { city: "Stockholm", label: "Kungsholmen", count: 6, path: L({ lat: 59.33, lng: 18.02 }, { lat: 59.33, lng: 18.06 }) },
  { city: "Stockholm", label: "Vasastan", count: 6, path: L({ lat: 59.35, lng: 18.02 }, { lat: 59.35, lng: 18.06 }) },
  { city: "Stockholm", label: "Östermalm", count: 6, path: L({ lat: 59.34, lng: 18.08 }, { lat: 59.35, lng: 18.12 }) },
  { city: "Stockholm", label: "Hammarby", count: 5, path: L({ lat: 59.3, lng: 18.08 }, { lat: 59.29, lng: 18.14 }) },
  { city: "Stockholm", label: "Globen", count: 5, path: L({ lat: 59.28, lng: 18.0 }, { lat: 59.28, lng: 18.03 }) },
  { city: "Stockholm", label: "Bromma", count: 5, path: L({ lat: 59.35, lng: 17.95 }, { lat: 59.36, lng: 18.0 }) },
  { city: "Stockholm", label: "Hässelby", count: 2, path: L({ lat: 59.36, lng: 17.86 }, { lat: 59.38, lng: 17.9 }) },
  { city: "Stockholm", label: "Tumba", count: 3, path: L({ lat: 59.2, lng: 17.9 }, { lat: 59.2, lng: 17.84 }) },
  { city: "Stockholm", label: "Flemingsberg", count: 2, path: L({ lat: 59.22, lng: 17.96 }, { lat: 59.22, lng: 18.0 }) },
  { city: "Stockholm", label: "Danderyd", count: 2, path: L({ lat: 59.4, lng: 18.0 }, { lat: 59.4, lng: 18.04 }) },
  { city: "Stockholm", label: "Sollentuna", count: 3, path: L({ lat: 59.42, lng: 17.96 }, { lat: 59.44, lng: 18.0 }) },
  { city: "Stockholm", label: "Täby C", count: 3, path: L({ lat: 59.44, lng: 18.06 }, { lat: 59.46, lng: 18.1 }) },
  { city: "Stockholm", label: "Nacka C", count: 2, path: L({ lat: 59.31, lng: 18.12 }, { lat: 59.32, lng: 18.17 }) },
  { city: "Stockholm", label: "Hägernäs", count: 2, path: L({ lat: 59.45, lng: 18.08 }, { lat: 59.47, lng: 18.11 }) },
  { city: "Stockholm", label: "Järfälla", count: 2, path: L({ lat: 59.42, lng: 17.84 }, { lat: 59.44, lng: 17.88 }) },
  { city: "Stockholm", label: "Kista", count: 3, path: L({ lat: 59.4, lng: 17.94 }, { lat: 59.4, lng: 17.99 }) },
  { city: "Stockholm", label: "Hägersten", count: 2, path: L({ lat: 59.3, lng: 17.99 }, { lat: 59.3, lng: 18.04 }) },
  { city: "Stockholm", label: "Liljeholmen", count: 2, path: L({ lat: 59.3, lng: 18.01 }, { lat: 59.3, lng: 18.04 }) },
  { city: "Stockholm", label: "Farsta", count: 2, path: L({ lat: 59.25, lng: 18.09 }, { lat: 59.24, lng: 18.12 }) },
  {
    city: "Stockholm",
    label: "Vårby",
    count: 2,
    path: L({ lat: 59.272, lng: 17.985 }, { lat: 59.252, lng: 18.018 }),
  },
  { city: "Stockholm", label: "Ekerö tätort", count: 1, path: L({ lat: 59.28, lng: 17.84 }, { lat: 59.28, lng: 17.81 }) },
  { city: "Stockholm", label: "Gustavsberg", count: 2, path: L({ lat: 59.32, lng: 18.35 }, { lat: 59.32, lng: 18.39 }) },
  { city: "Stockholm", label: "Alby", count: 2, path: L({ lat: 59.25, lng: 17.87 }, { lat: 59.24, lng: 17.89 }) },
  { city: "Stockholm", label: "Skärholmen", count: 2, path: L({ lat: 59.28, lng: 17.91 }, { lat: 59.27, lng: 17.96 }) },
  { city: "Stockholm", label: "Spånga", count: 2, path: L({ lat: 59.38, lng: 17.89 }, { lat: 59.4, lng: 17.92 }) },
  { city: "Stockholm", label: "Odenplan", count: 5, path: L({ lat: 59.342, lng: 18.045 }, { lat: 59.347, lng: 18.061 }) },
  { city: "Stockholm", label: "St Eriksplan", count: 4, path: L({ lat: 59.338, lng: 18.03 }, { lat: 59.342, lng: 18.045 }) },
  { city: "Stockholm", label: "Liljeholmskajen", count: 4, path: L({ lat: 59.308, lng: 18.018 }, { lat: 59.313, lng: 18.035 }) },
  { city: "Stockholm", label: "Årsta", count: 4, path: L({ lat: 59.296, lng: 18.035 }, { lat: 59.302, lng: 18.06 }) },
  { city: "Stockholm", label: "Telefonplan", count: 4, path: L({ lat: 59.298, lng: 17.995 }, { lat: 59.302, lng: 18.015 }) },
  { city: "Stockholm", label: "Solna Arenastaden", count: 5, path: L({ lat: 59.365, lng: 17.995 }, { lat: 59.373, lng: 18.012 }) },
  { city: "Stockholm", label: "Sundbyberg", count: 4, path: L({ lat: 59.36, lng: 17.955 }, { lat: 59.365, lng: 17.98 }) },
  { city: "Stockholm", label: "Kista Galleria", count: 4, path: L({ lat: 59.402, lng: 17.94 }, { lat: 59.406, lng: 17.955 }) },
  { city: "Stockholm", label: "Nacka Forum", count: 4, path: L({ lat: 59.309, lng: 18.158 }, { lat: 59.313, lng: 18.176 }) },
  { city: "Stockholm", label: "Sickla", count: 4, path: L({ lat: 59.304, lng: 18.12 }, { lat: 59.307, lng: 18.135 }) },
];

export const swedenRoads: RoadPathCluster[] = [
  { city: "Göteborg", label: "Centrum", count: 7, path: L({ lat: 57.707, lng: 11.965 }, { lat: 57.712, lng: 11.98 }) },
  { city: "Göteborg", label: "Hisingen", count: 5, path: L({ lat: 57.72, lng: 11.9 }, { lat: 57.72, lng: 11.95 }) },
  { city: "Malmö", label: "Centrum", count: 7, path: L({ lat: 55.606, lng: 12.995 }, { lat: 55.61, lng: 13.01 }) },
  { city: "Malmö", label: "Västra", count: 2, path: L({ lat: 55.6, lng: 12.95 }, { lat: 55.6, lng: 12.99 }) },
  { city: "Uppsala", label: "Centrum", count: 4, path: L({ lat: 59.858, lng: 17.63 }, { lat: 59.86, lng: 17.66 }) },
  { city: "Uppsala", label: "Fyris", count: 2, path: L({ lat: 59.86, lng: 17.64 }, { lat: 59.86, lng: 17.67 }) },
  { city: "Linköping", label: "Centrum", count: 3, path: L({ lat: 58.41, lng: 15.62 }, { lat: 58.41, lng: 15.65 }) },
  { city: "Sverige", label: "Västerås C", count: 3, path: L({ lat: 59.61, lng: 16.54 }, { lat: 59.62, lng: 16.58 }) },
  { city: "Sverige", label: "Örebro C", count: 3, path: L({ lat: 59.27, lng: 15.19 }, { lat: 59.28, lng: 15.23 }) },
  { city: "Sverige", label: "Norrköping C", count: 3, path: L({ lat: 58.6, lng: 16.19 }, { lat: 58.6, lng: 16.23 }) },
  { city: "Sverige", label: "Jönköping C", count: 3, path: L({ lat: 57.78, lng: 14.16 }, { lat: 57.78, lng: 14.2 }) },
  { city: "Sverige", label: "Helsingborg C", count: 3, path: L({ lat: 56.04, lng: 12.69 }, { lat: 56.05, lng: 12.73 }) },
  { city: "Sverige", label: "Lund C", count: 3, path: L({ lat: 55.7, lng: 13.19 }, { lat: 55.7, lng: 13.23 }) },
  { city: "Sverige", label: "Umeå C", count: 3, path: L({ lat: 63.83, lng: 20.25 }, { lat: 63.84, lng: 20.3 }) },
  { city: "Sverige", label: "Gävle C", count: 2, path: L({ lat: 60.68, lng: 17.14 }, { lat: 60.68, lng: 17.18 }) },
  { city: "Sverige", label: "Sundsvall C", count: 2, path: L({ lat: 62.39, lng: 17.29 }, { lat: 62.4, lng: 17.33 }) },
  { city: "Sverige", label: "Luleå C", count: 2, path: L({ lat: 65.58, lng: 22.14 }, { lat: 65.59, lng: 22.19 }) },
  { city: "Sverige", label: "Karlstad C", count: 2, path: L({ lat: 59.38, lng: 13.49 }, { lat: 59.38, lng: 13.53 }) },
  { city: "Sverige", label: "Borås C", count: 2, path: L({ lat: 57.72, lng: 12.91 }, { lat: 57.72, lng: 12.95 }) },
  { city: "Sverige", label: "Eskilstuna C", count: 2, path: L({ lat: 59.37, lng: 16.49 }, { lat: 59.38, lng: 16.53 }) },
  { city: "Sverige", label: "Gävle syd", count: 1, path: L({ lat: 60.64, lng: 17.09 }, { lat: 60.64, lng: 17.12 }) },
  { city: "Sverige", label: "Kalmar C", count: 2, path: L({ lat: 56.66, lng: 16.35 }, { lat: 56.66, lng: 16.39 }) },
  { city: "Sverige", label: "Växjö C", count: 2, path: L({ lat: 56.88, lng: 14.79 }, { lat: 56.88, lng: 14.83 }) },
  { city: "Sverige", label: "Östersund C", count: 2, path: L({ lat: 63.18, lng: 14.63 }, { lat: 63.19, lng: 14.67 }) },
  { city: "Sverige", label: "Falun C", count: 2, path: L({ lat: 60.6, lng: 15.63 }, { lat: 60.61, lng: 15.67 }) },
  { city: "Sverige", label: "Halmstad C", count: 2, path: L({ lat: 56.67, lng: 12.85 }, { lat: 56.67, lng: 12.88 }) },
  { city: "Sverige", label: "Kristianstad C", count: 2, path: L({ lat: 56.03, lng: 14.14 }, { lat: 56.03, lng: 14.18 }) },
  { city: "Sverige", label: "Landskrona C", count: 2, path: L({ lat: 55.87, lng: 12.82 }, { lat: 55.87, lng: 12.85 }) },
  { city: "Sverige", label: "Mariestad C", count: 1, path: L({ lat: 58.7, lng: 13.82 }, { lat: 58.7, lng: 13.85 }) },
  { city: "Sverige", label: "Skövde C", count: 2, path: L({ lat: 58.39, lng: 13.84 }, { lat: 58.4, lng: 13.88 }) },
  { city: "Sverige", label: "Halmstad syd", count: 1, path: L({ lat: 56.68, lng: 12.88 }, { lat: 56.68, lng: 12.91 }) },
  { city: "Sverige", label: "Västerås Erikslund", count: 3, path: L({ lat: 59.609, lng: 16.456 }, { lat: 59.612, lng: 16.48 }) },
  { city: "Sverige", label: "Örebro Universitet", count: 3, path: L({ lat: 59.255, lng: 15.245 }, { lat: 59.261, lng: 15.27 }) },
  { city: "Sverige", label: "Norrköping Ingelsta", count: 3, path: L({ lat: 58.615, lng: 16.155 }, { lat: 58.622, lng: 16.185 }) },
  { city: "Sverige", label: "Jönköping Asecs", count: 3, path: L({ lat: 57.775, lng: 14.205 }, { lat: 57.778, lng: 14.235 }) },
  { city: "Sverige", label: "Umeå Universitet", count: 3, path: L({ lat: 63.817, lng: 20.3 }, { lat: 63.824, lng: 20.325 }) },
];
