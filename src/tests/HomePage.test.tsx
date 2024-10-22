import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { vi } from 'vitest';

vi.mock('axios');

const mockCharacters = [
  {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    origin: { name: 'Earth' },
    location: { name: 'Earth' },
    episode: [],
  },
  {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    status: 'Alive',
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    origin: { name: 'Earth' },
    location: { name: 'Earth' },
    episode: [],
  },
];

test('renders the homepage and fetches characters', async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: { results: mockCharacters } });

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Ensure loading text is shown before data is loaded
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for characters to be rendered
  const characterElement = await screen.findByText(/Rick Sanchez/i);
  expect(characterElement).toBeInTheDocument();

  // Ensure both characters are displayed
  expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
});

test('search functionality works', async () => {
  (axios.get as jest.Mock).mockResolvedValue({ data: { results: mockCharacters } });

  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Wait for characters to be rendered
  await screen.findByText(/Rick Sanchez/i);

  // Type a search term
  fireEvent.change(screen.getByPlaceholderText('Search by name'), { target: { value: 'Morty' } });

  // Ensure Morty is shown after search
  expect(await screen.findByText(/Morty Smith/i)).toBeInTheDocument();
  expect(screen.queryByText(/Rick Sanchez/i)).toBeInTheDocument();
});
