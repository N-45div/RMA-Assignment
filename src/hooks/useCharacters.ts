// src/hooks/useCharacters.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Character } from '../types';

export const useCharacters = (page: number = 1, name: string = '', status: string = '', species: string = '') => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    
    if (name) url += `&name=${name}`;
    if (status) url += `&status=${status}`;
    if (species) url += `&species=${species}`;
    
    axios.get(url)
      .then((response) => {
        setCharacters(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [page, name, status, species]);

  return { characters, loading, error };
};
