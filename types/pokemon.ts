import { PokemonTypeName } from "@/assets/images/pokemon-types/pokemon-type-icons";

export type GetAllPokemonResponse = {
  count: number;
  next: string;
  previous: string | null;
  results: GetAllPokemonResponseResult[];
};

export type GetAllPokemonResponseResult = {
  name: string;
  url: string;
};

export type GetPokemonTypesResponse = {
  slot: number;
  type: { name: PokemonTypeName; url: string };
};

export type GetPokemonResponse = {
  id: number;
  name: string;
  types: GetPokemonTypesResponse[];
  cries: {
    latest: string;
    legacy: string;
  };
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string | null;
    back_female: string | null;
    back_shiny: string | null;
    back_shiny_female: string | null;
    front_default: string | null;
    front_female: string | null;
    front_shiny: string | null;
    front_shiny_female: string | null;
    other: {
      showdown: {
        back_default: string | null;
        back_female: string | null;
        back_shiny: string | null;
        back_shiny_female: string | null;
        front_default: string | null;
        front_female: string | null;
        front_shiny: string | null;
        front_shiny_female: string | null;
      };
      "official-artwork": {
        front_default: string | null;
        front_shiny: string | null;
      };
    };
  };
};

export type GetPokemonSpeciesResponse = {
  name: string;
  id: number;
  color: {
    name: string;
    url: string;
  };
  species: {
    name: string;
    url: string;
  };
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
};

export type GetPokemonTypeInfoResponse = {
  damage_relations: {
    double_damage_from: { name: string; url: string }[];
    double_damage_to: { name: string; url: string }[];
    half_damage_from: { name: string; url: string }[];
    half_damage_to: { name: string; url: string }[];
    no_damage_from: { name: string; url: string }[];
    no_damage_to: { name: string; url: string }[];
  };
  id: number;
  name: string;
};

export type GetPokemonFormResponse = {
  id: number;
  name: string;
  names: { language: { name: string; url: string }; name: string }[];
};
