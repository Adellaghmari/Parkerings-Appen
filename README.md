# ParkeringsAppen

Appkoncept som samlar flera parkeringsoperatörer, zoner och relevant parkeringsinformation i ett gemensamt och mer användarvänligt flöde.

Projektet är byggt som ett portfolio och prototypprojekt för att visa problemförståelse, mobil UX, kartvy, sökflöde och integration mot extern platsdata.

## Tech Stack

- React Native
- Expo
- TypeScript
- React Navigation
- TanStack Query
- Zustand
- React Native Maps
- Google Places API
- Tailwind RN

## Syfte

Projektet undersöker hur parkering kan förenklas genom att samla flera operatörer och relevant information i en och samma app.

## Problem

Många användare behöver hoppa mellan olika parkeringsappar beroende på område och operatör. Det skapar friktion, särskilt när man snabbt vill hitta rätt parkering, förstå zoner och ta reda på vilken information som är relevant.

## Lösning

ParkeringsAppen är tänkt att samla parkeringsinformation, zoner och operatörer i ett tydligare flöde. Målet är att användaren snabbare ska kunna förstå var det går att parkera, se ungefärlig tillgänglighet och gå vidare mot navigation eller betalning.

## Funktioner

- Onboarding med platsbehörighet
- Kartvy med parkeringszoner och platser
- Färgkodad status för parkeringsplatser
- Sökfunktion via Google Places
- Rekommendation av närliggande parkering
- Enkel ruttvy i appen
- Språk och temainställningar
- Planerad betalningsvy som visar var betalflödet passar in

## Status

Detta är ett koncept/prototyp projekt. Parkeringszoner och lediga platser bygger delvis på simulerad data för att visa användarflödet. Google Places används för sök när en egen API nyckel är konfigurerad.

Webbläget visar inte full kartfunktionalitet eftersom `react-native-maps` främst används i mobilmiljö. För bäst demo, kör appen i Expo Go på telefon eller emulator.

## Så Kör Du Projektet

Installera dependencies:

```bash
npm install
```

Skapa lokal miljöfil:

```bash
cp .env.example .env
```

Lägg till din Google Places nyckel i `.env`:

```bash
EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=din_api_nyckel
```

Starta projektet:

```bash
npm run start
```

Öppna sedan appen i Expo Go, Android emulator eller iOS simulator.

## Demo / Vad Rekryteraren Kan Titta På

- Startsidan förklarar appens idé och leder användaren in i flödet.
- Kartvyn visar parkeringszoner och platser med tydlig status.
- Sökflödet visar hur användaren kan välja destination med Google Places.
- Närmaste parkering och ruttvyn visar hur appen försöker förenkla beslutet.
- Betalningsvyn visar hur ett framtida betalflöde är tänkt att placeras i helheten.

## Miljövariabler Och API

`.env` ska inte commitas. Projektet innehåller bara `.env.example` som mall.

`EXPO_PUBLIC_GOOGLE_PLACES_API_KEY` är en publik Expo variabel och kan exponeras i klienten. I ett riktigt produktionsläge ska nyckeln därför begränsas i Google Cloud med rätt API behörigheter, appbegränsningar och domän-/plattformslås.

## Bygga Tailwind RN Efter Ändringar

Om `tailwind.config.js` ändras, bygg om Tailwind filerna:

```bash
npm run tailwind:build
```

## Framtida Förbättringar

- Live data från parkeringsoperatörer
- Betalningsintegration med exempelvis Swish eller kort
- Navigering till närmaste lediga parkering
- Inloggning och sparade favoritplatser
- Screenshots eller kort demovideo i README
