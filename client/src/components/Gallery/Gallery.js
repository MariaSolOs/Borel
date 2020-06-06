import React, {useState} from 'react';

import {Slide} from '@material-ui/core';

const Gallery = () => {
    const [slide, ] = useState(true);

    return(
        <Slide in={slide} mountOnEnter unmountOnExit direction="up" timeout={500}>
            <h1>Gallery! :)</h1>
        </Slide>
    )
}

export default Gallery;