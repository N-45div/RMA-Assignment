// src/components/CharacterCard.tsx
import React from 'react'; // React library for building user interfaces
import { Character } from '../types'; // TypeScript interface for the Character type
import { Link } from 'react-router-dom'; // React Router's Link component for navigation
import styled from 'styled-components'; // Library for styling components

// Props interface for the CharacterCard component, requiring a 'character' of type 'Character'
interface CharacterCardProps {
  character: Character;
}

// Functional component to display a character's information in a card format
const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  return (
    <Card>
      {/* Character's image */}
      <img src={character.image} alt={character.name} />
      
      {/* Character's name */}
      <h3>{character.name}</h3>

      {/* Character's species */}
      <p>{character.species}</p>

      {/* Display the character's status (Alive, Dead, or Unknown) with conditional styling */}
      <Status status={character.status}>{character.status}</Status>

      {/* Link to the individual character profile page */}
      <Link to={`/character/${character.id}`}>View Profile</Link>
    </Card>
  );
};

export default CharacterCard;

// Styled component for the character card
const Card = styled.div`
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); // Adds a subtle shadow to the card
  text-align: center;
  transition: transform 0.3s; // Adds a smooth hover animation

  &:hover {
    transform: translateY(-5px); // Moves the card upwards when hovered
  }

  img {
    width: 100%;
    border-radius: 8px; // Rounds the corners of the image
  }

  h3 {
    margin: 8px 0; // Adds space between the character's name and other elements
  }

  a {
    text-decoration: none; // Removes underline from the link
    color: #333; // Sets the link color
    font-weight: bold; // Makes the link text bold
  }
`;

// Styled component for displaying the character's status with dynamic colors
const Status = styled.p<{ status: string }>`
  color: ${({ status }) => 
    status === 'Alive' ? 'green' : 
    status === 'Dead' ? 'red' : 
    'gray'}; // Green for 'Alive', red for 'Dead', and gray for 'Unknown'
  font-weight: bold; // Makes the status text bold
  margin: 8px 0; // Adds space around the status text
`;
