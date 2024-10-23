// src/api/characters.ts
// Import the axios library for making HTTP requests
import axios from 'axios';

// Define the base URL for the Rick and Morty API
const BASE_URL = 'https://rickandmortyapi.com/api';

// Function to fetch a list of characters from the API
// The function takes an optional parameter 'page' which defaults to 1
export const getCharacters = (page: number = 1) => {
  // Make a GET request to the characters endpoint, appending the page number to the URL
  return axios.get(`${BASE_URL}/character?page=${page}`);
};

// Function to fetch a specific character by their ID
// The function requires 'id' as a parameter which is a string representing the character's unique identifier
export const getCharacterById = (id: string) => {
  // Make a GET request to the character endpoint, using the provided ID in the URL
  return axios.get(`${BASE_URL}/character/${id}`);
};
