'use client';

import React from 'react';

interface FilterAndSearchProps {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  allTypes?: string[];
  selectedType: string | null;
  onTypeChange: (type: string | null) => void;
  showFavoritesOnly: boolean;
  onShowFavoritesChange: (checked: boolean) => void;
  showAllShiny: boolean;
  onToggleAllShiny: (checked: boolean) => void;
}

const FilterAndSearch: React.FC<FilterAndSearchProps> = ({
  searchTerm,
  onSearchChange,
  allTypes = [],
  selectedType,
  onTypeChange,
  showFavoritesOnly,
  onShowFavoritesChange,
  showAllShiny,
  onToggleAllShiny,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search Pokemon by name..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full p-4 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 shadow-sm text-lg"
          aria-label="Search Pokemon"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <select
          className="p-3 rounded-xl border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 shadow-sm text-lg capitalize w-full sm:w-auto"
          value={selectedType || ""}
          onChange={(e) =>
            onTypeChange(e.target.value === "" ? null : e.target.value)
          }
          aria-label="Filter by type"
        >
          <option value="">All Types</option>
          {allTypes.map((type) => (
            <option key={type} value={type} className="capitalize">
              {type}
            </option>
          ))}
        </select>

        <label className="flex items-center space-x-2 cursor-pointer text-lg text-gray-700 font-semibold">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => onShowFavoritesChange(e.target.checked)}
            className="form-checkbox h-5 w-5 text-red-600 rounded focus:ring-red-500"
            aria-label="Show only favorite Pokemon"
          />
          <span>Show Favorites Only</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer text-lg text-gray-700 font-semibold">
          <input
            type="checkbox"
            checked={showAllShiny}
            onChange={(e) => onToggleAllShiny(e.target.checked)}
            className="form-checkbox h-5 w-5 text-yellow-500 rounded focus:ring-yellow-400"
            aria-label="Show all Pokémon as shiny"
          />
          <span>Show All Shiny</span>
        </label>
      </div>
    </div>
  );
};

export default FilterAndSearch;