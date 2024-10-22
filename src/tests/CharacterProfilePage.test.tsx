// src/pages/__tests__/CharacterProfilePage.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import axios from 'axios';
import CharacterProfilePage from '../pages/CharacterProfilePage';
import * as characterApi from '../api/characters'; // Import the module to mock

// Mock axios
vi.mock('axios');

// Mock data
const mockCharacter = {
  id: '1',
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth (C-137)' },
  location: { name: 'Earth (Replacement Dimension)' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: ['https://rickandmortyapi.com/api/episode/1', 'https://rickandmortyapi.com/api/episode/2'],
};

const mockEpisodes = [
  { name: 'Pilot', air_date: 'December 2, 2013' },
  { name: 'Lawnmower Dog', air_date: 'December 9, 2013' },
];

describe('CharacterProfilePage', () => {
  it('renders character profile and episodes correctly', async () => {
    // Mocking character fetch
    vi.spyOn(characterApi, 'getCharacterById').mockResolvedValueOnce({ data: mockCharacter });
    // Mocking episodes fetch
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockEpisodes[0] });
    (axios.get as vi.Mock).mockResolvedValueOnce({ data: mockEpisodes[1] });

    render(
      <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure loading message is shown initially
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    // Wait for character details to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
    });

    // Now use a custom matcher for text split across multiple elements
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

    // Wait for the episodes list to be rendered
    await waitFor(() => {
      expect(screen.getByText(/Pilot/i)).toBeInTheDocument();
      expect(screen.getByText(/Air Date: December 2, 2013/i)).toBeInTheDocument();
      expect(screen.getByText(/Lawnmower Dog/i)).toBeInTheDocument();
      expect(screen.getByText(/Air Date: December 9, 2013/i)).toBeInTheDocument();
    });
  });

  it('shows error message when character is not found', async () => {
    // Mock rejection for the error case
    vi.spyOn(characterApi, 'getCharacterById').mockRejectedValueOnce(new Error('Character not found'));

    render(
      <MemoryRouter initialEntries={['/character/999']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterProfilePage />} />
        </Routes>
      </MemoryRouter>
    );

    // Check if the error message is displayed
    await waitFor(() => {
      expect(screen.getByText(/No character found/i)).toBeInTheDocument();
    });
  });
});
