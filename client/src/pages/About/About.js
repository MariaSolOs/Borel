import React, {useState} from 'react';

//Styles
import {Slide} from '@material-ui/core';

const About = (props) => {
    const [slide, ] = useState(true);

    return(
        <Slide in={slide} mountOnEnter unmountOnExit direction="right" timeout={500}>
            <h1 style={{textAlign: 'center'}}>About ;)</h1>
        </Slide>
    );
}

export default About;