import {
  useGetPokemonById,
  useGetPokemonByName,
  useGetPokemonFormByName,
  useGetPokemonSpeciesByName,
  useGetPokemonTypesInfo,
} from "@/api/query/pokemon";
import { GetPokemonTypesResponse } from "@/types/pokemon";
import { groupBy } from "@/utils/polyfill/groupBy";
import { typeMultiplierAnalyzer } from "@/utils/typeMultiplierAnalyzer";
import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { PokemonTypesRenderer } from "./PokemonTypesRenderer";

export default function PokemonById() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: pokemonById } = useGetPokemonById({ id: id || "" });
  const { data: pokemonByName } = useGetPokemonByName({ name: pokemonById?.name });
  const { data: pokemonSpecies } = useGetPokemonSpeciesByName({ name: pokemonByName?.name });
  const { data: pokemonForm } = useGetPokemonFormByName({ name: pokemonById?.name });

  const navigation = useNavigation();

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
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        gap: 12,
        paddingTop: 10,
      }}
    >
      <PokemonTypesRenderer types={pokemonById?.types} />

      <Image
        source={{
          uri:
            pokemonById?.sprites.other.showdown.front_default ||
            pokemonById?.sprites.other["official-artwork"].front_default ||
            "",
        }}
        style={{
          height: 200,
          width: 200,
        }}
        contentFit="contain"
      />
      <WeaknessChartRenderer types={pokemonById?.types} />
    </View>
  );
}

function WeaknessChartRenderer({ types }: { types?: GetPokemonTypesResponse[] }) {
  const {
    data: { data: typeDamageInfo },
  } = useGetPokemonTypesInfo({ types: types?.map((type) => ({ name: type.type.name })) ?? [] });

  const damageMultiplier = groupBy(typeMultiplierAnalyzer(typeDamageInfo), (type) => {
    switch (true) {
      case type.multiplier > 2:
        return "Highly Recommended";
      case type.multiplier > 1:
        return "Recommended";
      case type.multiplier === 1:
        return "Normal Damage";
      default:
      case type.multiplier < 1:
        return "Do not use";
    }
  });

  return (
    <View
      style={{
        gap: 12,
        paddingHorizontal: 24,
        width: "100%",
      }}
    >
      <View
        style={{
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: "red",
          borderRadius: 50,
          padding: 12,
          width: "auto",
        }}
      >
        <Text
          style={{
            margin: "auto",
            width: "auto",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Attacker Analysis
        </Text>
      </View>
      <View
        style={{
          gap: 20,
        }}
      >
        {Object.keys(damageMultiplier)
          .filter((group) => group !== "Normal Damage")
          .map((group) => (
            <View key={group} style={{ alignItems: "flex-start", gap: 8 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {group}:
              </Text>

              <PokemonTypesRenderer
                types={damageMultiplier[group as keyof typeof damageMultiplier].map((type, index) => ({
                  slot: index,
                  type: { name: type.name as GetPokemonTypesResponse["type"]["name"], url: "" },
                }))}
              />
            </View>
          ))}
      </View>
    </View>
  );
}
