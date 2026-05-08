type Language = "sv" | "en";

type Dictionary = Record<string, string>;

const translations: Record<Language, Dictionary> = {
  sv: {
    welcomeTitle: "Välkommen till ParkeringsAppen",
    onboardingTitle: "Slipp leta. Bara parkera.",
    onboardingSubtitle:
      "Hitta närmaste lediga parkering i realtid och navigera dit direkt.",
    allowLocation: "Tillåt platsdelning för att vi kan visa zoner där du är.",
    continue: "Fortsätt",
    searchDestination: "Sök",
    searchScreenTitle: "Sök destination",
    nearestParking: "Närmast",
    myLocation: "Min plats",
    back: "Tillbaka",
    legendTitle: "Operatörer",
    legendFootnote: "Ledighet: grön = ledigt, orange = osäkert, röd = fullt",
    backToMap: "Tillbaka till kartan",
    startNavigation: "Starta navigation",
    followRouteInApp: "Följ rutten i kartan ovan (ingen extern app).",
    chooseAnother: "Välj annan zon",
    payAction: "Betala",
    navigateHere: "Navigera hit",
    close: "Stäng",
    settings: "Inställningar",
    language: "Språk",
    theme: "Tema",
    gdprTitle: "GDPR & integritet",
    gdprBody:
      "Vi använder din plats för att visa parkeringszoner i närheten. Positionen används bara i appflödet och ska hanteras enligt gällande integritetskrav i en produktionsversion.",
  },
  en: {
    welcomeTitle: "Welcome to ParkeringsAppen",
    onboardingTitle: "Stop searching. Just park.",
    onboardingSubtitle:
      "Find the nearest available parking in real time and go there directly.",
    allowLocation: "Allow location so we can show zones where you are.",
    continue: "Continue",
    searchDestination: "Search",
    searchScreenTitle: "Search destination",
    nearestParking: "Nearest",
    myLocation: "My location",
    back: "Back",
    legendTitle: "Operators",
    legendFootnote: "Availability: green = available, orange = uncertain, red = full",
    backToMap: "Back to map",
    startNavigation: "Start navigation",
    followRouteInApp: "Follow the route on the map above (no external app).",
    chooseAnother: "Choose another zone",
    payAction: "Pay",
    navigateHere: "Navigate here",
    close: "Close",
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    gdprTitle: "GDPR & privacy",
    gdprBody:
      "We use your location to show nearby parking zones. Location is only used in the app flow and should be handled according to privacy requirements in a production version.",
  },
};

export const t = (key: string, lang: Language) =>
  translations[lang][key] ?? key;

export type { Language };
