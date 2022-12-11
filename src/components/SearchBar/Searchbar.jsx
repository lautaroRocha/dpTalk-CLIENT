import React from 'react';
import './searchbar.css'

const Searchbar = (props) => {


    return (
        <input className='searchbar' placeholder='Buscá por título...' onChange={(e) =>{props.filterQuestions(e)}}/>
    );
}

export default Searchbar;