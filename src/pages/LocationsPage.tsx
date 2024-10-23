// src/pages/LocationsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // HTTP client for making API requests

// Functional component to display a list of locations with search functionality
const LocationsPage: React.FC = () => {
  // State to store the list of locations fetched from the API
  const [locations, setLocations] = useState<any[]>([]);
  
  // State to track the loading status (initially set to true)
  const [loading, setLoading] = useState(true);
  
  // State to track the search input value for filtering locations by name
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook to fetch location data when the component mounts or when the search term changes
  useEffect(() => {
    // Construct the API URL. If a search term is present, include it in the API request; otherwise, fetch all locations
    const url = searchTerm ? `https://rickandmortyapi.com/api/location?name=${searchTerm}` : 'https://rickandmortyapi.com/api/location';
    
    // Make the API request to fetch locations
    axios.get(url).then((response) => {
      setLocations(response.data.results); // Set the fetched locations in the state
      setLoading(false); // Set loading to false after data is fetched
    });
  }, [searchTerm]); // Dependency array with 'searchTerm' to refetch data whenever the search term changes

  // Handler function to update the search term based on user input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value); // Update searchTerm state with the input value
  };

  // If the data is still loading, display a loading message
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {/* Page title */}
      <h1>Locations</h1>
      
      {/* Input field for searching locations by name */}
      <input 
        type="text" 
        placeholder="Search by location name" 
        value={searchTerm}
        onChange={handleSearch} 
      />
      
      {/* Display the list of locations */}
      <ul>
        {locations.map((location) => (
          // For each location, display its name, type, and dimension
          <li key={location.id}>
            {location.name} - {location.type} - {location.dimension}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationsPage;
