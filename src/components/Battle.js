import React, {useState} from 'react';
import {Link} from "react-router-dom";
import PlayerInput from "./PlayerInput";
import PlayerPreview from "./PlayerPreview";

function Battle (props) {
    
    const [state, setState] = useState({
        playerOneName: '',
        playerTwoName: '',
        playerOneImage: null,
        playerTwoImage: null
    })
        

    const handleSubmit = (id, username) => {
        const newState = Object.assign({}, state);
        newState[id + 'Name'] = username;
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
        setState( newState);
    }

    const handleReset = (id) => {
        setState(...state, {[id + 'Name']: '', [id + 'Image']: null});
    }

    const {playerOneName, playerTwoName, playerOneImage, playerTwoImage} = state;
        
    return (
        <div>
            <div className='row'>
                {!playerOneName ?
                    <PlayerInput
                        id='playerOne'
                        label='Player 1'
                        onSubmit={handleSubmit}
                    /> :
                    <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}
                    >
                        <button
                            className='button'
                            onClick={() => handleReset('playerOne')}
                        >
                            Reset
                        </button>
                    </PlayerPreview>
                }

                {!playerTwoName ?
                    <PlayerInput
                        id='playerTwo'
                        label='Player 2'
                        onSubmit={handleSubmit}
                    /> :
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}
                    >
                        <button
                            className='button'
                            onClick={() => handleReset('playerTwo')}
                        >
                            Reset
                        </button>
                    </PlayerPreview>
                }
            </div>
            {playerOneImage && playerTwoImage &&
            <Link
                className='button'
                to={{
                    pathname: props.match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName,
                }}
            >Battle</Link>
            }
        </div>
    );
    
}

export default Battle;
