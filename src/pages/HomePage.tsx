// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters'; // Custom hook to fetch character data
import CharacterGrid from '../components/CharacterGrid'; // Component to display characters in a grid

// Functional component for the Home Page
const HomePage: React.FC = () => {
  // State to store the current page number for pagination
  const [page, setPage] = useState(1);
  
  // State to store the search term for filtering characters by name
  const [searchTerm, setSearchTerm] = useState('');
  
  // State to store the selected status filter (Alive, Dead, or Unknown)
  const [statusFilter, setStatusFilter] = useState('');
  
  // State to store the selected species filter (Human, Alien, etc.)
  const [speciesFilter, setSpeciesFilter] = useState('');

  // Destructure the character data, loading state, and error message from the custom `useCharacters` hook
  const { characters, loading, error } = useCharacters(page, searchTerm, statusFilter, speciesFilter);

  // Handler for updating the search term based on user input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update searchTerm state with the input value
  };

  // Handler for updating the status filter based on user selection
  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value); // Update statusFilter state with the selected value
  };

  // Handler for updating the species filter based on user selection
  const handleSpeciesFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeciesFilter(e.target.value); // Update speciesFilter state with the selected value
  };

  // Handler for moving to the next page (pagination)
  const handleNextPage = () => setPage(page + 1);

  // Handler for moving to the previous page (pagination)
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  // Display loading message while data is being fetched
  if (loading) return <p>Loading...</p>;

  // Display error message if there is an issue with fetching data
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Page title */}
      <h1>Rick and Morty Characters</h1>

      {/* Search and Filter Controls */}
      <div>
        {/* Input field for searching characters by name */}
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm}
          onChange={handleSearch} 
        />

        {/* Dropdown to filter characters by status (Alive, Dead, Unknown) */}
        <select value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        {/* Dropdown to filter characters by species (Human, Alien, etc.) */}
        <select value={speciesFilter} onChange={handleSpeciesFilter}>
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      {/* Display the character grid */}
      <CharacterGrid characters={characters} />

      {/* Pagination controls */}
      <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default HomePage;
