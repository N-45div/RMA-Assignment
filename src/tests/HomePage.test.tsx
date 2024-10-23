// src/tests/HomePage.test.tsx

import { render, screen, fireEvent } from '@testing-library/react'; // Import testing utilities from Testing Library
import HomePage from '../pages/HomePage'; // Import the HomePage component to be tested
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter to provide routing context
import axios from 'axios'; // Import axios for making HTTP requests
import { vi } from 'vitest'; // Import vitest for mocking functionality

// Mock axios to intercept API requests during tests
vi.mock('axios');

// Mock character data to simulate API response
const mockCharacters = [
  {
    id: 1, // Unique identifier for the character
    name: 'Rick Sanchez', // Name of the character
    species: 'Human', // Species of the character
    status: 'Alive', // Status of the character
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', // URL to the character's image
    origin: { name: 'Earth' }, // Origin information
    location: { name: 'Earth' }, // Current location information
    episode: [], // List of episodes the character appears in (empty for mock data)
  },
  {
    id: 2, // Unique identifier for the character
    name: 'Morty Smith', // Name of the character
    species: 'Human', // Species of the character
    status: 'Alive', // Status of the character
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg', // URL to the character's image
    origin: { name: 'Earth' }, // Origin information
    location: { name: 'Earth' }, // Current location information
    episode: [], // List of episodes the character appears in (empty for mock data)
  },
];

// Test case for rendering the homepage and fetching characters
test('renders the homepage and fetches characters', async () => {
  // Mock the fetch for character details
  (axios.get as jest.Mock).mockResolvedValue({ data: { results: mockCharacters } });

  // Render the HomePage component within a BrowserRouter to provide routing context
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Ensure that loading text is shown before character data is loaded
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

  // Wait for character details to be rendered after the API call
  const characterElement = await screen.findByText(/Rick Sanchez/i);
  expect(characterElement).toBeInTheDocument();

  // Ensure that both characters are displayed on the homepage
  expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
});

// Test case for verifying the search functionality on the homepage
test('search functionality works', async () => {
  // Mock the fetch for character details
  (axios.get as jest.Mock).mockResolvedValue({ data: { results: mockCharacters } });

  // Render the HomePage component within a BrowserRouter to provide routing context
  render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Wait for character details to be rendered
  await screen.findByText(/Rick Sanchez/i);

  // Simulate typing a search term into the search input field
  fireEvent.change(screen.getByPlaceholderText('Search by name'), { target: { value: 'Morty' } });

  // Ensure that the character "Morty Smith" is shown after the search
  expect(await screen.findByText(/Morty Smith/i)).toBeInTheDocument();
  
  // Ensure that the character "Rick Sanchez" is still displayed
  expect(screen.queryByText(/Rick Sanchez/i)).toBeInTheDocument();
});
