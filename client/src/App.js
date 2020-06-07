import React from 'react';
import {Route, Switch} from 'react-router-dom';
import SearchProvider from './context/search-context';

import Layout from './components/Layout';
import UploadNotes from './pages/UploadNotes/UploadNotes';
import Gallery from './components/Gallery/Gallery';
import About from './pages/About/About';
import Home from './pages/Home/Home';

//Default app style:
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
const theme = createMuiTheme({
    typography: {
      fontFamily: ['Nunito', '-apple-system', 'BlinkMacSystemFont', 
                  'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 
                  'Fira Sans', 'Droid Sans', 'Helvetica Neue', 
                  'sans-serif'].join(',')}
    });

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <SearchProvider>
                <Layout>
                    <Switch>
                        <Route path='/upload' component={UploadNotes} />
                        <Route path='/about' component={About} />
                        <Route path='/gallery' component={Gallery} />
                        <Route path='/' component={Home} />
                    </Switch>
                </Layout>
            </SearchProvider>
        </ThemeProvider>
    );
}

export default App;
