'use client';

import React, { useState, useEffect } from "react";
import { PokemonDetail } from "@/lib/types";

interface PokemonCardProps {
  pokemon: PokemonDetail;
  isFavorite: boolean;
  onClick: (pokemon: PokemonDetail) => void;
  onToggleFavorite: (pokemonId: number) => void;
  showShiny: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  isFavorite,
  onClick,
  onToggleFavorite,
  showShiny: initialShowShiny,
}) => {
  const [currentShowShiny, setCurrentShowShiny] = useState(initialShowShiny);

  useEffect(() => {
    setCurrentShowShiny(initialShowShiny);
  }, [initialShowShiny]);

  const cardImageSrc = currentShowShiny ? pokemon.shinyImage : pokemon.image;
  const cardImageAlt = currentShowShiny
    ? `Shiny ${pokemon.name}`
    : pokemon.name;

  const starSvgPath =
    "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z";

  return (
    <div
      className="bg-gray-50 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 p-4 text-center border border-gray-200 cursor-pointer relative"
      onClick={() => onClick(pokemon)}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick(pokemon);
        }
      }}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(pokemon.id);
        }}
        className="absolute top-2 right-2 p-1 pr-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-200 flex items-center space-x-1 text-sm z-10"
        aria-label={
          isFavorite
            ? `Remove ${pokemon.name} from favorites`
            : `Add ${pokemon.name} to favorites`
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`w-5 h-5 ${
            isFavorite
              ? "text-yellow-500"
              : "text-gray-400 hover:text-yellow-400"
          }`}
        >
          <path d={starSvgPath} />
        </svg>
        <span
          className={`${
            isFavorite ? "text-blue-500" : "text-gray-600"
          } font-semibold`}
        >
          {isFavorite ? "Favorited" : "Favorite"}
        </span>
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrentShowShiny((prev) => !prev);
        }}
        className="absolute top-2 left-2 p-1 pr-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-100 transition-all duration-200 flex items-center space-x-1 text-sm z-10"
        aria-label={
          currentShowShiny
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
          <path d={starSvgPath} />
        </svg>
        <span
          className={`${
            currentShowShiny ? "text-blue-500" : "text-gray-600"
          } font-semibold`}
        >
          {currentShowShiny ? "Shiny" : "Normal"}
        </span>
      </button>

      <img
        src={cardImageSrc}
        alt={cardImageAlt}
        className="w-32 h-32 object-contain mx-auto mb-3"
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = currentShowShiny
            ? pokemon.image
            : `https://placehold.co/150x150/e0e0e0/000000?text=${pokemon.name.substring(
                0,
                5
              )}...`;
        }}
      />

      <h2 className="text-xl font-bold capitalize mb-2 text-red-600">
        {pokemon.name}{" "}
        <span className="text-gray-500 text-lg">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
      </h2>

      <div className="flex justify-center flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="px-3 py-1 rounded-full text-sm font-semibold text-white capitalize"
            style={{ backgroundColor: getTypeColor(type) }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;

const getTypeColor = (type: string): string => {
  switch (type.toLowerCase()) {
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "grass":
      return "#7AC74C";
    case "electric":
      return "#F7D02C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6F35FC";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
    case "dark":
      return "#705746";
    default:
      return "#68A090";
  }
};