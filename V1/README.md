# ParkeringsAppen MVP (Expo + React Native)

Körbar prototyp för pitch/pilot: karta med zoner, mockad ledighet, navigation
och betalnings-placeholder.

## Kom igång

1. Installera dependencies:
   `npm install`
2. Skapa miljöfil:
   `cp .env.example .env`
3. Lägg in Google Places API-nyckel:
   `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=...`
4. Starta Expo:
   `npm run start`

## Web

Kartan använder native maps och fungerar inte i webbläget. På web visas en
fallback-text. Testa i Expo Go på mobil för full upplevelse.

## Google Maps / Places

- Places-autocomplete använder `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`.
- För Google Maps på Android/iOS kan du lägga till Maps API-nyckel i `app.json`
  när vi går mot riktig build:
  - `expo.android.config.googleMaps.apiKey`
  - `expo.ios.config.googleMapsApiKey`

## Tailwind-RN

Om du ändrar `tailwind.config.js`:

```
npm run tailwind:build
```

Detta uppdaterar `tailwind.json` som används i appen.

## Flöden i MVP

- Onboarding (platsdelning) → karta med zoner
- Sök destination → rutt + zonrekommendation (≤ 2 km)
- Zon-detaljer (bottenkort) → navigera / betala (placeholder)
- Settings (tema, språk, GDPR-stub)

## TODO / framtida integrationer

- Betalning: Swish, kort (Stripe/Nets), Apple/Google Pay
- Operatörs-API: realtidsledighet, zonmetadata, taxor
- Konto/fordon: registreringsnummer, kvitton, historik
- ML-prognoser: ledighet baserat på historik
- B2B-panel: statistik/insikter för kommuner/bolag
