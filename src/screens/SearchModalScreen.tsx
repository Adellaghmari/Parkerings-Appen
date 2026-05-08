import { Pressable, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../navigation/types";
import { useAppStore } from "../store/useAppStore";
import { EmptyState } from "../components/EmptyState";
import { t } from "../utils/i18n";
import { getGooglePlacesApiKey } from "../config/env";

type Props = NativeStackScreenProps<RootStackParamList, "SearchModal">;

export const SearchModalScreen = ({ navigation }: Props) => {
  const insets = useSafeAreaInsets();
  const setDestination = useAppStore((state) => state.setDestination);
  const language = useAppStore((state) => state.language);
  const apiKey = getGooglePlacesApiKey();

  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace("Map");
    }
  };

  if (!apiKey) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.header}>
          <Pressable style={styles.back} onPress={goBack}>
            <Text style={styles.backText}>← {t("back", language)}</Text>
          </Pressable>
          <Text style={styles.title}>
            {t("searchScreenTitle", language)}
          </Text>
        </View>
        <View style={styles.card}>
          <EmptyState
            title="Saknar API-nyckel för sök"
            description="Lägg EXPO_PUBLIC_GOOGLE_PLACES_API_KEY i .env (se .env.example) och starta om."
          />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={goBack}>
          <Text style={styles.backText}>← {t("back", language)}</Text>
        </Pressable>
        <Text style={styles.title}>
          {t("searchScreenTitle", language)}
        </Text>
      </View>
      <View style={styles.searchBody}>
        <GooglePlacesAutocomplete
          placeholder={t("searchScreenTitle", language)}
          fetchDetails
          debounce={300}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: apiKey,
            language: language === "en" ? "en" : "sv",
          }}
          onPress={(data, details) => {
            const loc = details?.geometry?.location;
            if (!loc) {
              return;
            }
            setDestination({
              name: data.description,
              coords: { lat: loc.lat, lng: loc.lng },
            });
            navigation.replace("RoutePreview");
          }}
          textInputProps={{
            placeholderTextColor: "#94a3b8",
            returnKeyType: "search",
          }}
          styles={{
            container: styles.gpaContainer,
            textInput: styles.input,
            listView: styles.listView,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  searchBody: {
    flex: 1,
    zIndex: 1,
  },
  gpaContainer: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
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
  card: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  listView: {
    marginHorizontal: 0,
  },
});
