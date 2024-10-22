// src/components/__tests__/CharacterGrid.test.tsx

import { render, screen } from '@testing-library/react';
import CharacterGrid from '../components/CharacterGrid';
import { Character } from '../types';
import { MemoryRouter } from 'react-router-dom'; // If CharacterCard uses Link or routing

// Mock data
const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Earth (Replacement Dimension)' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: [],
  },
  {
    id: '2',
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth (C-137)' },
    location: { name: 'Earth (Replacement Dimension)' },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    episode: [],
  },
];

describe('CharacterGrid', () => {
  it('renders a grid of character cards', () => {
    // Render the component with the mock characters
    render(
      <MemoryRouter>
        <CharacterGrid characters={mockCharacters} />
      </MemoryRouter>
    );

    // Ensure that both characters are rendered
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();

    // Check if the character images are rendered
    expect(screen.getByAltText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Morty Smith/i)).toBeInTheDocument();
  });

  it('renders no cards when there are no characters', () => {
    // Render the component with an empty characters array
    render(
      <MemoryRouter>
        <CharacterGrid characters={[]} />
      </MemoryRouter>
    );

    // Ensure that no character cards are rendered
    const characterCards = screen.queryAllByRole('img'); // Assuming CharacterCard renders an <img>
    expect(characterCards).toHaveLength(0);
  });
});
