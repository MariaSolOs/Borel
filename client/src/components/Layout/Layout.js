import React from 'react';

import Navbar from '../Navbar/Navbar';

import classes from './Layout.module.css';

const Layout = (props) => {
    return (
        <React.Fragment>
            <nav>
                <Navbar />
            </nav>
            <main className={classes.Main}>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;