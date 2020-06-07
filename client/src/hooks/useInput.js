import {useState} from 'react';

const useInput = (initialValue, initialHelpText) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState(false);
    const [helpText, setHelpText] = useState(initialHelpText);
    return {
        value,
        setValue,
        error,
        setError,
        helpText,
        setHelpText,
        reset: () => {
            setValue('');
            setError(false);
        },
        bind: {
            value,
            onChange: event => {
                setError(false);
                setHelpText(initialHelpText);
                setValue(event.target.value);
            }
        }
    }
}

export default useInput;