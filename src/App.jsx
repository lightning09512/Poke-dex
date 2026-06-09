import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import PokemonCard from './components/PokemonCard';
import SidebarDetails from './components/SidebarDetails';
import SkeletonCard from './components/SkeletonCard';
import { usePokemonData } from './hooks/usePokemonData';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    searchQuery,
    handleSearch,
    selectedType,
    handleFilterType
  } = usePokemonData();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isSidebarOpenOnMobile, setIsSidebarOpenOnMobile] = useState(false);

  const observer = useRef();
  const lastPokemonElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, loadMore]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
    setIsSidebarOpenOnMobile(true);
  };

  return (
    <div className="flex flex-row h-screen w-full font-sans bg-slate-50 dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-400/20 dark:bg-red-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse delay-1000 pointer-events-none z-0"></div>
      
      {/* Left Sidebar Pane (Fixed on Desktop, Slide-over on Mobile) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-full md:w-80 lg:w-96 transform ${isSidebarOpenOnMobile || selectedPokemon ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none border-r border-white/20 dark:border-slate-800/50 glass`}>
        <SidebarDetails 
          pokemon={selectedPokemon} 
          isDark={isDark} 
          onClose={() => setIsSidebarOpenOnMobile(false)}
        />
      </aside>

      {/* Main Content Pane */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10">
        <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
        
        <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
          
          <FilterBar 
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            selectedType={selectedType}
            onTypeChange={handleFilterType}
          />

          {error && (
            <div className="w-full p-4 mb-8 rounded-2xl bg-red-100/80 dark:bg-red-900/50 text-red-600 dark:text-red-200 text-center glass border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pokemonList.map((pokemon, index) => {
              if (pokemonList.length === index + 1) {
                return (
                  <div ref={lastPokemonElementRef} key={pokemon.name}>
                    <PokemonCard pokemon={pokemon} onClick={handleSelectPokemon} />
                  </div>
                );
              } else {
                return (
                  <PokemonCard key={pokemon.name} pokemon={pokemon} onClick={handleSelectPokemon} />
                );
              }
            })}
            
            {loading && Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}
          </div>

          {!loading && !hasMore && pokemonList.length > 0 && !searchQuery && (
            <div className="text-center py-12 text-slate-500 dark:text-slate-400 font-medium">
              You have seen all Pokémon!
            </div>
          )}
        </main>
      </div>

    </div>
  );
}

export default App;
