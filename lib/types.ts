export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonSpriteOther {
  'official-artwork': {
    front_default: string | null;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  other: PokemonSpriteOther;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  sprites: PokemonSprites; 
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}