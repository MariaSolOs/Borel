import React, {useState} from 'react';

export const SearchContext = React.createContext({
    notes: [],
    addNotesToGallery: (files) => []
});

export default (props) => {
    const [notes, setNotes] = useState([]);

    const addNotesToGallery = (files) => {
        setNotes(files);
    }

    return( <SearchContext.Provider value={{notes, addNotesToGallery}}>
                {props.children}
            </SearchContext.Provider> )
}