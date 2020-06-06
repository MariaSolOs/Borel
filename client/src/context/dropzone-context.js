import React, {useState} from 'react';

export const DropzoneContext = React.createContext({
    submittedImgs: [],
    submitImgs: (files) => []
});

export default (props) => {
    const [submittedImgs, setSubmittedImgs] = useState([]);

    const submitImgs = (files) => {
        setSubmittedImgs(files);
    }

    return( <DropzoneContext.Provider value={{submittedImgs, submitImgs}}>
                {props.children}
            </DropzoneContext.Provider> )
}