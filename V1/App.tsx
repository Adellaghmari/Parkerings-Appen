import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TailwindProvider } from "tailwind-rn";
import type { ReactNode } from "react";
import { RootNavigator } from "./src/navigation/RootNavigator";

const queryClient = new QueryClient();
const tailwind = require("./tailwind.json");
const TailwindProviderWithChildren =
  TailwindProvider as unknown as React.ComponentType<{
    utilities: Record<string, unknown>;
    children: ReactNode;
  }>;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TailwindProviderWithChildren utilities={tailwind}>
        <NavigationContainer>
          <RootNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </TailwindProviderWithChildren>
    </QueryClientProvider>
  );
}
