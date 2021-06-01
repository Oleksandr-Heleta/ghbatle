import React, {useState} from "react";

function PlayerInput(props) {
    
    const [username, setUsername] = useState('');

    const handleInputValue = (event) => {
        setUsername(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSubmit(props.id, username);
    }

    
    return (
        <form className='column' onSubmit={handleSubmit}>
            <label htmlFor="username">{props.label}</label>
            <input
                type="text"
                id='username'
                placeholder='Github Username'
                autoComplete='off'
                onChange={handleInputValue}
                value={username}
            />
            <button
                className='button'
                type='submit'
                disabled={!username}
            >
                Submit
            </button>
        </form>
    );
    
}

export default PlayerInput;
