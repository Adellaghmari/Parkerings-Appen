import { StyleSheet, Text, View } from "react-native";

export const PaymentScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Planerat betalningsflöde</Text>
    <Text style={styles.subtitle}>
      Här visas hur appen kan leda användaren vidare från vald parkeringszon
      till betalning. I en produktionsversion kopplas flödet till exempelvis
      Swish, kortbetalning eller operatörens egna betalningssystem.
    </Text>
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Kommande integrationer</Text>
      <Text style={styles.listItem}>Swish</Text>
      <Text style={styles.listItem}>Kortbetalning</Text>
      <Text style={styles.listItem}>Apple Pay / Google Pay</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    padding: 16,
    gap: 6,
  },
  cardTitle: {
    color: "#0f172a",
    fontWeight: "700",
    marginBottom: 4,
  },
  listItem: {
    fontSize: 14,
    color: "#0f172a",
  },
});
