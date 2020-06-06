import React, {useState} from 'react';

import BorelImg from '../../assets/images/homeCover.png';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

//Styles
import Slide from '@material-ui/core/Slide';
import classes from './Home.module.css';

const Home = () => {
    const [slide, ] = useState(true);

    return (
        <Slide in={slide} mountOnEnter unmountOnExit direction="up" timeout={500}>
            <Container classes={{root: classes.Container}}>
                <img src={BorelImg} alt="logo" className={classes.HeaderImg}/>
                <TextField 
                  label="Find the notes you need" 
                  fullWidth
                  type="search"
                  inputProps={{
                    style: {fontFamily: 'Nunito'}
                  }}
                  InputLabelProps={{
                    style: {fontFamily: 'Nunito'}
                  }}
                  variant="outlined" />
            </Container>
        </Slide>
    );
}
    
export default Home;