import { useState, useEffect, useCallback } from 'react';
import { fetchPokemonList, fetchPokemonDetails, fetchPokemonByType, fetchPokemonByName } from '../utils/pokemonApi';

export const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  
  // Filtering and Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  const limit = 20;

  // Cache object to store loaded detailed Pokemon info
  const [cache, setCache] = useState({});

  const loadPokemonData = useCallback(async (urlsOrNames) => {
    const newCache = { ...cache };
    const toFetch = urlsOrNames.filter(item => !newCache[item.name]);
    
    if (toFetch.length > 0) {
      const results = await Promise.all(
        toFetch.map(item => fetchPokemonDetails(item.url || `https://pokeapi.co/api/v2/pokemon/${item.name}`))
      );
      results.forEach(res => {
        newCache[res.name] = res;
      });
      setCache(newCache);
    }
    
    return urlsOrNames.map(item => newCache[item.name] || newCache[item.name]);
  }, [cache]);

  useEffect(() => {
    let isMounted = true;

    const fetchInitial = async () => {
      try {
        setLoading(true);
        setError(null);
        let results = [];

        if (searchQuery) {
          // If searching, only fetch that specific Pokemon
          try {
            const data = await fetchPokemonByName(searchQuery);
            if (isMounted) {
              setPokemonList([data]);
              setHasMore(false);
            }
          } catch (err) {
            if (isMounted) {
              setPokemonList([]);
              setError('Pokemon not found.');
            }
          }
          setLoading(false);
          return;
        }

        if (selectedType !== 'all') {
          // Fetch all by type, then load details for the first batch
          const typePokemon = await fetchPokemonByType(selectedType);
          const paginated = typePokemon.slice(0, offset + limit);
          
          await loadPokemonData(paginated);
          
          if (isMounted) {
            // we use the cache directly for mapping
            const detailed = paginated.map(p => cache[p.name]).filter(Boolean);
            setPokemonList(detailed);
            setHasMore(offset + limit < typePokemon.length);
          }
        } else {
          // Standard pagination
          const data = await fetchPokemonList(offset, limit);
          await loadPokemonData(data.results);
          
          if (isMounted) {
            const detailed = data.results.map(p => cache[p.name]).filter(Boolean);
            setPokemonList(prev => offset === 0 ? detailed : [...prev, ...detailed]);
            setHasMore(data.next !== null);
          }
        }
      } catch (err) {
        if (isMounted) setError(err.message || 'Something went wrong');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchInitial();

    return () => { isMounted = false; };
  }, [offset, selectedType, searchQuery]); // Re-fetch when these change

  const loadMore = () => {
    if (!loading && hasMore && !searchQuery) {
      setOffset(prev => prev + limit);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setOffset(0);
    if (!query) {
      setPokemonList([]);
    }
  };

  const handleFilterType = (type) => {
    setSelectedType(type);
    setSearchQuery('');
    setOffset(0);
    setPokemonList([]);
  };

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    searchQuery,
    handleSearch,
    selectedType,
    handleFilterType
  };
};
