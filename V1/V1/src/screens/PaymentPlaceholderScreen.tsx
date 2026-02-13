import { StyleSheet, Text, View } from "react-native";

export const PaymentPlaceholderScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Betalning kommer snart</Text>
    <Text style={styles.subtitle}>
      Vi integrerar Swish, kort (Stripe/Nets) och Apple/Google Pay när avtalen är
      klara.
    </Text>
    <View style={styles.qr}>
      <Text style={styles.qrText}>Mock-QR</Text>
    </View>
    <View style={styles.list}>
      <Text style={styles.listItem}>• Swish</Text>
      <Text style={styles.listItem}>• Kortbetalning</Text>
      <Text style={styles.listItem}>• Apple Pay / Google Pay</Text>
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
    marginBottom: 16,
  },
  qr: {
    height: 160,
    width: 160,
    borderRadius: 16,
    backgroundColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  qrText: {
    color: "#64748b",
    fontWeight: "600",
  },
  list: {
    alignItems: "center",
    gap: 6,
  },
  listItem: {
    fontSize: 14,
    color: "#0f172a",
  },
});
