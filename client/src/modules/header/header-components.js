import React from 'react';

import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  UncontrolledDropdown,
  NavItem,
  NavLink,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

export const Brand = (props) => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span>Brand</span>
  </NavbarBrand>
);

export const Home = (props) => (
  <NavItem>
    <NavLink tag={Link} to="/">
      <span>Home</span>
    </NavLink>
  </NavItem>
);

export const LoginMenu = () => (
  <NavItem>
    <NavLink tag={Link} to="/login">
      <span>Sign in</span>
    </NavLink>
  </NavItem>
);
export const RegisterMenu = () => (
  <NavItem>
    <NavLink tag={Link} to="/register">
      <span>Register</span>
    </NavLink>
  </NavItem>
);
export const LogoutMenu = () => (
  <NavItem>
    <NavLink tag={Link} to="/logout">
      <span>Logout</span>
    </NavLink>
  </NavItem>
);

export const NavDropdown = (props) => (
  <UncontrolledDropdown nav inNavbar id={props.id}>
    <DropdownToggle nav caret className="d-flex align-items-center">
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu right style={props.style}>
      {props.children}
    </DropdownMenu>
  </UncontrolledDropdown>
);
