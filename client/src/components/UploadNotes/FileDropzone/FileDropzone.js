import React from 'react';
import Dropzone from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';
import classes from './FileDropzone.module.css';

const FileDropzone = () => {
    //Called every time a file's `status` changes
    const handleChangeStatus = ({meta, file}, status) => { 
        console.log('[handleChangeStatus]', status, meta, file); 
    }
    
    //Receives array of files that are done uploading when submit button is clicked
    const handleSubmit = (files, allFiles) => {
        let numFiles = files.length;
        let f;
        while(numFiles > 0) {
            let data = new FormData();
            f = files.pop();
            data.append('file', f.file);
            fetch('http://localhost:5000/notes', {
                method: 'POST',
                body: data,
            }).then(res => console.log('All good'))
            .catch(err => (console.log(err)));
            --numFiles;
        }
        //Delete all files
        allFiles.forEach(f => f.remove());
    }
    
    return (
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
            previewContainer: classes.DropzoneDisabled,
            previewImage: classes.PreviewImage,
            inputLabelWithFiles: classes.InputLabelWithFiles,
            submitButton: classes.SubmitButton,
            submitButtonContainer: classes.SubmitButtonContainer,
          }}
        />
    )
}
  
export default FileDropzone;