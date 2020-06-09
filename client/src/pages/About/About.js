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
            <p className={classes.Bio}>Hi! I am <a href="https://mariasolos.github.io/MariaSolano/">
            Maria</a> and I am just a nerdy girl.<br />My goal with <span>Borel</span> is
            to create a simple marketplace for university notetakers.<br />
            <a href="mailto:majosolano99@gmail.com">Contact me</a> if you encounter
            any issues with Borel (or just want to talk about cats, math, or
            coding 😉)!</p>
        </Container>
    </Slide>
);

export default About;