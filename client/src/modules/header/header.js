import './header.css';
import React, { useState } from 'react';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';

import {
  Brand,
  Home,
  LoginMenu,
  LogoutMenu,
  RegisterMenu,
} from './header-components';
import { EntitiesMenu } from './entity-menu';

export const Header = ({ isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="app-header">
      <Navbar dark expand="md" fixed="top" className="app-navbar">
        <Brand />
        <NavbarToggler aria-label="menu" onClick={toggleMenu} />
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            <Home />
            {isAuthenticated && <EntitiesMenu />}
            {isAuthenticated && <LogoutMenu />}
            {!isAuthenticated && <LoginMenu />}
            {!isAuthenticated && <RegisterMenu />}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};
