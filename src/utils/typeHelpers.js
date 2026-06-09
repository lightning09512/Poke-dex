export const TYPE_COLORS = {
  grass: 'bg-type-grass',
  fire: 'bg-type-fire',
  water: 'bg-type-water',
  bug: 'bg-type-bug',
  normal: 'bg-type-normal',
  poison: 'bg-type-poison',
  electric: 'bg-type-electric',
  ground: 'bg-type-ground',
  fairy: 'bg-type-fairy',
  fighting: 'bg-type-fighting',
  psychic: 'bg-type-psychic',
  rock: 'bg-type-rock',
  ghost: 'bg-type-ghost',
  ice: 'bg-type-ice',
  dragon: 'bg-type-dragon',
  dark: 'bg-type-dark',
  steel: 'bg-type-steel',
  flying: 'bg-type-flying',
};

// Returns Tailwind background colors with opacity for premium look
export const getCardBackground = (type, isDark = false) => {
  const lightColors = {
    grass: 'bg-green-100/80 hover:bg-green-100',
    fire: 'bg-red-100/80 hover:bg-red-100',
    water: 'bg-blue-100/80 hover:bg-blue-100',
    bug: 'bg-lime-100/80 hover:bg-lime-100',
    normal: 'bg-slate-100/80 hover:bg-slate-100',
    poison: 'bg-purple-100/80 hover:bg-purple-100',
    electric: 'bg-yellow-100/80 hover:bg-yellow-100',
    ground: 'bg-amber-100/80 hover:bg-amber-100',
    fairy: 'bg-pink-100/80 hover:bg-pink-100',
    fighting: 'bg-orange-100/80 hover:bg-orange-100',
    psychic: 'bg-rose-100/80 hover:bg-rose-100',
    rock: 'bg-stone-200/80 hover:bg-stone-200',
    ghost: 'bg-violet-100/80 hover:bg-violet-100',
    ice: 'bg-sky-100/80 hover:bg-sky-100',
    dragon: 'bg-indigo-100/80 hover:bg-indigo-100',
    dark: 'bg-zinc-200/80 hover:bg-zinc-200',
    steel: 'bg-slate-200/80 hover:bg-slate-200',
    flying: 'bg-cyan-100/80 hover:bg-cyan-100',
  };

  const darkColors = {
    grass: 'bg-green-900/30 hover:bg-green-900/50 shadow-[0_0_15px_rgba(74,222,128,0.15)]',
    fire: 'bg-red-900/30 hover:bg-red-900/50 shadow-[0_0_15px_rgba(248,113,113,0.15)]',
    water: 'bg-blue-900/30 hover:bg-blue-900/50 shadow-[0_0_15px_rgba(96,165,250,0.15)]',
    bug: 'bg-lime-900/30 hover:bg-lime-900/50 shadow-[0_0_15px_rgba(163,230,53,0.15)]',
    normal: 'bg-slate-800/30 hover:bg-slate-800/50',
    poison: 'bg-purple-900/30 hover:bg-purple-900/50 shadow-[0_0_15px_rgba(192,132,252,0.15)]',
    electric: 'bg-yellow-900/30 hover:bg-yellow-900/50 shadow-[0_0_15px_rgba(250,204,21,0.15)]',
    ground: 'bg-amber-900/30 hover:bg-amber-900/50 shadow-[0_0_15px_rgba(234,179,8,0.15)]',
    fairy: 'bg-pink-900/30 hover:bg-pink-900/50 shadow-[0_0_15px_rgba(244,114,182,0.15)]',
    fighting: 'bg-orange-900/30 hover:bg-orange-900/50 shadow-[0_0_15px_rgba(251,146,60,0.15)]',
    psychic: 'bg-rose-900/30 hover:bg-rose-900/50 shadow-[0_0_15px_rgba(251,113,133,0.15)]',
    rock: 'bg-stone-800/30 hover:bg-stone-800/50',
    ghost: 'bg-violet-900/30 hover:bg-violet-900/50 shadow-[0_0_15px_rgba(167,139,250,0.15)]',
    ice: 'bg-sky-900/30 hover:bg-sky-900/50 shadow-[0_0_15px_rgba(125,211,252,0.15)]',
    dragon: 'bg-indigo-900/30 hover:bg-indigo-900/50 shadow-[0_0_15px_rgba(129,140,248,0.15)]',
    dark: 'bg-zinc-800/30 hover:bg-zinc-800/50',
    steel: 'bg-slate-700/30 hover:bg-slate-700/50',
    flying: 'bg-cyan-900/30 hover:bg-cyan-900/50 shadow-[0_0_15px_rgba(103,232,249,0.15)]',
  };

  const selected = isDark ? darkColors[type] : lightColors[type];
  return selected || (isDark ? 'bg-slate-800/30' : 'bg-slate-100/80');
};

export const formatPokemonId = (id) => {
  return `#${id.toString().padStart(3, '0')}`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
