// src/tests/CharacterGrid.test.tsx

// Import necessary libraries and components for testing
import { render, screen } from '@testing-library/react'; // Import render and screen for testing utilities
import CharacterGrid from '../components/CharacterGrid'; // Import the CharacterGrid component to be tested
import { Character } from '../types'; // Import the Character type for TypeScript type checking
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter to provide routing context for the tests

// Mock data for testing
const mockCharacters: Character[] = [
  {
    id: '1', // Unique identifier for the character
    name: 'Rick Sanchez', // Name of the character
    status: 'Alive', // Status of the character (e.g., Alive, Dead)
    species: 'Human', // Species of the character
    gender: 'Male', // Gender of the character
    origin: { name: 'Earth (C-137)' }, // Origin information (only name included)
    location: { name: 'Earth (Replacement Dimension)' }, // Current location information (only name included)
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', // URL to the character's image
    episode: [], // List of episodes the character appears in (empty for mock data)
  },
  {
    id: '2', // Unique identifier for the character
    name: 'Morty Smith', // Name of the character
    status: 'Alive', // Status of the character
    species: 'Human', // Species of the character
    gender: 'Male', // Gender of the character
    origin: { name: 'Earth (C-137)' }, // Origin information
    location: { name: 'Earth (Replacement Dimension)' }, // Current location information
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', // URL to the character's image
    episode: [], // List of episodes the character appears in (empty for mock data)
  },
];

// Describe the tests for the CharacterGrid component
describe('CharacterGrid', () => {
  // Test case for rendering a grid of character cards
  it('renders a grid of character cards', () => {
    // Render the CharacterGrid component with the mock characters inside a MemoryRouter
    render(
      <MemoryRouter>
        <CharacterGrid characters={mockCharacters} />
      </MemoryRouter>
    );

    // Ensure that the names of both characters are rendered correctly
    expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();

    // Check if the character images are rendered with the correct alt text
    expect(screen.getByAltText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Morty Smith/i)).toBeInTheDocument();
  });

  // Test case for rendering no cards when there are no characters
  it('renders no cards when there are no characters', () => {
    // Render the CharacterGrid component with an empty characters array inside a MemoryRouter
    render(
      <MemoryRouter>
        <CharacterGrid characters={[]} />
      </MemoryRouter>
    );

    // Ensure that no character cards are rendered by checking the absence of <img> elements
    const characterCards = screen.queryAllByRole('img'); // Assuming CharacterCard renders an <img>
    expect(characterCards).toHaveLength(0); // Assert that no images are found
  });
});
