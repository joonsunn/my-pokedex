import { pokemonTypeIcons, PokemonTypeName } from "@/assets/images/pokemon-types/pokemon-type-icons";
import { Image, ImageProps } from "expo-image";

type Props = ImageProps & {
  type: PokemonTypeName;
  size?: number;
};

export function PokemonTypeIcon({ type, size = 50, style, ...props }: Props) {
  return (
    <Image
      source={pokemonTypeIcons[type]}
      style={[{ width: size, height: size }, style]}
      contentFit="contain"
      {...props}
    />
  );
}
