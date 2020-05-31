import React from 'react';
import axios from 'axios';

import logo from './logo.svg';

import './App.css';

class App extends React.Component {
    state = {
        data: null
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/')
            .then(res => {
                this.setState({
                    data: res.data.msg
                })
            }).catch(err => {
                console.log('Error from Express:', err);
            }
        );
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <p>{this.state.data}</p>
                </header>
            </div>
          );
    }
    
}

export default App;
