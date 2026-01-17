import { ThemedView } from "@/components/themed-view";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { PokemonVerticalList } from "@/modules/pokemon/PokemonVerticalList";
import { Text } from "react-native";

export default function BookmarksScreen() {
  const { bookmarks } = useBookmarks();

  return (
    <ThemedView style={{ flex: 1 }}>
      {bookmarks.length === 0 ? (
        <ThemedView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "gray" }}>No bookmarked Pokémon yet.</Text>
        </ThemedView>
      ) : (
        <PokemonVerticalList pokemons={bookmarks} />
      )}
    </ThemedView>
  );
}
