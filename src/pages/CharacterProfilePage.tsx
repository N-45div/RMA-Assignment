// src/pages/CharacterProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Hook to access route parameters (in this case, the character ID)
import axios from 'axios'; // HTTP client for making API requests
import { getCharacterById } from '../api/characters'; // Function to fetch character data from the API
import { Character } from '../types'; // TypeScript interface for the Character type
import styled from 'styled-components'; // Library for styling components

// Interface representing an Episode object (includes the episode name and air date)
interface Episode {
  name: string;
  air_date: string;
}

const CharacterProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the character ID from the URL
  const [character, setCharacter] = useState<Character | null>(null); // State to store the character data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [episodes, setEpisodes] = useState<Episode[]>([]); // State to store the fetched episodes

  // useEffect hook to fetch character data when the component mounts or when 'id' changes
  useEffect(() => {
    if (id) {
      // Fetch character data by ID
      getCharacterById(id)
        .then((response) => {
          setCharacter(response.data); // Set the character data in state
          return response.data.episode;  // Return episode URLs array for further processing
        })
        .then((episodeUrls) => {
          // For each episode URL, make an API request to fetch the episode details
          const episodePromises = episodeUrls.map((url: string) => axios.get(url));
          return Promise.all(episodePromises); // Wait until all episode requests are resolved
        })
        .then((episodeResponses) => {
          // Extract the episode data from each API response
          const fetchedEpisodes = episodeResponses.map((res) => res.data);
          setEpisodes(fetchedEpisodes);  // Set the fetched episodes in state
          setLoading(false); // Set loading to false after all data has been fetched
        })
        .catch((error) => {
          console.error(error); // Log any errors that occur during the data fetching process
          setLoading(false); // Set loading to false in case of an error
        });
    }
  }, [id]); // Dependency array with 'id' to refetch data when the character ID changes

  // Show loading state until data is fetched
  if (loading) return <p>Loading...</p>;
  // Show an error message if the character could not be found
  if (!character) return <p>No character found.</p>;

  return (
    // Profile page layout and content
    <ProfileContainer>
      {/* Character's image */}
      <img src={character.image} alt={character.name} />
      {/* Character's name */}
      <h1>{character.name}</h1>

      {/* Character details such as status, species, gender, origin, and location */}
      <Info><strong>Status:</strong> {character.status}</Info>
      <Info><strong>Species:</strong> {character.species}</Info>
      <Info><strong>Gender:</strong> {character.gender}</Info>
      <Info><strong>Origin:</strong> {character.origin.name}</Info>
      <Info><strong>Location:</strong> {character.location.name}</Info>

      {/* Display the list of episodes the character is featured in */}
      <h3>Episodes Featured:</h3>
      <ul>
        {/* Map over the episodes and render the episode name and air date */}
        {episodes.map((episode, index) => (
          <li key={index}>
            <strong>{episode.name}</strong> (Air Date: {episode.air_date})
          </li>
        ))}
      </ul>
    </ProfileContainer>
  );
};

export default CharacterProfilePage;

// Styled components for the profile page
const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;

  img {
    width: 200px;
    border-radius: 50%;
  }

  h1 {
    margin: 20px 0;
  }
`;

// Styled component for character information (status, species, etc.)
const Info = styled.p`
  font-size: 1.2em;
  margin: 10px 0;

  strong {
    color: #333;
  }
`;
