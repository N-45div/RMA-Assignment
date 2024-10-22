// src/types.ts
export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    image: string;
    origin: {
      name: string;
    };
    location: {
      name: string;
    };
    episode: string[];
  }
  