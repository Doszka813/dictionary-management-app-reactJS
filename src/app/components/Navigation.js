import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { NavLink as RRNavLink } from 'react-router-dom';

import About from './About';
import DictionariesList from './DictionariesList';
import DictionaryCreator from './DictionaryCreator';
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
