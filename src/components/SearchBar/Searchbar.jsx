import React, {forwardRef} from 'react';
import './searchbar.css'

const Searchbar = forwardRef((props, ref) => {
    return (
        <input ref={ref} className='searchbar' placeholder='Buscá por título...' onChange={(e) =>{props.filterQuestions(e)}}/>
    );
})

export default Searchbar;
