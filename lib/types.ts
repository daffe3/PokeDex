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
  other: {
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

export interface PokemonSprites {
  front_default: string | null;
  front_shiny: string | null;
  other: PokemonSpriteOther;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
  [key: string]: number;
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: any[];
}
export interface LocationAreaEncounter {
  location_area: {
    name: string;
    url: string;
  };
  version_details: {
    encounter_details: any[]; 
    max_chance: number;
    version: {
      name: string;
      url: string;
    };
  }[];
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
  abilities: string[];
  stats: PokemonStats;
  moves: string[];
  locations?: string[]; 
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