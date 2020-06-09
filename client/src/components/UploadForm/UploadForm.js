import React, {useContext, useState} from 'react';
import axios from 'axios';
import {DropzoneContext} from '../../context/dropzone-context';
import useInput from '../../hooks/useInput';

//Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import FileDropzone from '../FileDropzone/FileDropzone';
import Spinner from '../Spinner/Spinner';

//Styles
import classes from './UploadForm.module.css';

const UploadForm = () => {
    const imgsInDropzone = useContext(DropzoneContext).submittedImgs;
    const [submitStatus, setSubmitStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    //Use hook to set double binding and form controls
    const {value: inst, bind: bindInst, reset: resetInst, 
           error: instError, setError: setInstError, 
           helpText: instHelpText, setHelpText: setInstHelpText} 
           = useInput('', 'Eg: McGill University');
    const {value: course, bind: bindCourse, reset: resetCourse,
           error: courseError, setError: setCourseError,
           helpText: courseHelpText, setHelpText: setCourseHelpText} 
           = useInput('', 'Eg: COMP202');
    const {value: email, bind: bindEmail, reset: resetEmail,
           error: emailError, setError: setEmailError,
           helpText: emailHelpText, setHelpText: setEmailHelpText} 
           = useInput('', 'We recommend using your McGill email');
    
    const fields = [{name: 'institution', label: 'Institution',
                    value: inst, bind: bindInst,
                    helpText: instHelpText, error: instError},
                    {name: 'course', label: 'Course code', 
                    value: course, bind: bindCourse, 
                    helpText: courseHelpText, error: courseError},
                    {name: 'email', label: 'Email address', 
                    value: email, bind: bindEmail, 
                    helpText: emailHelpText, error: emailError}];
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
        //Helper inner functions
        const validateForm = () => {
            let validInput = true;
            if(inst.length === 0) {
                setInstError(true);
                setInstHelpText("Don't leave this blank!");
                validInput = false;
            }
            //Check that course satifies ABCD123
            const courseRegex = /^([a-zA-Z]{4})([0-9]{3})$/;
            const parsedCourse = course.toUpperCase().replace(/\s/g, '');
            if(!courseRegex.test(parsedCourse)) {
                setCourseError(true);
                setCourseHelpText('Invalid course');
                validInput = false;
            }
            //Check that email satisfies user@domain.com
            const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!emailRegex.test(email)) {
                setEmailError(true);
                setEmailHelpText('Invalid email');
                validInput = false;
            }
            return validInput;
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
                    uploadURLs.push(res.data.secure_url.replace('/upload', '/upload/f_auto,q_auto'));
                });
            });
            return axios.all(uploads).then(() => { return uploadURLs });
        }
    
        const handleUploadToServer = async (URLs, course) => {
            return axios.post('/notes', {
                    inst, course, URLs, email
                }
            );
        }

        event.preventDefault();
        if(!validateForm()) { return; }
        setLoading(true);

        //TODO: Add popup when no images
        //TODO: Remind user to submit Dropzone
        // if(submittedImgs.length === 0) {
        // }

        const parsedCourse = course.toUpperCase().replace(/\s/g, '');
        //Upload images to Cloudinary
        handleUploadToCloudinary()
        //Upload note to server
        .then(URLs => handleUploadToServer(URLs, parsedCourse))
        .then(res => {
            if(res.status === 200) {
                setSubmitStatus('Your notes are ready! 😊');
            }
        })
        .catch(err => setSubmitStatus('Something bad happened... 😳'));

        resetInst();
        resetCourse();
        resetEmail();
    }

    //TODO: Add link to post after submission
    return(
        <form id="uploadForm" className={classes.FormContainer}>
            {submitStatus? <h2>{submitStatus}</h2> : 
            loading? <Spinner /> :
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