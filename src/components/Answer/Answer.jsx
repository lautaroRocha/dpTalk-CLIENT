import React from 'react';
import './answer.css'


const Answer = (props) => {
    return (
        <div className='answer'>
            <div className="answer-data">
                <span>{props.answer.author}</span>
                <span>{props.answer.repliedOn.slice(0, 10)}</span>
                <span>{props.answer.status ? "APROBADA" : " "}</span>
            </div>
            <div className="answer-body">
                <p>{props.answer.body}</p>
            </div>
        </div>
    );
}

export default Answer;
