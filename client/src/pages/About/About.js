import React from 'react';

//Components
import Container from '@material-ui/core/Container';

//Styles
import Slide from '@material-ui/core/Slide';
import classes from './About.module.css';

//TODO: Write a better bio. Include link to portfolio
const About = (props) => (
    <Slide in={true} mountOnEnter unmountOnExit direction="right" timeout={500}>
        <Container classes={{root: classes.Container}}>
            <p className={classes.Bio}>Hi! I am <span>Maria</span> and 
            I am just a nerdy girl. I hope you appreciate <span>Borel</span>.</p>
        </Container>
    </Slide>
);

export default About;