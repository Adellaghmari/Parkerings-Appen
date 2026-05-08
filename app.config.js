// eslint-disable-next-line @typescript-eslint/no-require-imports
const appJson = require("./app.json");

module.exports = {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo && appJson.expo.extra),
      googlePlacesApiKey: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? "",
    },
  },
};
