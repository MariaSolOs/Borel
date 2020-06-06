import React from 'react';

import Navbar from './Navbar/Navbar';

const Layout = (props) => {
    return (
        <React.Fragment>
            <nav>
                <Navbar />
            </nav>
            <main>
                {props.children}
            </main>
        </React.Fragment>
    );
}

export default Layout;