// src/pages/EpisodesPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // HTTP client for making API requests

// Functional component to display a list of episodes with search functionality
const EpisodesPage: React.FC = () => {
  // State to store the list of episodes
  const [episodes, setEpisodes] = useState<any[]>([]); 
  
  // State to track loading status (initially set to true)
  const [loading, setLoading] = useState(true); 
  
  // State to track the search input value
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook to fetch episodes when the component mounts or the search term changes
  useEffect(() => {
    // If a search term is provided, include it in the API request; otherwise, fetch all episodes
    const url = searchTerm ? `https://rickandmortyapi.com/api/episode?name=${searchTerm}` : 'https://rickandmortyapi.com/api/episode';
    
    // Make a GET request to the API
    axios.get(url).then((response) => {
      setEpisodes(response.data.results); // Set the fetched episodes in the state
      setLoading(false); // Set loading to false after the data is fetched
    });
  }, [searchTerm]); // Dependency array with 'searchTerm' to refetch data when the search term changes

  // Handler function to update the search term based on user input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update searchTerm state with the input value
  };

  // If the data is still loading, display a loading message
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Page title */}
      <h1>Episodes</h1>
      
      {/* Input field to search for episodes by name */}
      <input 
        type="text" 
        placeholder="Search by episode name" 
        value={searchTerm}
        onChange={handleSearch} 
      />
      
      {/* Display a list of episodes */}
      <ul>
        {episodes.map((episode) => (
          // For each episode, display its name and air date
          <li key={episode.id}>
            {episode.name} - {episode.air_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodesPage;
