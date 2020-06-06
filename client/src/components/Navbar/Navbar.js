import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './Navbar.module.css';

const NavItem = (props) => (
    <li>
        <NavLink 
          exact to={props.link} 
          className={classes.NavItem}
          activeClassName={classes.active}>
            {props.children}
        </NavLink>
    </li>
);

const Navbar = () => (
    <ul className={classes.Navbar}>
        <NavItem link='/'>
            Home
        </NavItem>
        <NavItem link='/upload'>
            Upload your notes
        </NavItem>
        <NavItem link='/about'>
            About
        </NavItem>
    </ul>
);

export default Navbar;