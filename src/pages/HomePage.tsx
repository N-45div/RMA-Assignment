// src/pages/HomePage.tsx
import React, { useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';
import CharacterGrid from '../components/CharacterGrid';

const HomePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [speciesFilter, setSpeciesFilter] = useState('');
  const { characters, loading, error } = useCharacters(page, searchTerm, statusFilter, speciesFilter);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handleSpeciesFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeciesFilter(e.target.value);
  };

  const handleNextPage = () => setPage(page + 1);
  const handlePreviousPage = () => setPage(page > 1 ? page - 1 : 1);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Rick and Morty Characters</h1>

      {/* Search and Filter Controls */}
      <div>
        <input 
          type="text" 
          placeholder="Search by name" 
          value={searchTerm}
          onChange={handleSearch} 
        />

        <select value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Statuses</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select value={speciesFilter} onChange={handleSpeciesFilter}>
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <CharacterGrid characters={characters} />

      <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
      <button onClick={handleNextPage}>Next</button>
    </div>
  );
};

export default HomePage;
