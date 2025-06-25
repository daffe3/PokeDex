'use client';

import React from 'react';
import { PokemonDetail } from '@/lib/types';

interface PokemonCardProps {
  pokemon: PokemonDetail;
  isFavorite: boolean;
  onClick: (pokemon: PokemonDetail) => void;
  onToggleFavorite: (pokemonId: number) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onClick,
  onToggleFavorite,
}) => {
  return (
    <div
      className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 text-center border border-gray-200 cursor-pointer relative"
      onClick={() => onClick(pokemon)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(pokemon);
        }
      }}
    >
      {/* Favorite Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onToggleFavorite(pokemon.id);
        }}
        className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-200"
        aria-label={isFavorite ? `Remove ${pokemon.name} from favorites` : `Add ${pokemon.name} to favorites`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-6 h-6 ${isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-400'}`}
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </button>

      {/* Pokémon Image */}
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-32 h-32 object-contain mx-auto mb-3"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = `https://placehold.co/150x150/e0e0e0/000000?text=${pokemon.name.substring(0, 5)}...`;
        }}
      />

      {/* Pokémon Info */}
      <h2 className="text-xl font-bold capitalize mb-2 text-red-600">
        {pokemon.name}{' '}
        <span className="text-gray-500 text-base">#{String(pokemon.id).padStart(3, '0')}</span>
      </h2>

      <p className="text-sm text-gray-700">
        <span className="font-semibold">Type:</span> {pokemon.types.join(', ')}
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Height:</span> {(pokemon.height * 0.1).toFixed(1)} m
      </p>
      <p className="text-sm text-gray-700">
        <span className="font-semibold">Weight:</span> {(pokemon.weight * 0.1).toFixed(1)} kg
      </p>
    </div>
  );
};

export default PokemonCard;
