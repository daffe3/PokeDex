'use client';

import React from 'react';
import { PokemonDetail } from '@/lib/types';

interface PokemonDetailModalProps {
  pokemon: PokemonDetail;
  onClose: () => void;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({ pokemon, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-detail-title"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative transform transition-all duration-300 scale-100 opacity-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Modal Header */}
        <h2
          id="pokemon-detail-title"
          className="text-3xl font-bold capitalize text-center text-red-700 mb-4"
        >
          {pokemon.name}{' '}
          <span className="text-gray-500 text-xl">#{String(pokemon.id).padStart(3, '0')}</span>
        </h2>

        {/* Pokémon Image */}
        <div className="text-center mb-4">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-48 h-48 object-contain mx-auto rounded-lg border border-gray-200"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/200x200/e0e0e0/000000?text=${pokemon.name}`;
            }}
          />
        </div>

        {/* Pokémon Info */}
        <div className="text-lg text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Types:</span> {pokemon.types.join(', ')}
          </p>
          <p>
            <span className="font-semibold">Height:</span> {(pokemon.height * 0.1).toFixed(1)} m
          </p>
          <p>
            <span className="font-semibold">Weight:</span> {(pokemon.weight * 0.1).toFixed(1)} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;
