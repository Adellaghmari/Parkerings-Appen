import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthScreen } from "../screens/AuthScreen";
import { MapScreen } from "../screens/MapScreen";
import { SearchModalScreen } from "../screens/SearchModalScreen";
import { RoutePreviewScreen } from "../screens/RoutePreviewScreen";
import { PaymentPlaceholderScreen } from "../screens/PaymentPlaceholderScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Auth"
      component={AuthScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Map"
      component={MapScreen}
      options={{ title: "Parkeringskarta" }}
    />
    <Stack.Screen
      name="SearchModal"
      component={SearchModalScreen}
      options={{ title: "Sök destination", presentation: "modal" }}
    />
    <Stack.Screen
      name="RoutePreview"
      component={RoutePreviewScreen}
      options={{ title: "Rutt & rekommendation" }}
    />
    <Stack.Screen
      name="Payment"
      component={PaymentPlaceholderScreen}
      options={{ title: "Betalning" }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: "Inställningar" }}
    />
  </Stack.Navigator>
);
