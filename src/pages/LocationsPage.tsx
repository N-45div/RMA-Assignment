// src/pages/LocationsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const url = searchTerm ? `https://rickandmortyapi.com/api/location?name=${searchTerm}` : 'https://rickandmortyapi.com/api/location';
    axios.get(url).then((response) => {
      setLocations(response.data.results);
      setLoading(false);
    });
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Locations</h1>
      <input 
        type="text" 
        placeholder="Search by location name" 
        value={searchTerm}
        onChange={handleSearch} 
      />
      <ul>
        {locations.map((location) => (
          <li key={location.id}>
            {location.name} - {location.type} - {location.dimension}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsPage;
