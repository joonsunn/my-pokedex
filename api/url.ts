export const POKEMON_URL = {
  getAllPokemon: () => `/pokemon`,
  getPokemonById: (id?: string) => `/pokemon/${id}`,
  getPokemonByName: (name?: string) => `/pokemon/${name}`,
  getPokemonSpeciesByName: (name?: string) => `/pokemon-species/${name}`,
  getPokemonSpeciesById: (id?: string) => `/pokemon-species/${id}`,
  getPokemonFormByName: (name?: string) => `/pokemon-form/${name}`,
  getPokemonTypeInfo: (name: string) => `/type/${name}`,
};
