import { useGetAllPokemonInfiniteQuery } from "@/api/query/pokemon";
import { FlatList, Text } from "react-native";
import { PokemonInListRenderer } from "./PokemonInListRenderer";

type PokemonVerticalListProps = {
  pokemons?: { name: string }[] | undefined;
};

export function PokemonVerticalList({ pokemons }: PokemonVerticalListProps) {
  const {
    data: pokemonsInfiniteQuery,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetAllPokemonInfiniteQuery({ enabled: !pokemons?.length });

  return (
    <FlatList
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
      }}
      data={pokemons?.length && pokemons?.length > 0 ? pokemons : pokemonsInfiniteQuery}
      renderItem={({ item }) => <PokemonInListRenderer pokemon={item} />}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      ListEmptyComponent={<Text>No pokemon found</Text>}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.4}
    />
  );
}
