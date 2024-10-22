// src/api/characters.ts
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacters = (page: number = 1) => {
  return axios.get(`${BASE_URL}/character?page=${page}`);
};

export const getCharacterById = (id: string) => {
  return axios.get(`${BASE_URL}/character/${id}`);
};
