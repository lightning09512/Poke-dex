import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getCardBackground, getSolidTypeColor, capitalize, formatPokemonId } from '../utils/typeHelpers';
import { fetchPokemonSpecies, fetchEvolutionChain, fetchPokemonByName } from '../utils/pokemonApi';

const extractEvolutions = (chain) => {
  const evos = [];
  let current = chain;
  
  while (current) {
    const details = current.evolution_details[0];
    evos.push({
      name: current.species.name,
      min_level: details ? details.min_level : null
    });
    current = current.evolves_to[0];
  }
  return evos;
};
const StatBar = ({ label, value, max = 255, colorClass }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Reset width to 0 when Pokemon changes, then animate
    setWidth(0);
    const timer = setTimeout(() => setWidth((value / max) * 100), 50);
    return () => clearTimeout(timer);
  }, [value, max]);

  return (
    <div className="flex items-center gap-2 mb-2 text-sm">
      <span className="w-16 font-medium text-slate-500 dark:text-slate-400 text-xs">{label}</span>
      <span className="w-8 font-bold text-xs">{value}</span>
      <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

const SidebarDetails = ({ pokemon, isDark, onClose }) => {
  if (!pokemon) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-white/50 dark:bg-slate-900/50">
        <div className="w-32 h-32 opacity-20 dark:opacity-10 mb-6">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-slate-500 dark:text-slate-400">
            <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,91 C27.4,91 9,72.6 9,50 C9,27.4 27.4,9 50,9 C72.6,9 91,27.4 91,50 C91,72.6 72.6,91 50,91 Z"></path>
            <path d="M50,30 C39,30 30,39 30,50 C30,61 39,70 50,70 C61,70 70,61 70,50 C70,39 61,30 50,30 Z M50,61 C43.9,61 39,56.1 39,50 C39,43.9 43.9,39 50,39 C56.1,39 61,43.9 61,50 C61,56.1 56.1,61 50,61 Z"></path>
            <rect x="0" y="45" width="100" height="10"></rect>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-slate-500 dark:text-slate-400">No Pokemon Selected</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Select a Pokemon from the grid to view its details here.</p>
      </div>
    );
  }

  const [flavorText, setFlavorText] = useState('');
  const [evolutions, setEvolutions] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(false);

  useEffect(() => {
    if (!pokemon) return;

    let isMounted = true;
    const fetchExtraData = async () => {
      setLoadingExtra(true);
      try {
        const speciesData = await fetchPokemonSpecies(pokemon.id);
        if (!isMounted) return;

        const entry = speciesData.flavor_text_entries.find(e => e.language.name === 'en');
        if (entry) {
          setFlavorText(entry.flavor_text.replace(/[\f\n\r]/g, ' '));
        } else {
          setFlavorText('No description available.');
        }

        const evoData = await fetchEvolutionChain(speciesData.evolution_chain.url);
        if (!isMounted) return;

        const evoList = extractEvolutions(evoData.chain);
        const evoWithImages = await Promise.all(
          evoList.map(async (evo) => {
            try {
               const pData = await fetchPokemonByName(evo.name);
               return {
                 ...evo,
                 image: pData.sprites.other['official-artwork'].front_default || pData.sprites.front_default
               };
            } catch(e) { return evo; }
          })
        );

        if (isMounted) setEvolutions(evoWithImages);

      } catch (err) {
        console.error('Failed to fetch extra details', err);
      } finally {
        if (isMounted) setLoadingExtra(false);
      }
    };

    fetchExtraData();

    return () => {
      isMounted = false;
      setFlavorText('');
      setEvolutions([]);
    };
  }, [pokemon]);

  const primaryType = pokemon.types[0].type.name;
  const bgClass = getCardBackground(primaryType, isDark);

  return (
    <div className={`relative w-full h-full flex flex-col overflow-y-auto ${bgClass} transition-colors duration-500`}>
      
      {/* Mobile Close Button */}
      <button 
        onClick={onClose}
        className="lg:hidden absolute top-4 right-4 z-20 p-2 rounded-full bg-white/30 dark:bg-black/30 hover:bg-white/50 dark:hover:bg-black/50 backdrop-blur-md transition-colors"
      >
        <X size={24} className="text-slate-800 dark:text-white" />
      </button>

      {/* Top Graphic Area */}
      <div className="w-full pt-12 pb-6 px-6 flex flex-col items-center justify-center relative bg-white/10 dark:bg-black/10">
        <div className="absolute top-6 left-6 text-2xl font-bold text-slate-800/40 dark:text-white/30">
          {formatPokemonId(pokemon.id)}
        </div>
        
        <img 
          key={pokemon.id} // Forces re-render animation when pokemon changes
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="w-56 h-56 object-contain filter drop-shadow-2xl z-10 animate-fade-in"
        />
        
        <h2 className="text-4xl font-extrabold mt-4 text-slate-800 dark:text-white mb-4 animate-slide-up">
          {capitalize(pokemon.name)}
        </h2>
        
        <div className="flex gap-2 animate-slide-up">
          {pokemon.types.map(t => (
            <span key={t.type.name} className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-md tracking-wide uppercase ${getSolidTypeColor(t.type.name)}`}>
              {capitalize(t.type.name)}
            </span>
          ))}
        </div>
      </div>

      {/* Details Area */}
      <div className="flex-1 w-full p-6 bg-white/80 dark:bg-slate-900/80 rounded-t-3xl border-t border-white/40 dark:border-slate-700/50 backdrop-blur-md">
        
        <div className="mb-6">
          <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-white">About</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="glass-card p-3 rounded-xl flex flex-col items-center shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 mb-1 text-xs uppercase tracking-wider">Height</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{pokemon.height / 10} m</span>
            </div>
            <div className="glass-card p-3 rounded-xl flex flex-col items-center shadow-sm">
              <span className="text-slate-500 dark:text-slate-400 mb-1 text-xs uppercase tracking-wider">Weight</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{pokemon.weight / 10} kg</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-white">Pokedex Entry</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed bg-white/60 dark:bg-black/30 p-4 rounded-xl border border-white/50 dark:border-slate-700/50 shadow-inner">
            {loadingExtra ? 'Loading description...' : flavorText}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-white">Base Stats</h3>
          <div className="space-y-1">
            {pokemon.stats.map(stat => {
              const statName = stat.stat.name === 'special-attack' ? 'Sp. Atk' : 
                               stat.stat.name === 'special-defense' ? 'Sp. Def' : 
                               capitalize(stat.stat.name);
              
              // Custom colors for specific stats to make them pop
              const statColors = {
                'hp': 'bg-red-500',
                'attack': 'bg-orange-500',
                'defense': 'bg-yellow-400',
                'special-attack': 'bg-blue-400',
                'special-defense': 'bg-green-400',
                'speed': 'bg-pink-400'
              };

              return (
                <StatBar 
                  key={`${pokemon.id}-${stat.stat.name}`}
                  label={statName}
                  value={stat.base_stat}
                  colorClass={statColors[stat.stat.name] || 'bg-slate-500'}
                />
              );
            })}
          </div>
        </div>

        <div className="pb-8">
          <h3 className="text-base font-bold mb-3 text-slate-800 dark:text-white">Abilities</h3>
          <div className="flex flex-wrap gap-2">
            {pokemon.abilities.map(a => (
              <span key={a.ability.name} className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-xl text-sm font-bold text-slate-800 dark:text-slate-200 border border-blue-500/20 dark:border-blue-400/30 shadow-sm">
                {capitalize(a.ability.name)} {a.is_hidden && <span className="text-xs opacity-70 font-medium ml-1">(Hidden)</span>}
              </span>
            ))}
          </div>
        </div>

        <div className="pb-10">
          <h3 className="text-base font-bold mb-4 text-slate-800 dark:text-white">Evolution</h3>
          <div className="flex items-center justify-center gap-2">
            {loadingExtra ? (
              <span className="text-slate-400 text-sm">Loading evolution...</span>
            ) : evolutions.length > 0 ? (
              evolutions.map((evo, i) => (
                <React.Fragment key={evo.name}>
                  <img src={evo.image} alt={evo.name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md hover:scale-110 transition-transform cursor-pointer" />
                  {i < evolutions.length - 1 && (
                    <div className="bg-slate-200/80 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-bold text-slate-700 dark:text-slate-300 shadow-inner mx-1 uppercase tracking-wider">
                      {evolutions[i+1].min_level ? `Lv. ${evolutions[i+1].min_level}` : '?'}
                    </div>
                  )}
                </React.Fragment>
              ))
            ) : (
              <span className="text-slate-400 text-sm">No evolution chain.</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SidebarDetails;
