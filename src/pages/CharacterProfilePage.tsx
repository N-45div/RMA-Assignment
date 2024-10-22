// src/pages/CharacterProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getCharacterById } from '../api/characters';
import { Character } from '../types';
import styled from 'styled-components';

interface Episode {
  name: string;
  air_date: string;
}

const CharacterProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (id) {
      getCharacterById(id)
        .then((response) => {
          setCharacter(response.data);
          return response.data.episode;  // Return episode URLs array
        })
        .then((episodeUrls) => {
          // Fetch episode details from URLs
          const episodePromises = episodeUrls.map((url: string) => axios.get(url));
          return Promise.all(episodePromises);
        })
        .then((episodeResponses) => {
          const fetchedEpisodes = episodeResponses.map((res) => res.data);
          setEpisodes(fetchedEpisodes);  // Set the fetched episodes
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!character) return <p>No character found.</p>;

  return (
    <ProfileContainer>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <Info><strong>Status:</strong> {character.status}</Info>
      <Info><strong>Species:</strong> {character.species}</Info>
      <Info><strong>Gender:</strong> {character.gender}</Info>
      <Info><strong>Origin:</strong> {character.origin.name}</Info>
      <Info><strong>Location:</strong> {character.location.name}</Info>

      <h3>Episodes Featured:</h3>
      <ul>
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

const Info = styled.p`
  font-size: 1.2em;
  margin: 10px 0;
  strong {
    color: #333;
  }
`;
