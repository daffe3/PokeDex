'use client';

import React, { useEffect, useState } from 'react';
import { PokemonDetail } from '@/lib/types';
import { loadAllPokemonData } from '@/lib/pokeapi';
import FilterAndSearch from '@/components/FilterAndSearch';
import PokemonGrid from '@/components/PokemonGrid';
import PokemonDetailModal from '@/components/PokemonDetailModal';

const ITEMS_PER_PAGE = 20;

export default function PokedexPage() {
  const [allPokemon, setAllPokemon] = useState<PokemonDetail[]>([]);
  const [visiblePokemon, setVisiblePokemon] = useState<PokemonDetail[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<PokemonDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [favoritePokemonIds, setFavoritePokemonIds] = useState<Set<number>>(
    new Set()
  );
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showAllShiny, setShowAllShiny] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allTypes, setAllTypes] = useState<string[]>([]);

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { pokemonList, types } = await loadAllPokemonData();
        setAllPokemon(pokemonList);
        setAllTypes(types);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("pokedexFavorites");
    if (storedFavorites) {
      try {
        setFavoritePokemonIds(new Set(JSON.parse(storedFavorites)));
      } catch {
        localStorage.removeItem("pokedexFavorites");
      }
    }
    const storedShiny = localStorage.getItem("pokedexShowShiny");
    if (storedShiny !== null) {
      setShowAllShiny(JSON.parse(storedShiny));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "pokedexFavorites",
      JSON.stringify(Array.from(favoritePokemonIds))
    );
  }, [favoritePokemonIds]);

  useEffect(() => {
    localStorage.setItem("pokedexShowShiny", JSON.stringify(showAllShiny));
  }, [showAllShiny]);

  useEffect(() => {
    const searchFiltered = allPokemon.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = selectedType ? p.types.includes(selectedType) : true;
      const matchesFavorites = showFavoritesOnly
        ? favoritePokemonIds.has(p.id)
        : true;
      return matchesSearch && matchesType && matchesFavorites;
    });
    setFilteredPokemon(searchFiltered);
    setCurrentPage(1);
  }, [
    searchTerm,
    selectedType,
    showFavoritesOnly,
    allPokemon,
    favoritePokemonIds,
  ]);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setVisiblePokemon(filteredPokemon.slice(start, end));
  }, [filteredPokemon, currentPage]);

  const toggleFavorite = (pokemonId: number) => {
    setFavoritePokemonIds((prev) => {
      const updated = new Set(prev);
      updated.has(pokemonId)
        ? updated.delete(pokemonId)
        : updated.add(pokemonId);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600 font-inter text-gray-800 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-red-700 mb-8 tracking-tight">
          Pokédex
        </h1>

        <FilterAndSearch
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          allTypes={allTypes}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          showFavoritesOnly={showFavoritesOnly}
          onShowFavoritesChange={setShowFavoritesOnly}
          showAllShiny={showAllShiny}
          onToggleAllShiny={setShowAllShiny}
        />

        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-600">Loading Pokémon...</p>
          </div>
        ) : (
          <>
            <PokemonGrid
              pokemonList={visiblePokemon}
              favoritePokemonIds={favoritePokemonIds}
              onPokemonClick={setSelectedPokemon}
              onToggleFavorite={toggleFavorite}
              showAllShiny={showAllShiny}
            />

            {filteredPokemon.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center mt-8 space-x-4">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-md transition disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="text-lg font-bold">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 shadow-md transition disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {selectedPokemon && (
          <PokemonDetailModal
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
            showShinyInitially={showAllShiny}
          />
        )}
      </div>
    </div>
  );
}