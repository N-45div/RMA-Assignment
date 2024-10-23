// src/components/CharacterGrid.tsx
import React from 'react'; // Import React to build components
import CharacterCard from './CharacterCard'; // Import the CharacterCard component to display individual characters
import { Character } from '../types'; // Import the Character type definition
import styled from 'styled-components'; // Import styled-components for styling

// Props interface for the CharacterGrid component, which takes an array of characters
interface CharacterGridProps {
  characters: Character[];
}

// Functional component to display a grid of character cards
const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  return (
    <Grid>
      {/* Map over the characters array and render a CharacterCard for each character */}
      {characters.map((character) => (
        // Pass the character data to the CharacterCard component and assign a unique key based on the character's ID
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};

export default CharacterGrid;

// Styled component for the grid layout
const Grid = styled.div`
  display: grid; // Use CSS Grid for layout
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); // Create flexible columns with a minimum width of 200px
  gap: 16px; // Set the gap between grid items to 16px
  padding: 16px; // Add padding around the grid
`;
