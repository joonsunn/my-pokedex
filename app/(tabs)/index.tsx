import { useGetPokemonsBySearch } from "@/api/query/pokemon";
import { PokemonVerticalList } from "@/modules/pokemon/PokemonVerticalList";
import { GetPokemonResponse } from "@/types/pokemon";
import { useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
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
        <View
          style={{
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "darkgrey",
            borderRadius: 50,
          }}
        >
          <DebouncedTextInput value={searchText} onChangeText={setSearchText} />
        </View>
        {searchText && !validPokemons.length ? (
          <Text style={{ color: "grey" }}>No pokemon found. Showing all pokemon.</Text>
        ) : null}
      </View>
      <PokemonVerticalList pokemons={validPokemons} />
    </View>
  );
}

function DebouncedTextInput({
  value,
  onChangeText,
  debounceMs = 500,
  minLength = 3,
}: {
  value?: string | undefined;
  onChangeText?: ((text: string) => void) | undefined;
  debounceMs?: number;
  minLength?: number;
}) {
  const [textValue, setTextValue] = useState<string | undefined>(value);
  const timeoutId = useRef<NodeJS.Timeout | null | number>(null);

  useEffect(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if ((textValue && textValue?.length >= minLength) || !textValue) {
      timeoutId.current = setTimeout(() => {
        onChangeText && onChangeText(textValue || "");
      }, debounceMs);
    }
  }, [textValue, debounceMs, onChangeText, minLength]);

  return (
    <TextInput
      value={textValue}
      onChangeText={(text) => setTextValue(text)}
      placeholder="Search Pokemon"
      placeholderTextColor="grey"
      style={{
        padding: 10,
        fontSize: 18,
      }}
    />
  );
}
