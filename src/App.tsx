// src/App.tsx

// Import necessary libraries and components
import React from 'react'; // Import React for building the component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Router components for routing
import HomePage from './pages/HomePage'; // Import the HomePage component
import CharacterProfilePage from './pages/CharacterProfilePage'; // Import the CharacterProfilePage component
import LocationsPage from './pages/LocationsPage'; // Import the LocationsPage component
import EpisodesPage from './pages/EpisodesPage'; // Import the EpisodesPage component
import Navbar from './components/Navbar'; // Import the Navbar component for navigation

// Define the main App component
const App: React.FC = () => {
  return (
    // Wrap the application in a Router to enable routing
    <Router>
      <Navbar /> {/* Render the Navbar at the top of the application */}

      {/* Define routes for different pages in the application */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the character profile page, with a dynamic ID parameter */}
        <Route path="/character/:id" element={<CharacterProfilePage />} />
        {/* Route for the locations page */}
        <Route path="/locations" element={<LocationsPage />} />
        {/* Route for the episodes page */}
        <Route path="/episodes" element={<EpisodesPage />} />
      </Routes>
    </Router>
  );
};

// Export the App component as the default export
export default App;
