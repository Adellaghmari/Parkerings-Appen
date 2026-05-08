import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TailwindProvider } from "tailwind-rn";
import type { ReactNode } from "react";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { useAppStore } from "./src/store/useAppStore";

const queryClient = new QueryClient();
const tailwind = require("./tailwind.json");
const TailwindProviderWithChildren =
  TailwindProvider as unknown as React.ComponentType<{
    utilities: Record<string, unknown>;
    children: ReactNode;
  }>;

const navLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#f8fafc",
  },
};

const navDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#0f172a",
    card: "#0f172a",
  },
};

function ThemedNavigation() {
  const theme = useAppStore((s) => s.theme);
  return (
    <NavigationContainer theme={theme === "dark" ? navDark : navLight}>
      <RootNavigator />
      <StatusBar style={theme === "dark" ? "light" : "dark"} />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProviderWithChildren utilities={tailwind}>
        <SafeAreaProvider>
          <ThemedNavigation />
        </SafeAreaProvider>
      </TailwindProviderWithChildren>
    </QueryClientProvider>
  );
}
