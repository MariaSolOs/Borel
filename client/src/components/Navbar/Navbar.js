import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './Navbar.module.css';

const NavItem = (props) => (
    <li>
        <NavLink 
          exact to={props.link} 
          className={styles.NavItem}
          activeClassName={styles.active}>
            {props.children}
        </NavLink>
    </li>
)

const Navbar = () => (
    <ul className={styles.Navbar}>
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
)

export default Navbar;