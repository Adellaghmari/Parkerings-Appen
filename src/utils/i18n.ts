type Language = "sv" | "en";

type Dictionary = Record<string, string>;

const translations: Record<Language, Dictionary> = {
  sv: {
    welcomeTitle: "Välkommen till ParkeringsAppen",
    allowLocation: "Tillåt platsdelning för att hitta parkering nära dig.",
    continue: "Fortsätt",
    searchDestination: "Sök destination",
    startNavigation: "Starta navigation",
    chooseAnother: "Välj annan zon",
    payPlaceholder: "Betala (placeholder)",
    navigateHere: "Navigera hit",
    settings: "Inställningar",
    language: "Språk",
    theme: "Tema",
    gdprTitle: "GDPR & integritet",
  },
  en: {
    welcomeTitle: "Welcome to ParkingHub",
    allowLocation: "Allow location to find parking nearby.",
    continue: "Continue",
    searchDestination: "Search destination",
    startNavigation: "Start navigation",
    chooseAnother: "Choose another zone",
    payPlaceholder: "Pay (placeholder)",
    navigateHere: "Navigate here",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    gdprTitle: "GDPR & privacy",
  },
};

export const t = (key: string, lang: Language) =>
  translations[lang][key] ?? key;

export type { Language };
