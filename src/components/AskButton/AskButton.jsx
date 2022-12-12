import React from 'react';
import { Link } from 'react-router-dom';
import "./askbutton.css"

const AskButton = () => {
    return (
        <>
        <Link className='ask-btn' to="/ask">
            <button >
            preguntá
            </button>
        </Link>
        </>
    );
}

export default AskButton;
