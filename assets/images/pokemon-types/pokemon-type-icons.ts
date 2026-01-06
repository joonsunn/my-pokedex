export const pokemonTypeIcons = {
  bug: require("./bug.png"),
  dark: require("./dark.png"),
  dragon: require("./dragon.png"),
  fairy: require("./fairy.png"),
  electric: require("./electric.png"),
  fighting: require("./fighting.png"),
  fire: require("./fire.png"),
  flying: require("./flying.png"),
  ghost: require("./ghost.png"),
  grass: require("./grass.png"),
  ground: require("./ground.png"),
  ice: require("./ice.png"),
  normal: require("./normal.png"),
  poison: require("./poison.png"),
  psychic: require("./psychic.png"),
  rock: require("./rock.png"),
  steel: require("./steel.png"),
  water: require("./water.png"),
} as const;

export type PokemonTypeName = keyof typeof pokemonTypeIcons;
