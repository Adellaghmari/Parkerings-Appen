import { create } from "zustand";
import { Language } from "../utils/i18n";
import { Zone } from "../types/zone";

type Destination = {
  name: string;
  coords: { lat: number; lng: number };
};

type ThemeMode = "light" | "dark";

type AppState = {
  hasLocationPermission: boolean;
  language: Language;
  theme: ThemeMode;
  destination: Destination | null;
  selectedZone: Zone | null;
  setLocationPermission: (value: boolean) => void;
  setLanguage: (value: Language) => void;
  setTheme: (value: ThemeMode) => void;
  setDestination: (value: Destination | null) => void;
  setSelectedZone: (value: Zone | null) => void;
};

export const useAppStore = create<AppState>((set) => ({
  hasLocationPermission: false,
  language: "sv",
  theme: "light",
  destination: null,
  selectedZone: null,
  setLocationPermission: (value) => set({ hasLocationPermission: value }),
  setLanguage: (value) => set({ language: value }),
  setTheme: (value) => set({ theme: value }),
  setDestination: (value) => set({ destination: value }),
  setSelectedZone: (value) => set({ selectedZone: value }),
}));
