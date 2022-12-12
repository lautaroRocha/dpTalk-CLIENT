import React from 'react';
import {Link} from 'react-router-dom'
import "./minquestion.css"

const MinQuestions = (props) => {
    return (
        <Link className='min-question'  to={`question/${props.question._id}`}>
            <div className='min-question-author'>
                <div className='min-question-author-img' />
                <span className='min-queston-author-name'>{props.question.author}</span>
            </div>
            <div className='min-question-text'>
                <span>{props.question.status === false ? "PENDIENTE" : "CONTESTADA"}</span>
                <h2>{props.question.title}</h2>
                <p>{props.question.body.slice(0, 70)}</p>
            </div>
        </Link>
    );
}

export default MinQuestions;
