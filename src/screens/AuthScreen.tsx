import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../navigation/types";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAppStore } from "../store/useAppStore";
import { t } from "../utils/i18n";

type Props = NativeStackScreenProps<RootStackParamList, "Auth">;

export const AuthScreen = ({ navigation }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);
  const setLocationPermission = useAppStore(
    (state) => state.setLocationPermission
  );
  const shimmer = useRef(new Animated.Value(0)).current;
  const AnimatedGradient = useMemo(
    () => Animated.createAnimatedComponent(LinearGradient),
    []
  );

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 9000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 9000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [shimmer]);

  const requestPermission = async () => {
    setError(null);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationPermission(false);
      setError("Platsdelning krävs för att visa närliggande parkering.");
      return;
    }
    setLocationPermission(true);
    navigation.replace("Map");
  };

  const textOnBg = theme === "dark" ? "#f8fafc" : "#f8fafc";
  const subColor = theme === "dark" ? "#e2e8f0" : "#cbd5f5";
  const baseBg = theme === "dark" ? "#020617" : "#0f172a";

  return (
    <View style={[styles.container, { backgroundColor: baseBg }]}>
      <AnimatedGradient
        colors={["#0f172a", "#0ea5e9", "#14b8a6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          StyleSheet.absoluteFillObject,
          {
            opacity: shimmer.interpolate({
              inputRange: [0, 1],
              outputRange: [0.4, 0.9],
            }),
            transform: [
              {
                scale: shimmer.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.08],
                }),
              },
            ],
          },
        ]}
      />
      <View style={styles.overlay} />
      <Text style={[styles.title, { color: textOnBg }]}> 
        {t("onboardingTitle", language)}
      </Text>
      <Text style={[styles.subtitle, { color: subColor }]}> 
        {t("onboardingSubtitle", language)}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton title={t("continue", language)} onPress={requestPermission} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#0f172a",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },
  error: {
    fontSize: 12,
    color: "#dc2626",
    marginBottom: 12,
  },
});
