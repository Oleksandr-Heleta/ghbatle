import React, {useState, useEffect, Fragment} from "react";
import {Link} from "react-router-dom";
import qs from 'query-string';
import {battle} from "../api/requests";
import Player from "./Player";

function Result (props) {
    const [loading, setLoading] = useState(true);
    const [winner, setWiner] = useState(null);
    const [loser, setLoser] = useState(null);
    const [error, setError] = useState(null);

    
    useEffect(() => {
        const players = qs.parse(props.location.search);
        battle([players.playerOneName, players.playerTwoName])
            .then(players => {
                if(!players) {
                    setLoading(false);
                    setError('Error! Check both users!');
                } else {
                    setWiner(players[0]);
                    setLoser(players[1]);
                    setLoading(false);   
                }
            })
        
    }, [])
        

    if(loading) {
        return <h3 style={{textAlign: 'center'}}>Loading ...</h3>;
    }

    if(error) {
        return (
            <div>
                <p>{error}</p>
                <Link to='/battle'>Reset</Link>
            </div>
        );
    }

    return (
        <Fragment>
        <div className='row'>
            <Player
            label='Winner'
                score={winner.score}
                profile={winner.profile}
            />
            <Player
                label='Loser'
                score={loser.score}
                profile={loser.profile}
            />
        </div>
        <Link to='/battle'  className='button'>Reset</Link>
        </Fragment>
    );
    
}

export default Result;
