import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

// Mock character data to be used in the tests
const character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Earth (Replacement Dimension)', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [],
  url: '',
  created: '',
};

/**
 * Unit test for the CharacterCard component.
 * It renders the component with mock data and verifies that the expected elements are present.
 */
test('renders CharacterCard component', () => {
  // Render the CharacterCard component within a Router context
  const { getByText, getByAltText } = render(
    <Router>
      <CharacterCard character={character} />
    </Router>
  );

  // Assert that the character's name is rendered
  expect(getByText('Rick Sanchez')).toBeInTheDocument();
  // Assert that the character's species and status are rendered
  expect(getByText('Human')).toBeInTheDocument();
  // Assert that the character's image is rendered with the correct alt text
  expect(getByAltText('Rick Sanchez')).toBeInTheDocument();
});