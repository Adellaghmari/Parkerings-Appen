import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAppStore } from "../store/useAppStore";
import { t } from "../utils/i18n";

export const SettingsScreen = () => {
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const setTheme = useAppStore((state) => state.setTheme);

  return (
    <View style={styles.container}>
      <Text style={styles.section}>{t("language", language)}</Text>
      <View style={styles.row}>
        <PrimaryButton
          title="Svenska"
          onPress={() => setLanguage("sv")}
          variant={language === "sv" ? "primary" : "secondary"}
        />
        <PrimaryButton
          title="English"
          onPress={() => setLanguage("en")}
          variant={language === "en" ? "primary" : "secondary"}
        />
      </View>

      <Text style={styles.section}>{t("theme", language)}</Text>
      <View style={styles.row}>
        <PrimaryButton
          title="Light"
          onPress={() => setTheme("light")}
          variant={theme === "light" ? "primary" : "secondary"}
        />
        <PrimaryButton
          title="Dark"
          onPress={() => setTheme("dark")}
          variant={theme === "dark" ? "primary" : "secondary"}
        />
      </View>

      <Text style={styles.section}>{t("gdprTitle", language)}</Text>
      <Text style={styles.gdpr}>
        Vi använder din plats för att visa parkeringszoner i närheten. Position
        lagras anonymt och kan raderas på begäran. Detta är en GDPR-stub som
        uppdateras inför pilot.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  section: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 16,
    color: "#0f172a",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  gdpr: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 18,
  },
});
