import { GetPokemonTypesResponse } from "@/types/pokemon";

export const POKEMON_QUERY_KEY = {
  getPokemons: (query?: Record<string, any>) => ["pokemon", query],
  getPokemonById: (id?: string) => ["pokemon", "id", id],
  getPokemonByName: (name?: string) => ["pokemon", "name", name],
  getPokemonSpeciesByName: (name?: string) => ["pokemon", "species", "name", name],
  getPokemonSpeciesById: (id?: string) => ["pokemon", "species", "id", id],
  getPokemonFormByName: (name?: string) => ["pokemon", "form", "name", name],
  getPokemonTypeInfo: (name: GetPokemonTypesResponse["type"]["name"]) => ["pokemon", "type", "name", name],
};
