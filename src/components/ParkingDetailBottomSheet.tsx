import { Pressable, StyleSheet, Text, View } from "react-native";
import { Zone } from "../types/zone";
import {
  statusColor,
  statusDescription,
  statusLabel,
  getZoneStatus,
} from "../utils/zoneStatus";
import { PrimaryButton } from "./PrimaryButton";
import { Tag } from "./Tag";
import { useAppStore } from "../store/useAppStore";
import { t } from "../utils/i18n";

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
  const language = useAppStore((s) => s.language);
  const theme = useAppStore((s) => s.theme);
  const status = getZoneStatus(zone);
  const cardBg = theme === "dark" ? "#1e293b" : "#ffffff";
  const titleC = theme === "dark" ? "#f1f5f9" : "#0f172a";
  const subC = theme === "dark" ? "#94a3b8" : "#64748b";
  const metaC = theme === "dark" ? "#cbd5e1" : "#334155";
  const infoBg = theme === "dark" ? "#0f172a" : "#f8fafc";
  return (
    <View style={[styles.container, { backgroundColor: cardBg }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: titleC }]}>{zone.name}</Text>
          <Text style={[styles.subtitle, { color: subC }]}> 
            {zone.operator} · {zone.city}
          </Text>
        </View>
        <Tag label={statusLabel(status)} color={statusColor(status)} />
      </View>

      <View style={styles.row}>
        <Text style={[styles.meta, { color: metaC }]}> 
          Kapacitet: {zone.capacity} · Lediga:{" "}
          {zone.free === null ? "Okänd" : zone.free}
        </Text>
      </View>
      <Text style={[styles.meta, { color: metaC }]}> 
        Pris:{" "}
        {zone.pricing.perHour === null
          ? "Gratis / P-skiva"
          : `${zone.pricing.perHour} kr/h`}
      </Text>
      {zone.pricing.note ? (
        <Text style={[styles.note, { color: subC }]}>{zone.pricing.note}</Text>
      ) : null}

      <View style={[styles.availabilityBox, { backgroundColor: infoBg }]}>
        <View
          style={[
            styles.availabilityDot,
            { backgroundColor: statusColor(status) },
          ]}
        />
        <Text style={[styles.availabilityText, { color: metaC }]}>
          {statusDescription(status)}
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          title={t("navigateHere", language)}
          onPress={onNavigate}
        />
        <PrimaryButton
          title={t("payAction", language)}
          onPress={onPay}
          variant="secondary"
        />
      </View>
      <Pressable onPress={onClose}>
        <Text style={[styles.closeHint, { color: subC }]}> 
          {t("close", language)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
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
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  row: {
    marginTop: 4,
  },
  meta: {
    fontSize: 12,
  },
  note: {
    marginTop: 4,
    fontSize: 12,
  },
  availabilityBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  availabilityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  availabilityText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 16,
  },
  actions: {
    marginTop: 12,
    gap: 8,
  },
  closeHint: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
  },
});
