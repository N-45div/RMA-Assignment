// src/tests/CharacterProfilePage.test.tsx

// Import necessary libraries and components for testing
import { render, screen, waitFor } from '@testing-library/react'; // Import testing utilities from Testing Library
import { MemoryRouter, Route, Routes } from 'react-router-dom'; // Import MemoryRouter for routing context
import { vi } from 'vitest'; // Import vitest for mocking functionality
import axios from 'axios'; // Import axios for making HTTP requests
import CharacterProfilePage from '../pages/CharacterProfilePage'; // Import the CharacterProfilePage component to be tested
import * as characterApi from '../api/characters'; // Import the characters API module for mocking

// Mock axios to intercept API requests during tests
vi.mock('axios');

// Mock character data to simulate API response
const mockCharacter = {
  id: '1', // Unique identifier for the character
  name: 'Rick Sanchez', // Name of the character
  status: 'Alive', // Status of the character
  species: 'Human', // Species of the character
  gender: 'Male', // Gender of the character
  origin: { name: 'Earth (C-137)' }, // Origin information
  location: { name: 'Earth (Replacement Dimension)' }, // Current location information
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', // URL to the character's image
  episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'], // List of episodes the character appears in
};

// Mock episode data to simulate API response
const mockEpisodes = [
  { name: 'Pilot', air_date: 'December 2, 2013' }, // First episode details
  { name: 'Lawnmower Dog', air_date: 'December 9, 2013' }, // Second episode details
];

// Describe the tests for the CharacterProfilePage component
describe('CharacterProfilePage', () => {
  // Test case for rendering character profile and episodes correctly
  it('renders character profile and episodes correctly', async () => {
    // Mock the fetch for character details
    vi.spyOn(characterApi, 'getCharacterById').mockResolvedValueOnce({ data: mockCharacter });

    // Mock the fetch for episode details
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockEpisodes[0] });
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockEpisodes[1] });

    // Render the CharacterProfilePage within a MemoryRouter, simulating navigation to a character profile
    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure that a loading message is displayed initially while data is being fetched
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for character details to be rendered after the API call
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });

    // Check that character details (status, species, gender, origin, location) are rendered correctly
    await waitFor(() => {
      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Status: Alive';
      })).toBeInTheDocument();

      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Species: Human';
      })).toBeInTheDocument();

      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Gender: Male';
      })).toBeInTheDocument();

      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Origin: Earth (C-137)';
      })).toBeInTheDocument();

      expect(screen.getByText((content, element) => {
        return element?.textContent === 'Location: Earth (Replacement Dimension)';
      })).toBeInTheDocument();
    });

    // Wait for the episodes list to be rendered correctly
    await waitFor(() => {
      expect(screen.getByText(/Pilot/i)).toBeInTheDocument();
      expect(screen.getByText(/Air Date: December 2, 2013/i)).toBeInTheDocument();
      expect(screen.getByText(/Lawnmower Dog/i)).toBeInTheDocument();
      expect(screen.getByText(/Air Date: December 9, 2013/i)).toBeInTheDocument();
    });
  });

  // Test case for handling when the character is not found
  it('shows error message when character is not found', async () => {
    // Mock rejection for the case where the character is not found
    vi.spyOn(characterApi, 'getCharacterById').mockRejectedValueOnce(new Error('Character not found'));

    // Render the CharacterProfilePage for a non-existent character ID
    render(
      <MemoryRouter initialEntries={['/character/999']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the error message is displayed when no character is found
    await waitFor(() => {
      expect(screen.getByText(/No character found/i)).toBeInTheDocument();
    });
  });
});
