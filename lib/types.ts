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
    front_shiny: string | null; 
  };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null; 
  other: PokemonSpriteOther;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string; 
  shinyImage: string; 
  types: string[];
  height: number;
  weight: number;
  sprites: PokemonSprites;
  moves: string[];
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