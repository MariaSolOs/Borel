import React from 'react';
import Dropzone from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';
import classes from './FileDropzone.module.css';

const FileDropzone = () => {
    //Specify upload params and url for your files
    const getUploadParams = ({meta}) => { 
        return {
            url: 'https://httpbin.org/post' 
        }
    }
    
    //Called every time a file's `status` changes
    const handleChangeStatus = ({meta, file}, status) => { 
        console.log('[handleChangeStatus]', status, meta, file) 
    }
    
    //Receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }
    
    return (
        <Dropzone
          addClassNames={{
            dropzone: classes.Dropzone,
            inputLabel: classes.InputLabel,
            previewContainer: classes.DropzoneDisabled,
            previewImage: classes.PreviewImage,
            inputLabelWithFiles: classes.InputLabelWithFiles,
            submitButton: classes.SubmitButton
          }}
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          accept="image/*"
          maxFiles={3}
          inputContent={(files, extra) => 
            (extra.reject ? 'Images only!' : 
                            'Click me to add your notes ;)')}
          inputWithFilesContent={files => `You can add ${3 - files.length} more pic(s)`}
        />
    )
}
  
export default FileDropzone;