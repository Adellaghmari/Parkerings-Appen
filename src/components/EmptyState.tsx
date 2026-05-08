import { StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  description?: string;
};

export const EmptyState = ({ title, description }: Props) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    {description ? <Text style={styles.description}>{description}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0f172a",
  },
  description: {
    marginTop: 6,
    fontSize: 12,
    color: "#64748b",
  },
});
