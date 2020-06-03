import React from 'react';
// import axios from '../../config/axios';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import FileDropzone from './FileDropzone/FileDropzone';

const styles = {
    Container: {
        width: '80%',
        margin: '0 auto'
    },
    InputText: {
        fontFamily: 'Nunito'
    }
}

class UploadNotes extends React.Component {
    state = {
        image: null
    }

    render() {
        return (
            <Container style={styles.Container}>
                <h1>Upload your notes :)</h1>
                <TextField
                  inputProps={{
                    style: {...styles.InputText}
                  }}
                  InputLabelProps={{
                    style: {...styles.InputText}
                  }}
                  FormHelperTextProps={{
                    style: {...styles.InputText}
                  }}
                  label="Email address"
                  variant="outlined"
                  helperText="We recommend using your McGill email"
                />
                <FileDropzone />
                {/* <img src="http://localhost:5000/notes/nav_logo.png" /> */}
            </Container>
        )
    }
}

export default UploadNotes;
