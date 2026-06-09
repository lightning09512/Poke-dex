export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon list');
  return response.json();
};

export const fetchPokemonDetails = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Pokemon details');
  return response.json();
};

export const fetchPokemonSpecies = async (idOrName) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon species');
  return response.json();
};

export const fetchPokemonByType = async (type) => {
  const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  if (!response.ok) throw new Error('Failed to fetch Pokemon by type');
  const data = await response.json();
  return data.pokemon.map(p => p.pokemon);
};

export const fetchPokemonByName = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  if (!response.ok) throw new Error('Pokemon not found');
  return response.json();
};
