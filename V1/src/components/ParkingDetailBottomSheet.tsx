import { StyleSheet, Text, View } from "react-native";
import { Zone } from "../types/zone";
import { statusColor, statusLabel, getZoneStatus } from "../utils/zoneStatus";
import { PrimaryButton } from "./PrimaryButton";
import { Tag } from "./Tag";

type Props = {
  zone: Zone;
  onNavigate: () => void;
  onPay: () => void;
  onClose: () => void;
};

export const ParkingDetailBottomSheet = ({
  zone,
  onNavigate,
  onPay,
  onClose,
}: Props) => {
  const status = getZoneStatus(zone);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{zone.name}</Text>
          <Text style={styles.subtitle}>
            {zone.operator} · {zone.city}
          </Text>
        </View>
        <Tag label={statusLabel(status)} color={statusColor(status)} />
      </View>

      <View style={styles.row}>
        <Text style={styles.meta}>
          Kapacitet: {zone.capacity} · Lediga:{" "}
          {zone.free === null ? "Okänd" : zone.free}
        </Text>
      </View>
      <Text style={styles.meta}>
        Pris:{" "}
        {zone.pricing.perHour === null
          ? "Gratis / P-skiva"
          : `${zone.pricing.perHour} kr/h`}
      </Text>
      {zone.pricing.note ? (
        <Text style={styles.note}>{zone.pricing.note}</Text>
      ) : null}

      <View style={styles.actions}>
        <PrimaryButton title="Navigera hit" onPress={onNavigate} />
        <PrimaryButton
          title="Betala (placeholder)"
          onPress={onPay}
          variant="secondary"
        />
      </View>
      <Text style={styles.closeHint} onPress={onClose}>
        Stäng
      </Text>
    </View>
  );
};

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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  row: {
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
    color: "#334155",
  },
  note: {
    marginTop: 4,
    fontSize: 12,
    color: "#64748b",
  },
  actions: {
    marginTop: 12,
    gap: 8,
  },
  closeHint: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: "#94a3b8",
  },
});
