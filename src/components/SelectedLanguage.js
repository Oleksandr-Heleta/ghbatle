import React, {memo} from 'react';

const SelectedLanguage = memo((props) => {
    const languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map((language, index) =>
                <li key={index}
                    onClick={props.setActiveLanguage}
                    style={language === props.selectedLanguage ? {color: '#d0021b'} : null}>
                    {language}
                </li>
            )}
        </ul>
    );
})

export default SelectedLanguage;
