// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavItem to="/">Characters</NavItem>
      <NavItem to="/locations">Locations</NavItem>
      <NavItem to="/episodes">Episodes</NavItem>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 10px;
  margin-bottom: 20px;
`;

const NavItem = styled(Link)`
  margin: 0 15px;
  color: white;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #ffcc00;
  }
`;
