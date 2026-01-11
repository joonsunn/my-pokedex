import { useBookmarks } from "@/contexts/BookmarksContext";
import { PokemonVerticalList } from "@/modules/pokemon/PokemonVerticalList";
import { Text, View } from "react-native";

export default function BookmarksScreen() {
  const { bookmarks } = useBookmarks();

  return (
    <View style={{ flex: 1 }}>
      {bookmarks.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18, color: "gray" }}>No bookmarked Pokémon yet.</Text>
        </View>
      ) : (
        <PokemonVerticalList pokemons={bookmarks} />
      )}
    </View>
  );
}
