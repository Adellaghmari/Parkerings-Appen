import Constants from "expo-constants";

type Extra = { googlePlacesApiKey?: string } | undefined;

/** `.env` / `expo.extra.googlePlacesApiKey`. */
export function getGooglePlacesApiKey(): string {
  const fromExtra = (Constants.expoConfig?.extra as Extra | undefined)
    ?.googlePlacesApiKey;
  if (fromExtra && String(fromExtra).trim() !== "") {
    return String(fromExtra).trim();
  }
  return (process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? "").trim();
}
