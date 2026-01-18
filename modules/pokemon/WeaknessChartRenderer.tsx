import { useGetPokemonTypesInfo } from "@/api/query/pokemon";
import { ThemedText } from "@/components/themed-text";
import { GetPokemonTypesResponse } from "@/types/pokemon";
import { groupBy } from "@/utils/polyfill/groupBy";
import { typeMultiplierAnalyzer } from "@/utils/typeMultiplierAnalyzer";
import { View } from "react-native";
import { PokemonTypesRenderer } from "./PokemonTypesRenderer";

export function WeaknessChartRenderer({ types }: { types?: GetPokemonTypesResponse[] }) {
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
        <ThemedText
          style={{
            margin: "auto",
            width: "auto",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Attacker Analysis
        </ThemedText>
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
              <ThemedText
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {group}:
              </ThemedText>

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
