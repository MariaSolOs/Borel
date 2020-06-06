import React, {useState, useContext} from 'react';
import Dropzone from 'react-dropzone-uploader';

import {DropzoneContext} from '../../../context/dropzone-context';

//Styles
import 'react-dropzone-uploader/dist/styles.css';
import classes from './FileDropzone.module.css';

const FileDropzone = () => {
    const submitImgs = useContext(DropzoneContext).submitImgs;
    const [status, setStatus] = useState(null);
    
    //Called every time a file's 'status' changes
    const handleChangeStatus = ({meta, file}, status) => { 
        setStatus('Upload status: ' + status);
    }

    const handleSubmit = (files, allFiles) => { 
        const info = files.map(f => f.file);
        submitImgs(info);
        //Delete all files from Dropzone
        allFiles.forEach(f => f.remove());
        setStatus('Submitted');
    }

    return (
        <div className={classes.Wrapper}>
            {status && (status !== 'Submitted')? 
                <p className={classes.StatusText}>{status}</p> : 
                null}
            {status === 'Submitted'?
                <h3>Images are ready to go!</h3> : 
                <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                accept="image/*"
                maxFiles={3}
                inputContent={(files, extra) => 
                    (extra.reject ? 'Images only!' : 
                                    'Click me to add your notes ;)')}
                inputWithFilesContent={files => `You can add ${3 - files.length} more pic(s)`}
                addClassNames={{
                    dropzone: classes.Dropzone,
                    inputLabel: classes.InputLabel,
                    preview: classes.PreviewContainer,
                    previewImage: classes.PreviewImage,
                    inputLabelWithFiles: classes.InputLabelWithFiles,
                    submitButton: classes.SubmitButton,
                    submitButtonContainer: classes.SubmitButtonContainer,
                }}/>}
        </div>
    )
}
  
export default FileDropzone;