import React from 'react';

import BorelImg from '../../assets/images/cover.png';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

const styles = {
    Container: {
        width: '80%',
        margin: '10% auto',
        textAlign: 'center',
    },
    Header: {
        width: '60%',
        minWidth: '220px'
    },
    InputText: {
        fontFamily: 'Nunito'
    }
}

class Home extends React.Component {
    render() {
        return (
            <Container style={styles.Container}>
                <img src={BorelImg} alt="logo" style={styles.Header}/>
                <TextField 
                  label="Find the notes you need" 
                  fullWidth
                  type="search"
                  inputProps={{
                    style: {...styles.InputText}
                  }}
                  InputLabelProps={{
                    style: {...styles.InputText} 
                  }}
                  variant="outlined" />
            </Container>
        );
    }
}

export default Home;