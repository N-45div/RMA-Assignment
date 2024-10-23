// src/components/Navbar.tsx
import React from 'react'; // Import React to build components
import { Link } from 'react-router-dom'; // Import Link component from React Router for navigation
import styled from 'styled-components'; // Import styled-components for styling

// Functional component for the navigation bar
const Navbar: React.FC = () => {
  return (
    <Nav>
      {/* Link components for navigation between different pages */}
      <NavItem to="/">Characters</NavItem> {/* Link to the homepage for characters */}
      <NavItem to="/locations">Locations</NavItem> {/* Link to the Locations page */}
      <NavItem to="/episodes">Episodes</NavItem> {/* Link to the Episodes page */}
    </Nav>
  );
};

export default Navbar;

// Styled component for the navigation bar container
const Nav = styled.nav`
  display: flex; // Flexbox layout for aligning items horizontally
  justify-content: center; // Center the navigation items
  background-color: #333; // Dark background color for the navbar
  padding: 10px; // Padding inside the navbar
  margin-bottom: 20px; // Space below the navbar
`;

// Styled component for individual navigation links
const NavItem = styled(Link)`
  margin: 0 15px; // Space between each navigation item
  color: white; // White text color for the links
  text-decoration: none; // Remove the underline from the links
  font-weight: bold; // Make the text bold

  &:hover {
    color: #ffcc00; // Change the color to yellow when hovering over a link
  }
`;
