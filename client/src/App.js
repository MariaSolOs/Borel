import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './components/Layout';
import UploadNotes from './pages/UploadNotes/UploadNotes';
import About from './pages/About/About';
import Gallery from './components/Gallery/Gallery.js'
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
    const routes = [{path: '/upload', Component: UploadNotes},
                    {path: '/about', Component: About},
                    {path: '/gallery', Component: Gallery},
                    {path: '/', Component: Home}];
    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Switch>
                    {routes.map(({path, Component}) => (
                        <Route key={path} path={path} render={() => {
                            return <Component show/>}
                        }/>
                    ))}
                </Switch>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
