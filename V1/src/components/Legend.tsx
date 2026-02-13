import { StyleSheet, Text, View } from "react-native";
import { statusColor } from "../utils/zoneStatus";

const LegendItem = ({ label, color }: { label: string; color: string }) => (
  <View style={styles.item}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={styles.label}>{label}</Text>
  </View>
);

export const Legend = () => (
  <View style={styles.container}>
    <LegendItem label="Grön: ≥ 5 lediga" color={statusColor("high")} />
    <LegendItem label="Orange: 1–4 lediga" color={statusColor("medium")} />
    <LegendItem label="Röd: 0 lediga" color={statusColor("low")} />
    <LegendItem label="Gratis: okänd" color={statusColor("unknown")} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,0.92)",
    padding: 10,
    borderRadius: 10,
    gap: 6,
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
    fontSize: 12,
    color: "#0f172a",
  },
});
