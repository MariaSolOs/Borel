import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout';
import UploadNotes from './components/UploadNotes/UploadNotes';
import About from './components/About/About';
import Gallery from './components/Gallery/Gallery.js'
import Home from './components/Home/Home';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Layout>
                    <Switch>
                        <Route path="/upload" component={UploadNotes} />
                        <Route path="/about" component={About} />
                        <Route path="/gallery" component={Gallery} />
                        <Route path="/" component={Home} />
                    </Switch>
                </Layout>
            </React.Fragment>
        );
    }
    
}

export default App;
