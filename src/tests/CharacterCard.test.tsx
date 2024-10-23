// src/tests/CharacterCard.test.tsx

import React from 'react';
import { render } from '@testing-library/react'; // Import render method for rendering components in tests
import { BrowserRouter as Router } from 'react-router-dom'; // Import Router to provide routing context
import CharacterCard from '../components/CharacterCard'; // Import the CharacterCard component to be tested

// Mock character data to be used in the tests
const character = {
  id: 1, // Unique identifier for the character
  name: 'Rick Sanchez', // Name of the character
  status: 'Alive', // Status of the character (e.g., Alive, Dead)
  species: 'Human', // Species of the character
  type: '', // Type of the character (not applicable for this character)
  gender: 'Male', // Gender of the character
  origin: { name: 'Earth (C-137)', url: '' }, // Origin information (name and URL)
  location: { name: 'Earth (Replacement Dimension)', url: '' }, // Current location information (name and URL)
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg', // URL to the character's image
  episode: [], // List of episodes the character appears in (empty for mock data)
  url: '', // API endpoint URL for the character
  created: '', // Timestamp of when the character was created in the database
};

/**
 * Unit test for the CharacterCard component.
 * This test verifies that the component correctly renders with the provided mock data.
 */
test('renders CharacterCard component', () => {
  // Render the CharacterCard component within a Router context
  const { getByText, getByAltText } = render(
    <Router>
      <CharacterCard character={character} /> // Pass the mock character data as a prop
    </Router>
  );

  // Assert that the character's name is rendered correctly
  expect(getByText('Rick Sanchez')).toBeInTheDocument();
  
  // Assert that the character's species is rendered correctly
  expect(getByText('Human')).toBeInTheDocument();
  
  // Assert that the character's status is rendered correctly
  expect(getByText('Alive')).toBeInTheDocument();
  
  // Assert that the character's image is rendered with the correct alt text
  expect(getByAltText('Rick Sanchez')).toBeInTheDocument();
});
