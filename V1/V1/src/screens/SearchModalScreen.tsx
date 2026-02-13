import { Pressable, StyleSheet, Text, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useAppStore } from "../store/useAppStore";
import { EmptyState } from "../components/EmptyState";

type Props = NativeStackScreenProps<RootStackParamList, "SearchModal">;

export const SearchModalScreen = ({ navigation }: Props) => {
  const setDestination = useAppStore((state) => state.setDestination);
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ?? "";

  if (!apiKey) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            style={styles.back}
            onPress={() => navigation.navigate("Map")}
          >
            <Text style={styles.backText}>← Tillbaka</Text>
          </Pressable>
          <Text style={styles.title}>Sök destination</Text>
        </View>
        <View style={styles.card}>
          <EmptyState
            title="Saknar Google Places API-nyckel"
            description="Lägg till EXPO_PUBLIC_GOOGLE_PLACES_API_KEY i .env och starta om Expo."
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => navigation.navigate("Map")}>
          <Text style={styles.backText}>← Tillbaka</Text>
        </Pressable>
        <Text style={styles.title}>Sök destination</Text>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Sök destination"
        fetchDetails
        debounce={300}
        query={{
          key: apiKey,
          language: "sv",
        }}
        onPress={(data, details) => {
          const location = details?.geometry?.location;
          if (!location) {
            return;
          }
          setDestination({
            name: data.description,
            coords: { lat: location.lat, lng: location.lng },
          });
          navigation.replace("RoutePreview");
        }}
        styles={{
          textInput: styles.input,
          listView: styles.listView,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 16,
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
    marginHorizontal: 16,
  },
});
