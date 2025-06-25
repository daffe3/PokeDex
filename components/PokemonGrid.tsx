'use client';

import React from 'react';
import { PokemonDetail } from '@/lib/types';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemonList: PokemonDetail[];
  favoritePokemonIds?: Set<number>;
  onPokemonClick: (pokemon: PokemonDetail) => void;
  onToggleFavorite: (pokemonId: number) => void;
}

const PokemonGrid: React.FC<PokemonGridProps> = ({
  pokemonList,
  favoritePokemonIds = new Set(),
  onPokemonClick,
  onToggleFavorite,
}) => {
  if (pokemonList.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600 text-xl">
        No Pokémon match your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          pokemon={pokemon}
          isFavorite={favoritePokemonIds.has(pokemon.id)}
          onClick={onPokemonClick}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default PokemonGrid;
