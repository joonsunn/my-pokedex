import { PokemonNames } from "@/assets/json/pokemon_names";
import {
  GetAllPokemonResponse,
  GetPokemonFormResponse,
  GetPokemonResponse,
  GetPokemonSpeciesResponse,
  GetPokemonTypeInfoResponse,
  GetPokemonTypesResponse,
} from "@/types/pokemon";
import { useInfiniteQuery, useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMemo } from "react";
import { axios } from "../axios";
import { POKEMON_QUERY_KEY } from "../query-keys";
import { POKEMON_URL } from "../url";

export const useGetPokemonById = (args?: { id?: string }) => {
  const { id } = args || {};
  const getPokemonByIdQuery = async () => {
    const response = await axios.get<GetPokemonResponse>(POKEMON_URL.getPokemonById(id));
    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemonById(id),
    queryFn: async () => {
      return getPokemonByIdQuery();
    },
    enabled: !!id,
  });
};

export const useGetPokemonByName = (args?: { name?: string }) => {
  const { name } = args || {};
  const getPokemonByNameQuery = async () => {
    const response = await axios.get<GetPokemonResponse>(POKEMON_URL.getPokemonByName(name));
    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemonByName(name),
    queryFn: async () => {
      return getPokemonByNameQuery();
    },
  });
};

export const useGetPokemonSpeciesByName = (args?: { name?: string }) => {
  const { name } = args || {};
  const getPokemonSpeciesByNameQuery = async () => {
    const response = await axios.get<GetPokemonSpeciesResponse>(POKEMON_URL.getPokemonSpeciesByName(name));
    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemonSpeciesByName(name),
    queryFn: async () => {
      return getPokemonSpeciesByNameQuery();
    },
  });
};

export const useGetPokemonSpeciesById = (args?: { id?: string }) => {
  const { id } = args || {};
  const getPokemonSpeciesByIdQuery = async () => {
    const response = await axios.get<GetPokemonSpeciesResponse>(POKEMON_URL.getPokemonSpeciesById(id));
    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemonSpeciesById(id),
    queryFn: async () => {
      return getPokemonSpeciesByIdQuery();
    },
  });
};

export const useGetAllPokemon = (args?: { query?: { page: number; pageSize: number } }) => {
  const { query } = args || {};
  const getAllPokemonQuery = async (query?: { page: number; pageSize: number }) => {
    const { pageSize: limit = 10, page = 0 } = query || {};

    const offset = page * limit;

    const response = await axios.get<GetAllPokemonResponse>(POKEMON_URL.getAllPokemon(), {
      params: { limit, offset },
    });

    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemons(query),
    queryFn: async () => {
      return getAllPokemonQuery(query);
    },
  });
};

export const useGetAllPokemonInfiniteQuery = (args?: {
  query?: { page?: number; pageSize?: number };
  enabled?: boolean;
}) => {
  const { query, enabled = true } = args || {};
  const defaultPageSize = 5;
  const getAllPokemonQuery = async (query?: { page?: number; pageSize?: number }) => {
    const { pageSize: limit = defaultPageSize, page = 0 } = query || {};
    const offset = page * limit;
    const response = await axios.get<GetAllPokemonResponse>(POKEMON_URL.getAllPokemon(), {
      params: { limit, offset },
    });
    return response.data;
  };

  const {
    data: responseData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    enabled,
    queryKey: POKEMON_QUERY_KEY.getPokemons(query),
    initialPageParam: 0,
    queryFn: async ({ pageParam = 0 }) => {
      return getAllPokemonQuery({ ...query, page: pageParam });
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const offset = parseInt(url.searchParams.get("offset") || "0");
        const limit = parseInt(url.searchParams.get("limit") || defaultPageSize.toString());
        return Math.floor(offset / limit);
      }
      return undefined;
    },
  });

  const data = useMemo(() => responseData?.pages.flatMap((page) => page.results) || [], [responseData]);

  return { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch, isRefetching };
};

function getPokemonsBySearchCombineFunction(results: UseQueryResult<GetPokemonResponse, Error>[]) {
  return {
    data: results.map((result) => result.data),
    pending: results.some((result) => result.isPending),
  };
}

export function useGetPokemonsBySearch({ searchText }: { searchText?: string }) {
  const nameSearchResult = PokemonNames.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchText?.toLowerCase() || "")
  ).slice(0, 50);

  const getPokemonByNameQuery = async (name: string) => {
    const response = await axios.get<GetPokemonResponse>(POKEMON_URL.getPokemonByName(name));
    return response.data;
  };

  const results = useQueries({
    queries: nameSearchResult.map((result) => ({
      queryKey: POKEMON_QUERY_KEY.getPokemonByName(result.name),
      queryFn: () => getPokemonByNameQuery(result.name),
    })),
    combine: getPokemonsBySearchCombineFunction,
  });

  if (!searchText) return { data: { data: [] } };

  return { data: results };
}

export function useGetPokemonTypeInfo({ type }: { type: { name: GetPokemonTypesResponse["type"]["name"] } }) {
  const getPokemonTypeInfoQuery = async (type: GetPokemonTypesResponse["type"]["name"]) => {
    const response = await axios.get<GetPokemonResponse>(POKEMON_URL.getPokemonTypeInfo(type));
    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemonTypeInfo(type.name),
    queryFn: async () => {
      return getPokemonTypeInfoQuery(type.name);
    },
  });
}

export function useGetPokemonTypesInfo({ types }: { types: { name: GetPokemonTypesResponse["type"]["name"] }[] }) {
  const getPokemonTypeInfoQuery = async (type: GetPokemonTypesResponse["type"]["name"]) => {
    const response = await axios.get<GetPokemonTypeInfoResponse>(POKEMON_URL.getPokemonTypeInfo(type));
    return response.data;
  };

  const results = useQueries({
    queries: types.map((type) => ({
      queryKey: POKEMON_QUERY_KEY.getPokemonTypeInfo(type.name),
      queryFn: () => getPokemonTypeInfoQuery(type.name),
    })),
    combine: (results) => {
      return {
        data: results.map((result) => ({
          damage_relations: result.data?.damage_relations,
          name: result.data?.name,
          id: result.data?.id,
        })),
        pending: results.some((result) => result.isPending),
      };
    },
  });

  return { data: results };
}

export const useGetPokemonFormByName = (args?: { name?: string }) => {
  const { name } = args || {};
  const getPokemonFormByNameQuery = async () => {
    const response = await axios.get<GetPokemonFormResponse>(POKEMON_URL.getPokemonFormByName(name));
    return response.data;
  };

  return useQuery({
    queryKey: POKEMON_QUERY_KEY.getPokemonFormByName(name),
    queryFn: async () => {
      return getPokemonFormByNameQuery();
    },
  });
};
