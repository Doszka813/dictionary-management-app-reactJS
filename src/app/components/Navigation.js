import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { Nav, NavItem, Navbar, NavbarBrand, NavLink } from 'reactstrap';

const Navigation = () => {
    return (
      <div>
        <Navbar color="dark" dark expand="xl">
          <NavbarBrand href="/">Dictionary Management App</NavbarBrand>
          <Nav>
            <NavItem>
              <NavLink className="nav-link-gdc"
                tag={RRNavLink}
                to="/"
                active>About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-gdc"
                tag={RRNavLink}
                to="/dictionaries">Dictionaries</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="nav-link-gdc"
                tag={RRNavLink}
                to="/addDictionary">Add Dictionary <FaPlus /></NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
  );
}

export default Navigation;
