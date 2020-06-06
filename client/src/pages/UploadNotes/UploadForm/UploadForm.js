import React, {useState, useContext} from 'react';
import axios from 'axios';

import {DropzoneContext} from '../../../context/dropzone-context';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import FileDropzone from '../FileDropzone/FileDropzone';
import useInput from '../../../hooks/useInput';

//Styles
import classes from './UploadForm.module.css';

const UploadForm = () => {
    const submittedImgs = useContext(DropzoneContext).submittedImgs;

    const {value: email, bind: bindEmail, reset: resetEmail} = useInput('');
    const [emailError, setEmailError] = useState(false);
    const [emailHelpText, setEmailHelpText] = useState('We recommend using your McGill email');
    const {value: course, bind: bindCourse, reset: resetCourse} = useInput('');
    const [courseError, setCourseError] = useState(false);
    const [courseHelpText, setCourseHelpText] = useState('Eg: COMP202');
    const fields = [{name: 'email', label: 'Email address', 
                    value: email, bind: bindEmail, 
                    helpText: emailHelpText, error: emailError},
                    {name: 'course', label: 'Course code', 
                    value: course, bind: bindCourse, 
                    helpText: courseHelpText, error: courseError}];
    const form = fields.map((field) => (
        <TextField
            classes={{root: classes.TextField}}
            key={field.name}
            name={field.name}
            value={field.value}
            {...field.bind}
            error={field.error}
            label={field.label}
            variant="outlined"
            helperText={field.helpText} />
    ));

    const handleSubmitForm = (event) => {
        event.preventDefault();
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)) {
            const emailField = form.find(field => field.key === 'email');
            console.log(emailField);
            setEmailError(true);
            setEmailHelpText('Invalid email');
        }
        submittedImgs.forEach(img => console.log(img));
        resetEmail();
        resetCourse();
    }

    const handleUploadToCloudinary = (files) => {
        console.log(files);
        const uploadURLs = [];
        const uploads = files.map(file => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET); 
            formData.append('api_key', process.env.REACT_APP_CLOUDINARY_KEY); 
            formData.append('timestamp', (Date.now() / 1000) | 0);
            return axios.post(
                process.env.REACT_APP_CLOUDINARY_URL,
                formData)
            .then(res => {
                console.log(res);
                uploadURLs.push(res.data.secure_url);
            });
        });
      
        axios.all(uploads).then(() => {
            uploadURLs.forEach(url => {
                axios.post(process.env.REACT_APP_SERVER_BASEURL + '/notes/images',
                {url})
            });
        });
    }

    return(
        <form id="uploadForm" className={classes.FormContainer}>
            {form}
            <FileDropzone />
            <Button 
              variant="contained" 
              color="default" 
              endIcon={<PublishRoundedIcon />}
              classes={{root: classes.SubmitButton}}
              onClick={(event) => handleSubmitForm(event)}>
                Upload my notes
            </Button>
        </form>
    );
}

export default UploadForm;