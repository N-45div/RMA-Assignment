// src/pages/EpisodesPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EpisodesPage: React.FC = () => {
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const url = searchTerm ? `https://rickandmortyapi.com/api/episode?name=${searchTerm}` : 'https://rickandmortyapi.com/api/episode';
    axios.get(url).then((response) => {
      setEpisodes(response.data.results);
      setLoading(false);
    });
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Episodes</h1>
      <input 
        type="text" 
        placeholder="Search by episode name" 
        value={searchTerm}
        onChange={handleSearch} 
      />
      <ul>
        {episodes.map((episode) => (
          <li key={episode.id}>
            {episode.name} - {episode.air_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodesPage;
