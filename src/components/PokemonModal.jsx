import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getCardBackground, capitalize, formatPokemonId } from '../utils/typeHelpers';

const StatBar = ({ label, value, max = 255, colorClass }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Animate on mount
    const timer = setTimeout(() => setWidth((value / max) * 100), 100);
    return () => clearTimeout(timer);
  }, [value, max]);

  return (
    <div className="flex items-center gap-4 mb-2 text-sm">
      <span className="w-24 font-medium text-slate-500 dark:text-slate-400">{label}</span>
      <span className="w-8 font-bold">{value}</span>
      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const PokemonModal = ({ pokemon, onClose, isDark }) => {
  if (!pokemon) return null;

  const primaryType = pokemon.types[0].type.name;
  const bgClass = getCardBackground(primaryType, isDark);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl glass border shadow-2xl animate-slide-up flex flex-col md:flex-row ${bgClass}`}>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 backdrop-blur-md transition-colors"
        >
          <X size={24} className="text-slate-800 dark:text-white" />
        </button>

        {/* Left Side: Image and Basic Info */}
        <div className="w-full md:w-2/5 p-8 flex flex-col items-center justify-center relative bg-white/10 dark:bg-black/10 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
          <div className="absolute top-4 left-6 text-xl font-bold text-slate-800/40 dark:text-white/30">
            {formatPokemonId(pokemon.id)}
          </div>
          
          <img 
            src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
            alt={pokemon.name}
            className="w-48 h-48 object-contain filter drop-shadow-2xl z-10 mt-6 md:mt-0 animate-pulse-slow"
          />
          
          <h2 className="text-3xl font-bold mt-4 text-slate-800 dark:text-white mb-4">
            {capitalize(pokemon.name)}
          </h2>
          
          <div className="flex gap-2">
            {pokemon.types.map(t => (
              <span key={t.type.name} className="px-4 py-1.5 rounded-full text-sm font-semibold bg-white/50 dark:bg-black/30 text-slate-800 dark:text-slate-100 backdrop-blur-md">
                {capitalize(t.type.name)}
              </span>
            ))}
          </div>
        </div>

        {/* Right Side: Detailed Stats */}
        <div className="w-full md:w-3/5 p-8 bg-white/80 dark:bg-slate-900/80 rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none border-t md:border-t-0 md:border-l border-white/40 dark:border-slate-700/50">
          
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">About</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="glass-card p-3 rounded-xl flex flex-col items-center">
                <span className="text-slate-500 dark:text-slate-400 mb-1">Height</span>
                <span className="font-bold">{pokemon.height / 10} m</span>
              </div>
              <div className="glass-card p-3 rounded-xl flex flex-col items-center">
                <span className="text-slate-500 dark:text-slate-400 mb-1">Weight</span>
                <span className="font-bold">{pokemon.weight / 10} kg</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold mb-4 text-slate-800 dark:text-white">Base Stats</h3>
            <div className="space-y-1">
              {pokemon.stats.map(stat => {
                const statName = stat.stat.name === 'special-attack' ? 'Sp. Atk' : 
                                 stat.stat.name === 'special-defense' ? 'Sp. Def' : 
                                 capitalize(stat.stat.name);
                return (
                  <StatBar 
                    key={stat.stat.name}
                    label={statName}
                    value={stat.base_stat}
                    colorClass={stat.base_stat > 70 ? (stat.base_stat > 100 ? 'bg-green-500' : 'bg-blue-500') : 'bg-orange-500'}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-3 text-slate-800 dark:text-white">Abilities</h3>
            <div className="flex flex-wrap gap-2">
              {pokemon.abilities.map(a => (
                <span key={a.ability.name} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm">
                  {capitalize(a.ability.name)} {a.is_hidden && <span className="text-xs text-slate-400 ml-1">(Hidden)</span>}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PokemonModal;
