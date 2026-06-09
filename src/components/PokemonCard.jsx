import React from 'react';
import { getCardBackground, formatPokemonId, capitalize } from '../utils/typeHelpers';

const PokemonCard = ({ pokemon, onClick }) => {
  const primaryType = pokemon.types[0].type.name;
  
  return (
    <div 
      onClick={() => onClick(pokemon)}
      className={`relative group cursor-pointer rounded-2xl p-4 transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 glass ${getCardBackground(primaryType, false)} dark:${getCardBackground(primaryType, true)}`}
    >
      <div className="absolute top-4 right-4 text-sm font-bold text-slate-800/40 dark:text-slate-100/30">
        {formatPokemonId(pokemon.id)}
      </div>
      
      <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
        {capitalize(pokemon.name)}
      </h3>
      
      <div className="flex flex-col gap-2 relative z-10">
        {pokemon.types.map((typeObj) => (
          <span 
            key={typeObj.type.name} 
            className="px-3 py-1 w-max rounded-full text-xs font-semibold bg-white/40 dark:bg-black/20 text-slate-800 dark:text-slate-200 backdrop-blur-sm"
          >
            {capitalize(typeObj.type.name)}
          </span>
        ))}
      </div>

      <div className="absolute bottom-2 right-2 w-28 h-28 opacity-20 dark:opacity-10 z-0">
        {/* Subtle Pokeball background motif */}
        <svg viewBox="0 0 100 100" className="w-full h-full fill-current">
          <path d="M50,0 C22.4,0 0,22.4 0,50 C0,77.6 22.4,100 50,100 C77.6,100 100,77.6 100,50 C100,22.4 77.6,0 50,0 Z M50,91 C27.4,91 9,72.6 9,50 C9,27.4 27.4,9 50,9 C72.6,9 91,27.4 91,50 C91,72.6 72.6,91 50,91 Z"></path>
          <path d="M50,30 C39,30 30,39 30,50 C30,61 39,70 50,70 C61,70 70,61 70,50 C70,39 61,30 50,30 Z M50,61 C43.9,61 39,56.1 39,50 C39,43.9 43.9,39 50,39 C56.1,39 61,43.9 61,50 C61,56.1 56.1,61 50,61 Z"></path>
          <rect x="0" y="45" width="100" height="10"></rect>
        </svg>
      </div>

      <div className="relative z-10 w-full flex justify-end -mt-4">
        <img 
          src={pokemon.sprites.versions?.['generation-v']?.['black-white']?.animated?.front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="w-32 h-32 object-contain group-hover:scale-110 transition-transform duration-300 [image-rendering:pixelated]"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default PokemonCard;
