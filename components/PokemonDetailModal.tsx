'use client';

import React, { useState, useEffect } from "react";
import { PokemonDetail } from "@/lib/types";

interface PokemonDetailModalProps {
  pokemon: PokemonDetail;
  onClose: () => void;
  showShinyInitially: boolean;
}

const PokemonDetailModal: React.FC<PokemonDetailModalProps> = ({
  pokemon,
  onClose,
  showShinyInitially,
}) => {
  const [showShiny, setShowShiny] = useState(showShinyInitially);

  useEffect(() => {
    setShowShiny(showShinyInitially);
  }, [showShinyInitially]);

  const currentImage = showShiny ? pokemon.shinyImage : pokemon.image;
  const imageAltText = showShiny ? `Shiny ${pokemon.name}` : pokemon.name;

  const movesToShow = pokemon.moves.slice(0, 10);
  const hasMoreMoves = pokemon.moves.length > 10;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pokemon-detail-title"
    >
      <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative transform transition-all duration-300 scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
          aria-label="Close modal"
        >
          &times;
        </button>

        <button
          onClick={() => setShowShiny((prev) => !prev)}
          className="absolute top-4 left-4 p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-sm px-2 py-1 flex items-center space-x-1 z-10"
          aria-label={
            showShiny
              ? `Show normal ${pokemon.name}`
              : `Show shiny ${pokemon.name}`
          }
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.974 2.889a1 1 000-.364 1.118l1.519 4.674c.3.921-.755 1.688-1.539 1.118l-3.974-2.889a1 1 000-1.118l1.519-4.674c.3-.921-1.603-.921-1.902 0l-1.519 4.674a1 1 000-.69H2.605c-.969 0-1.371-1.24-.588-1.81l3.974-2.889a1 1 000-.118z"
            ></path>
          </svg>
          <span className={`${showShiny ? "text-blue-500" : "text-gray-600"}`}>
            {showShiny ? "Normal" : "Shiny"}
          </span>
        </button>

        <h2
          id="pokemon-detail-title"
          className="text-3xl font-bold capitalize text-center text-red-700 mb-4"
        >
          {pokemon.name}{" "}
          <span className="text-gray-500 text-xl">
            #{String(pokemon.id).padStart(3, "0")}
          </span>
        </h2>

        <div className="text-center mb-4">
          <img
            src={currentImage}
            alt={imageAltText}
            className="w-48 h-48 object-contain mx-auto rounded-lg border border-gray-200"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `https://placehold.co/200x200/e0e0e0/000000?text=${imageAltText}`;
            }}
          />
        </div>

        <div className="text-lg text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Types:</span>{" "}
            {pokemon.types.join(", ")}
          </p>
          <p>
            <span className="font-semibold">Height:</span>{" "}
            {(pokemon.height * 0.1).toFixed(1)} m
          </p>
          <p>
            <span className="font-semibold">Weight:</span>{" "}
            {(pokemon.weight * 0.1).toFixed(1)} kg
          </p>

          <div>
            <span className="font-semibold">Moves:</span>
            <ul className="list-disc list-inside text-base mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {movesToShow.map((move, index) => (
                <li key={index} className="capitalize">
                  {move}
                </li>
              ))}
            </ul>
            {hasMoreMoves && (
              <p className="text-sm text-gray-500 mt-2">
                And {pokemon.moves.length - movesToShow.length} more moves...
              </p>
            )}
            {pokemon.moves.length === 0 && (
              <p className="text-base text-gray-500 mt-1">No moves listed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;