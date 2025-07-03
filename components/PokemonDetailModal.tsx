'use client';

import React, { useState, useEffect } from "react";
import { PokemonDetail } from "@/lib/types";
import { fetchPokemonLocations } from "@/lib/pokeapi";

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
  const [locations, setLocations] = useState<string[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);

  useEffect(() => {
    setShowShiny(showShinyInitially);
  }, [showShinyInitially]);

  useEffect(() => {
    const getLocations = async () => {
      setLocationsLoading(true);
      const fetchedLocations = await fetchPokemonLocations(pokemon.id);
      setLocations(fetchedLocations);
      setLocationsLoading(false);
    };

    getLocations();
  }, [pokemon.id]);

  const currentImage = showShiny ? pokemon.shinyImage : pokemon.image;
  const imageAltText = showShiny ? `Shiny ${pokemon.name}` : pokemon.name;

  const movesToShow = pokemon.moves ? pokemon.moves.slice(0, 10) : [];
  const hasMoreMoves = pokemon.moves && pokemon.moves.length > 10;

  const starSvgPath =
    "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

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

        <div className="flex flex-col items-center mb-4">
          <h2
            id="pokemon-detail-title"
            className="text-3xl font-bold capitalize text-red-700 mb-2 flex items-center space-x-2"
          >
            <span>{pokemon.name}</span>
            <span className="text-gray-500 text-xl">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </h2>

          <button
            onClick={() => setShowShiny((prev) => !prev)}
            className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 text-sm px-2 py-1 flex items-center space-x-1"
            aria-label={
              showShiny
                ? `Show normal ${pokemon.name}`
                : `Show shiny ${pokemon.name}`
            }
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={starSvgPath}></path>
            </svg>
            <span
              className={`${showShiny ? "text-blue-500" : "text-gray-600"}`}
            >
              {showShiny ? "Shiny" : "Normal"}
            </span>
          </button>
        </div>

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
            <span className="font-semibold">Abilities:</span>
            <ul className="list-disc list-inside text-base mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
              {pokemon.abilities && pokemon.abilities.length > 0 ? (
                pokemon.abilities.map((ability, index) => (
                  <li key={index} className="capitalize">
                    {ability}
                  </li>
                ))
              ) : (
                <p className="text-base text-gray-500 mt-1">
                  No abilities listed.
                </p>
              )}
            </ul>
          </div>

          <div className="mt-4">
            <span className="font-semibold">Base Stats:</span>
            <ul className="text-base mt-1 space-y-1">
              {pokemon.stats &&
                Object.entries(pokemon.stats).map(([statName, value]) => (
                  <li
                    key={statName}
                    className="flex justify-between items-center capitalize"
                  >
                    <span className="font-medium">
                      {statName.replace("-", " ")}:
                    </span>
                    <span className="font-bold text-blue-700">{value}</span>
                    <div className="w-2/3 bg-gray-200 rounded-full h-2.5 ml-2">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${(value / 255) * 100}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

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
            {pokemon.moves && pokemon.moves.length === 0 && (
              <p className="text-base text-gray-500 mt-1">No moves listed.</p>
            )}
          </div>

          <div className="mt-4">
            <span className="font-semibold">Locations:</span>
            {locationsLoading ? (
              <p className="text-base text-gray-500 mt-1">
                Loading locations...
              </p>
            ) : locations.length > 0 ? (
              <ul className="list-disc list-inside text-base mt-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                {locations.map((loc, index) => (
                  <li key={index}>{loc}</li>
                ))}
              </ul>
            ) : (
              <p className="text-base text-gray-500 mt-1">
                No specific encounter locations found for this Pokémon in the
                Kanto region.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailModal;