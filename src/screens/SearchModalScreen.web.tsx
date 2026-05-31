import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { RootStackParamList } from "../navigation/types";
import { useAppStore } from "../store/useAppStore";
import { fetchZones } from "../api/zones";
import { t } from "../utils/i18n";

type Props = NativeStackScreenProps<RootStackParamList, "SearchModal">;

export const SearchModalScreen = ({ navigation }: Props) => {
  const setDestination = useAppStore((state) => state.setDestination);
  const language = useAppStore((state) => state.language);
  const [query, setQuery] = useState("");
  const { data: zones = [] } = useQuery({
    queryKey: ["zones"],
    queryFn: fetchZones,
  });

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace("Map");
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return zones.slice(0, 12);
    }
    return zones
      .filter((zone) => {
        const haystack = `${zone.name} ${zone.city} ${zone.operator}`.toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 20);
  }, [zones, query]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={goBack}>
          <Text style={styles.backText}>← {t("back", language)}</Text>
        </Pressable>
        <Text style={styles.title}>{t("searchScreenTitle", language)}</Text>
      </View>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t("searchScreenTitle", language)}
        placeholderTextColor="#94a3b8"
        style={styles.input}
      />

      <View style={styles.list}>
        {filtered.length === 0 ? (
          <Text style={styles.empty}>Inga träffar. Testa ett annat namn eller område.</Text>
        ) : (
          filtered.map((zone) => (
            <Pressable
              key={zone.id}
              style={styles.item}
              onPress={() => {
                setDestination({ name: zone.name, coords: zone.coords });
                navigation.replace("RoutePreview");
              }}
            >
              <Text style={styles.itemTitle}>{zone.name}</Text>
              <Text style={styles.itemMeta}>
                {zone.city} · {zone.operator}
              </Text>
            </Pressable>
          ))
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
  },
  header: {
    marginBottom: 12,
  },
  back: {
    alignSelf: "flex-start",
    backgroundColor: "#111827",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  backText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    height: 42,
    marginBottom: 12,
  },
  list: {
    flex: 1,
    gap: 8,
  },
  item: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 10,
    backgroundColor: "#ffffff",
  },
  itemTitle: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 14,
  },
  itemMeta: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },
  empty: {
    color: "#64748b",
    fontSize: 13,
    marginTop: 8,
  },
});
