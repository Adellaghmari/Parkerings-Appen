import { StyleSheet, Text, View } from "react-native";
import { useAppStore } from "../store/useAppStore";
import { t } from "../utils/i18n";
import { operatorColor } from "../utils/operatorColor";

const operators = [
  "EasyPark",
  "Aimo Park",
  "Parkster",
  "Stockholm Parkering",
  "Parkman",
] as const;

const availability = [
  { label: "Ledigt", color: "#16a34a" },
  { label: "Osäkert", color: "#f97316" },
  { label: "Fullt", color: "#dc2626" },
] as const;

const LegendItem = ({
  label,
  color,
  fg,
}: {
  label: string;
  color: string;
  fg: string;
}) => (
  <View style={styles.item}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={[styles.label, { color: fg }]}>{label}</Text>
  </View>
);

export const Legend = () => {
  const theme = useAppStore((s) => s.theme);
  const language = useAppStore((s) => s.language);
  const panel =
    theme === "dark" ? "rgba(15,23,42,0.92)" : "rgba(255,255,255,0.94)";
  const fg = theme === "dark" ? "#e2e8f0" : "#0f172a";
  const muted = theme === "dark" ? "#94a3b8" : "#64748b";

  return (
    <View style={[styles.container, { backgroundColor: panel }]}>
      <Text style={[styles.title, { color: fg }]}>{t("legendTitle", language)}</Text>
      {operators.map((op) => (
        <LegendItem key={op} label={op} color={operatorColor(op)} fg={fg} />
      ))}
      <View style={styles.divider} />
      <Text style={[styles.sectionTitle, { color: fg }]}>Ledighet</Text>
      {availability.map((item) => (
        <LegendItem
          key={item.label}
          label={item.label}
          color={item.color}
          fg={fg}
        />
      ))}
      <Text style={[styles.footnote, { color: muted }]}>
        {t("legendFootnote", language)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    gap: 6,
    maxWidth: 240,
  },
  title: {
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 2,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 11,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(148, 163, 184, 0.35)",
    marginVertical: 3,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: "700",
  },
  footnote: {
    fontSize: 10,
    marginTop: 4,
  },
});
