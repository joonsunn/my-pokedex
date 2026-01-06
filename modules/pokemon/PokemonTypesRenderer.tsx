import { PokemonTypeIcon } from "@/components/pokemon-type-icons/pokemon-type-icons";
import { GetPokemonTypesResponse } from "@/types/pokemon";
import { View } from "react-native";

type PokemonTypesRendererProps = {
  types: GetPokemonTypesResponse[] | undefined;
};

export function PokemonTypesRenderer({ types }: PokemonTypesRendererProps) {
  if (!types) {
    return null;
  }
  return (
    <View style={{ flexDirection: "row", gap: 12, flexWrap: "wrap" }}>
      {types.map((type) => (
        <PokemonTypeIcon type={type.type.name} key={type.type.name} size={42} />
      ))}
    </View>
  );
}
