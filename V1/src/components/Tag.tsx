import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  color?: string;
};

export const Tag = ({ label, color = "#e2e8f0" }: Props) => (
  <View style={[styles.container, { backgroundColor: color }]}>
    <Text style={styles.text}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  text: {
    fontSize: 12,
    color: "#0f172a",
    fontWeight: "600",
  },
});
