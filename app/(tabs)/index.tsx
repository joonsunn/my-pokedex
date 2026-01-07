import { useGetPokemonsBySearch } from "@/api/query/pokemon";
import { PokemonVerticalList } from "@/modules/pokemon/PokemonVerticalList";
import { StyledSearchInput } from "@/modules/pokemon/styled-search-input";
import { GetPokemonResponse } from "@/types/pokemon";
import { useState } from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Home() {
  const { top } = useSafeAreaInsets();

  const [searchText, setSearchText] = useState<string>("");

  const {
    data: { data: filteredPokemonList },
  } = useGetPokemonsBySearch({ searchText });

  const validPokemons = filteredPokemonList.filter(
    (pokemon): pokemon is GetPokemonResponse => pokemon !== undefined
  ) as GetPokemonResponse[];

  return (
    <View
      style={{
        paddingTop: top,
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          gap: 4,
        }}
      >
        <StyledSearchInput searchText={searchText} setSearchText={setSearchText} />
        {searchText && !validPokemons.length ? (
          <Text style={{ color: "grey" }}>No pokemon found. Showing all pokemon.</Text>
        ) : null}
      </View>
      <PokemonVerticalList pokemons={validPokemons} />
    </View>
  );
}
