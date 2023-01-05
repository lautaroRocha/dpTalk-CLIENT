import React from 'react';
import { Link } from 'react-router-dom';
import "./askbutton.css"

export const AskButton = () => {
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

