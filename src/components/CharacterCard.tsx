// src/components/CharacterCard.tsx
import React from 'react';
import { Character } from '../types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card>
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
      <Status status={character.status}>{character.status}</Status>
      <Link to={`/character/${character.id}`}>View Profile</Link>
    </Card>
  );
};

export default CharacterCard;

const Card = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
  img {
    width: 100%;
    border-radius: 8px;
  }
  h3 {
    margin: 8px 0;
  }
  a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
`;

const Status = styled.p<{ status: string }>`
  color: ${({ status }) => (status === 'Alive' ? 'green' : status === 'Dead' ? 'red' : 'gray')};
  font-weight: bold;
  margin: 8px 0;
`;
