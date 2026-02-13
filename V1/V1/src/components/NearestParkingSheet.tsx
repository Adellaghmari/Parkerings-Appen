import { StyleSheet, Text, View } from "react-native";
import { Zone } from "../types/zone";
import { PrimaryButton } from "./PrimaryButton";
import { getZoneStatus, statusLabel, statusColor } from "../utils/zoneStatus";

type Props = {
  zones: Zone[];
  onSelect: (zone: Zone) => void;
  onClose: () => void;
};

export const NearestParkingSheet = ({ zones, onSelect, onClose }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>Närmast parkering</Text>
    <Text style={styles.subtitle}>Välj bland närliggande alternativ</Text>

    <View style={styles.list}>
      {zones.map((zone) => {
        const status = getZoneStatus(zone);
        return (
          <View key={zone.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.name}>{zone.name}</Text>
              <Text style={[styles.badge, { color: statusColor(status) }]}>
                {statusLabel(status)}
              </Text>
            </View>
            <Text style={styles.meta}>
              {zone.operator} · {zone.city}
            </Text>
            <Text style={styles.meta}>
              Lediga: {zone.free === null ? "Okänd" : zone.free} ·{" "}
              {zone.pricing.perHour === null
                ? "Gratis / P-skiva"
                : `${zone.pricing.perHour} kr/h`}
            </Text>
            <View style={styles.actions}>
              <PrimaryButton
                title="Visa zon"
                onPress={() => onSelect(zone)}
              />
            </View>
          </View>
        );
      })}
    </View>

    <Text style={styles.close} onPress={onClose}>
      Stäng
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748b",
  },
  list: {
    marginTop: 12,
    gap: 10,
  },
  card: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#f8fafc",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
  },
  badge: {
    fontSize: 11,
    fontWeight: "700",
  },
  meta: {
    marginTop: 4,
    fontSize: 11,
    color: "#64748b",
  },
  actions: {
    marginTop: 8,
  },
  close: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
  },
});
