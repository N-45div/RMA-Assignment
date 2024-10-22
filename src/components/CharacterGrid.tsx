// src/components/CharacterGrid.tsx
import React from 'react';
import CharacterCard from './CharacterCard';
import { Character } from '../types';
import styled from 'styled-components';

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ characters }) => {
  return (
    <Grid>
      {characters.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </Grid>
  );
};

export default CharacterGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
`;
