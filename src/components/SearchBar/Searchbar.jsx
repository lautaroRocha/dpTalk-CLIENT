import React, {forwardRef} from 'react';
import './searchbar.css'

export const Searchbar = forwardRef((props, ref) => {
    return (
        <input ref={ref} className='searchbar' placeholder='Buscá por título...' onChange={(e) =>{props.filterQuestions(e)}}/>
    );
})

