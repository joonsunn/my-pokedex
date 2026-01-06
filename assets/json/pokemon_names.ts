import pokemon_names from "./pokemon_names.json";

export const PokemonNames = Object.values(pokemon_names).sort((a, b) => a.species_id - b.species_id);
