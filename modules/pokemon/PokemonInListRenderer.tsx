import {
  useGetPokemonById,
  useGetPokemonByName,
  useGetPokemonFormByName,
  useGetPokemonSpeciesById,
} from "@/api/query/pokemon";
import { BookmarkIcon } from "@/components/BookmarkIcon";
import { useBookmarks } from "@/contexts/BookmarksContext";
import { useTheme } from "@/contexts/ThemeContext";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

type PokemonInListRendererProps = {
  pokemon: { name: string };
};

export function PokemonInListRenderer({ pokemon }: PokemonInListRendererProps) {
  const { data: pokemonByName, isLoading } = useGetPokemonByName({ name: pokemon?.name });
  const { data: pokemonSpecies } = useGetPokemonSpeciesById({ id: pokemonByName?.id.toString() });
  const { data: pokemonById } = useGetPokemonById({ id: pokemonByName?.id.toString() });
  const { data: pokemonForm } = useGetPokemonFormByName({ name: pokemon?.name });
  const router = useRouter();
  const { bookmarks, toggleBookmark } = useBookmarks();
  const { theme } = useTheme();

  function handleClick() {
    router.push(`/pokemon/${pokemonById?.id}`);
  }

  const isBookmarked = bookmarks.some((p: any) => p.id === pokemonById?.id);

  const handleToggleBookmark = async () => {
    if (pokemonById) {
      await toggleBookmark(pokemonById);
    }
  };

  const nameToDisplay =
    pokemonForm?.names?.find((name) => name.language.name === "en")?.name ||
    pokemonSpecies?.names.find((name) => name.language.name === "en")?.name ||
    pokemon?.name;

  if (isLoading) {
    return <ActivityIndicator size={20} />;
  }
  if (!pokemonByName) {
    return null;
  }
  return (
    <Pressable style={{ position: "relative" }} onPress={handleClick}>
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: pokemonSpecies?.color?.name || "white",
          opacity: 0.3,
          borderRadius: 36,
        }}
      />
      <View style={{ zIndex: 1, paddingVertical: 12, gap: 12 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.foreground,
            }}
          >
            #{pokemonByName?.id}
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: theme.colors.foreground,
            }}
          >
            {nameToDisplay}
          </Text>
        </View>
        <Pressable onPress={handleToggleBookmark} style={{ position: "absolute", top: 16, right: 16 }}>
          <BookmarkIcon isBookmarked={isBookmarked} />
        </Pressable>
        <Image
          source={{
            uri:
              pokemonById?.sprites.other["official-artwork"].front_default ||
              pokemonById?.sprites.front_default ||
              pokemonById?.sprites.other.showdown.front_default ||
              "",
          }}
          style={{
            height: 180,
          }}
          contentFit="contain"
        />
      </View>
    </Pressable>
  );
}
