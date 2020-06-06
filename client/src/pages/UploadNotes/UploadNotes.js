import React, {useState} from 'react';

import DropzoneProvider from '../../context/dropzone-context';
import Container from '@material-ui/core/Container';
import UploadForm from './UploadForm/UploadForm';

//Styles
import {Slide} from '@material-ui/core';
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined';
import classes from './UploadNotes.module.css';

const UploadNotes = () => {
    const [slide, ] = useState(true);
    
    return(
        <Slide in={slide} mountOnEnter unmountOnExit direction="left" timeout={500}>
            <Container classes={{root: classes.Container}}>
                <h1>Upload your notes 
                <BorderColorOutlinedIcon style={{marginLeft: '1.5rem'}} />
                </h1>
                <DropzoneProvider>
                    <UploadForm />
                </DropzoneProvider>
            </Container>
        </Slide>
    );
} 

export default UploadNotes;
