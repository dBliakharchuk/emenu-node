import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './header-components';

export const EntitiesMenu = () => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/restaurants">
      Restaurants
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/users">
      Users
    </DropdownItem>
  </NavDropdown>
);
