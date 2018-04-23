import PropTypes from 'prop-types'
import React, {Component} from 'react'


const SelectedLanguages = ({select, UpdateLanguage}) => {
    var languages = ['All','Javascript','Ruby','Java','CSS','Python'];
    return(
        <ul className='languages'>
             {languages.map((lang) => 
                <li
                style={lang === select ? {color: '#d0021b'} : null}  
                onClick={UpdateLanguage.bind(null, lang)} 
                key={lang}>
                    {lang}
                </li>
            )}
        </ul>
    )
}

SelectedLanguages.propTypes = {
    select: PropTypes.string.isRequired,
    UpdateLanguage: PropTypes.func.isRequired
}

export default SelectedLanguages