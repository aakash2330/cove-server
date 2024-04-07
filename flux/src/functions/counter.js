import { useState } from 'react';

//Pass in the value to set the state
//Curly braces means each value passed in will be its own instance (destructuring)
const MyCounter = ({ value }) => {
    const [counter, setCounter] = useState(value);
    
    const addCounter = () => {
        setCounter(prevCounter => prevCounter + 1);
    }
    
    const subCounter = () => {
        if (counter > 0) {
            setCounter(prevCounter => prevCounter - 1);
        }
    }

    return { counter, setCounter, addCounter, subCounter };
}

export default MyCounter;