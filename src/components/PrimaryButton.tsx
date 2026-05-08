import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export const PrimaryButton = ({ title, onPress, variant = "primary" }: Props) => (
  <Pressable
    onPress={onPress}
    style={[styles.button, variant === "secondary" && styles.secondary]}
  >
    <Text
      style={[styles.text, variant === "secondary" && styles.secondaryText]}
    >
      {title}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#111827",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  text: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  secondary: {
    backgroundColor: "#e2e8f0",
  },
  secondaryText: {
    color: "#111827",
  },
});
