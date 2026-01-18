import {
  useGetPokemonById,
  useGetPokemonByName,
  useGetPokemonFormByName,
  useGetPokemonSpeciesByName,
} from "@/api/query/pokemon";
import { BookmarkIcon } from "@/components/BookmarkIcon";
import { ScannerLine } from "@/components/scanner-line";
import { ThemedView } from "@/components/themed-view";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useAppSettings } from "@/contexts/SettingsContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { PokemonTypesRenderer } from "./PokemonTypesRenderer";
import { WeaknessChartRenderer } from "./WeaknessChartRenderer";

export default function PokemonById() {
  const { theme } = useTheme();
  const { enableScanner } = useAppSettings();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pokemonById } = useGetPokemonById({ id: id || "" });
  const { data: pokemonByName } = useGetPokemonByName({ name: pokemonById?.name });
  const { data: pokemonSpecies } = useGetPokemonSpeciesByName({ name: pokemonByName?.name });
  const { data: pokemonForm } = useGetPokemonFormByName({ name: pokemonById?.name });
  const { bookmarks, toggleBookmark } = useBookmarks();

  const navigation = useNavigation();

  const isBookmarked = bookmarks.some((p: any) => p.id === pokemonById?.id);

  const handleToggleBookmark = async () => {
    if (pokemonById) {
      await toggleBookmark(pokemonById);
    }
  };

  const nameToDisplay =
    pokemonForm?.names?.find((name) => name.language.name === "en")?.name ||
    pokemonSpecies?.names.find((name) => name.language.name === "en")?.name ||
    pokemonById?.name;

  useEffect(() => {
    navigation.setOptions({
      title: nameToDisplay,
    });
  }, [nameToDisplay, navigation]);

  return (
    <ThemedView
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          gap: 12,
          paddingTop: 10,
        }}
      >
        <Pressable onPress={handleToggleBookmark} style={{ position: "absolute", top: 10, right: 10 }}>
          <BookmarkIcon isBookmarked={isBookmarked} />
        </Pressable>
        <PokemonTypesRenderer types={pokemonById?.types} />
        <View style={{ width: "100%", alignItems: "center" }}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {enableScanner ? <ScannerLine scanlineColor={theme.colors.primary} /> : null}
              <Image
                source={{
                  uri:
                    pokemonById?.sprites.other.showdown.front_default ||
                    pokemonById?.sprites.other["official-artwork"].front_default ||
                    "",
                }}
                style={styles.image}
                contentFit="contain"
              />
            </View>
          </View>

          <WeaknessChartRenderer types={pokemonById?.types} />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    height: 200,
  },
  imageContainer: {
    position: "relative", // Crucial for absolute positioning of the line
    width: "100%",
    height: "100%", // Fixed or responsive
    overflow: "hidden", // Optional: clips line if it goes slightly outside
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
