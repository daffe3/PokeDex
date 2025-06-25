import axios from 'axios';
import { PokemonDetail, PokeApiResponse, PokemonListItem } from './types';

export async function loadAllPokemonData(): Promise<{ pokemonList: PokemonDetail[]; types: string[]; }> {
  const response = await axios.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=151');
  const results: PokemonListItem[] = response.data.results;

  const allTypesSet = new Set<string>();

  const allDetails: PokemonDetail[] = await Promise.all(
    results.map(async (item) => {
      const detailRes = await axios.get(item.url);
      const pokeData = detailRes.data;

      const types = pokeData.types.map((t: any) => t.type.name);
      types.forEach((t: string) => allTypesSet.add(t)); 

      return {
        id: pokeData.id,
        name: pokeData.name,
        image:
          pokeData.sprites.other['official-artwork'].front_default ||
          pokeData.sprites.front_default ||
          `https://placehold.co/150x150/e0e0e0/000000?text=${pokeData.name}`,
        types,
        height: pokeData.height,
        weight: pokeData.weight,
        sprites: pokeData.sprites,
      };
    })
  );

  return {
    pokemonList: allDetails,
    types: Array.from(allTypesSet).sort(), 
  };
}

export async function loadPokemonList(url: string): Promise<{
  pokemonList: PokemonDetail[];
  types: string[];
  next: string | null;
  previous: string | null;
}> {
  const response = await axios.get<PokeApiResponse>(url);
  const data = response.data;

  const allTypesSet = new Set<string>();

  const pokemonList: PokemonDetail[] = await Promise.all(
    data.results.map(async (item: PokemonListItem) => {
      const details = await axios.get(item.url);
      const pokeData = details.data;

      const types = pokeData.types.map((t: any) => t.type.name);
      types.forEach((t: string) => allTypesSet.add(t));

      return {
        id: pokeData.id,
        name: pokeData.name,
        image:
          pokeData.sprites.other['official-artwork'].front_default ||
          pokeData.sprites.front_default ||
          `https://placehold.co/150x150/e0e0e0/000000?text=${pokeData.name}`,
        types,
        height: pokeData.height,
        weight: pokeData.weight,
        sprites: pokeData.sprites,
      };
    })
  );

  return {
    pokemonList,
    types: Array.from(allTypesSet),
    next: data.next,
    previous: data.previous,
  };
}