import React, {useContext, useState} from 'react';
import axios from 'axios';

import {DropzoneContext} from '../../context/dropzone-context';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import FileDropzone from '../FileDropzone/FileDropzone';
import useInput from '../../hooks/useInput';

//Styles
import classes from './UploadForm.module.css';

const UploadForm = () => {
    const imgsInDropzone = useContext(DropzoneContext).submittedImgs;
    const [submitStatus, setSubmitStatus] = useState(null);

    //Use hook to set double binding
    const {value: email, bind: bindEmail, reset: resetEmail,
           error: emailError, setError: setEmailError,
           helpText: emailHelpText, setHelpText: setEmailHelpText} 
           = useInput('', 'We recommend using your McGill email');
    const {value: course, bind: bindCourse, reset: resetCourse,
           error: courseError, setError: setCourseError,
           helpText: courseHelpText, setHelpText: setCourseHelpText} 
           = useInput('', 'Eg: COMP202');
    
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

        let invalidInput = false;
        //Check that email satisfies user@domain.com
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!emailRegex.test(email)) {
            setEmailError(true);
            setEmailHelpText('Invalid email');
            invalidInput = true;
        }
        //Check that course satifies ABCD123
        const courseRegex = /^([a-zA-Z]{4})([0-9]{3})$/;
        if(!courseRegex.test(course)) {
            setCourseError(true);
            setCourseHelpText('Invalid course');
            invalidInput = true;
        }
        if(invalidInput) { return; }

        //TODO: Add popup when no images
        //TODO: Remind user to submit Dropzone
        // if(submittedImgs.length === 0) {
        // }

        //Upload images to Cloudinary
        handleUploadToCloudinary()
        //Upload note to server
        .then(URLs => handleUploadToServer(URLs))
        .then(res => {
            if(res.status === 200) {
                setSubmitStatus('Your notes are ready! 😊');
            }
        })
        .catch(err => setSubmitStatus('Something bad happened... 😳'));
        
        resetEmail();
        resetCourse();
    }

    const handleUploadToCloudinary = async () => {
        const files = imgsInDropzone;
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
                uploadURLs.push(res.data.secure_url);
            });
        });
        
        return axios.all(uploads).then(() => { return uploadURLs });
    }

    const handleUploadToServer = async (URLs) => {
        const courseCode = course.substring(0, 4).toUpperCase();
        const courseNumber = course.substring(4);
        return axios.post(
            `${process.env.REACT_APP_SERVER_BASEURL}/notes`, {
                email, courseCode, courseNumber, URLs
            }
        );
    }

    //TODO: Add link to gallery after submission
    return(
        <form id="uploadForm" className={classes.FormContainer}>
            {submitStatus? <h2>{submitStatus}</h2> : 
                <React.Fragment>
                    {form}
                    <FileDropzone />
                    <Button 
                      variant="contained" 
                      color="default" 
                      endIcon={<PublishRoundedIcon />}
                      classes={{root: classes.SubmitButton}}
                      onClick={handleSubmitForm}>
                        Upload my notes
                    </Button>
                </React.Fragment>}
        </form>
    );
}

export default UploadForm;