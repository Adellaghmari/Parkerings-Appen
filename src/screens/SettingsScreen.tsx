import { StyleSheet, Text, View } from "react-native";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAppStore } from "../store/useAppStore";
import { t } from "../utils/i18n";

export const SettingsScreen = () => {
  const language = useAppStore((state) => state.language);
  const theme = useAppStore((state) => state.theme);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const setTheme = useAppStore((state) => state.setTheme);

  const bg = theme === "dark" ? "#0f172a" : "#ffffff";
  const sectionColor = theme === "dark" ? "#f1f5f9" : "#0f172a";
  const gdprColor = theme === "dark" ? "#94a3b8" : "#475569";

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.section, { color: sectionColor }]}>
        {t("language", language)}
      </Text>
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

      <Text style={[styles.section, { color: sectionColor }]}>
        {t("theme", language)}
      </Text>
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

      <Text style={[styles.section, { color: sectionColor }]}>
        {t("gdprTitle", language)}
      </Text>
      <Text style={[styles.gdpr, { color: gdprColor }]}> 
        {t("gdprBody", language)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  section: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  gdpr: {
    fontSize: 12,
    lineHeight: 18,
  },
});
