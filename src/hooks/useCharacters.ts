// src/hooks/useCharacters.ts
import { useState, useEffect } from 'react'; // React hooks for state management and lifecycle
import axios from 'axios'; // HTTP client for making API requests
import { Character } from '../types'; // TypeScript interface for the Character type

// Custom hook to fetch characters with pagination and filtering options (name, status, species)
export const useCharacters = (
  page: number = 1, // Default page number is 1
  name: string = '', // Default search term is an empty string (no filtering by name)
  status: string = '', // Default status filter is empty (no filtering by status)
  species: string = '' // Default species filter is empty (no filtering by species)
) => {
  // State to store the list of characters fetched from the API
  const [characters, setCharacters] = useState<Character[]>([]);
  
  // State to track the loading status (initially set to true)
  const [loading, setLoading] = useState(true);
  
  // State to track any error that occurs during the API request
  const [error, setError] = useState<string | null>(null);

  // useEffect hook to fetch character data when the component mounts or when dependencies change
  useEffect(() => {
    setLoading(true); // Set loading to true whenever a new request is made
    
    // Construct the API URL with pagination and optional filters for name, status, and species
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;
    
    // Append query parameters if filters are provided
    if (name) url += `&name=${name}`;
    if (status) url += `&status=${status}`;
    if (species) url += `&species=${species}`;
    
    // Make the API request
    axios.get(url)
      .then((response) => {
        // If the request is successful, update the characters state with the fetched data
        setCharacters(response.data.results);
        setLoading(false); // Set loading to false once the data is fetched
      })
      .catch((error) => {
        // If an error occurs during the request, update the error state
        setError(error.message);
        setLoading(false); // Set loading to false in case of an error
      });
  }, [page, name, status, species]); // Dependencies: The hook will re-run whenever these values change

  // Return the characters data, loading status, and error message
  return { characters, loading, error };
};
