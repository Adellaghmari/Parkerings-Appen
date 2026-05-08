import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { AuthScreen } from "../screens/AuthScreen";
import { MapScreen } from "../screens/MapScreen";
import { SearchModalScreen } from "../screens/SearchModalScreen";
import { RoutePreviewScreen } from "../screens/RoutePreviewScreen";
import { PaymentScreen } from "../screens/PaymentScreen";
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
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SearchModal"
      component={SearchModalScreen}
      options={{
        headerShown: false,
        presentation: "card",
        animation: "slide_from_right",
      }}
    />
    <Stack.Screen
      name="RoutePreview"
      component={RoutePreviewScreen}
      options={{ title: "Rutt & rekommendation" }}
    />
    <Stack.Screen
      name="Payment"
      component={PaymentScreen}
      options={{ title: "Betalning" }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{ title: "Inställningar" }}
    />
  </Stack.Navigator>
);
