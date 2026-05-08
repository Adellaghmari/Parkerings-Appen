import { StyleSheet, View } from "react-native";
import { Zone } from "../types/zone";
import { getZoneStatus, statusColor } from "../utils/zoneStatus";
import { operatorColor } from "../utils/operatorColor";

type Props = {
  zone: Zone;
  isSelected?: boolean;
};

export const MapPin = ({ zone, isSelected }: Props) => {
  const status = getZoneStatus(zone);
  const color = operatorColor(zone.operator);
  const ringColor = statusColor(status);
  return (
    <View style={[styles.pin, { backgroundColor: color, borderColor: ringColor }]}>
      {isSelected ? <View style={styles.inner} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  pin: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#ffffff",
  },
});
