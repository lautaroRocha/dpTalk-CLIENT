import React from 'react';
import { Link } from 'react-router-dom';
import "./askbutton.css"

const AskButton = () => {
    return (
        <>
        <button className='ask-btn'>
            <Link  to="/ask">
            preguntá
            </Link>
        </button>
        </>
    );
}

export default AskButton;
