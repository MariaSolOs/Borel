import React from 'react';

import Navbar from './Navbar/Navbar';

class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <nav>
                    <Navbar />
                </nav>
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }
}

export default Layout;