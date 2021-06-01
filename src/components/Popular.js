import React, {useState, useEffect, Fragment} from 'react';
import SelectedLanguage from "./SelectedLanguage";
import RepoGrid from "./RepoGrid";
import {fetchPopularRepos} from "../api/requests";

function Popular () {
    
    const [selectedLanguage, setSelectedLanguage] = useState('All') ;
    const [loading, setLoading] = useState(false) ; 
    const [error, setError] = useState(null) ;
    const [repos, setRepos] = useState(null) ;
   
    const fetchPopularReposHandler = (selectedLanguage) => {
        setLoading(true);
        fetchPopularRepos(selectedLanguage)
            .then(repos => {
                setRepos(repos)
                setLoading(false)})
            .catch(error => {
                setError(error)
                setLoading(false)});    
    }

    const setActiveLanguage = (event) => {
        if(loading) return;

        const languageText = event.target.innerText;

        if(languageText !== selectedLanguage) {
            setSelectedLanguage(languageText);
            setRepos(null);
            fetchPopularReposHandler(languageText);
        }
    }

    useEffect(() => {
        fetchPopularReposHandler(selectedLanguage);
    }, [])

    if(error) {
        return <p style={{textAlign: 'center'}}>{error.message}</p>;
    }

    return (        
            <Fragment>
                <SelectedLanguage
                    selectedLanguage={selectedLanguage}
                    setActiveLanguage={setActiveLanguage}
                />
                {loading ? <h3 style={{textAlign: 'center'}}>Loading ...</h3> : null}
                {repos ?  <RepoGrid repos={repos} /> : null}
            </Fragment>
    );
    
}

export default Popular;
