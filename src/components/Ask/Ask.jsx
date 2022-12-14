import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import "./ask.css"

const Ask = () => {

    const [question, setQuestion] = useState({title : "", body : ""})


    return (
        <div className='ask'>
            <div className='ask-text'>
                <textarea type="text" placeholder='Título...' onChange={(e)=>{setQuestion({title: e.target.value, body : question.body})}}/>
                <textarea type="text" placeholder='Tu pregunta...' onChange={(e)=>{setQuestion({title: question.title, body : e.target.value})}}/>
            </div>
            <div className="ask-action">
                <button data-cancel>
                    <Link to="/">CANCELAR</Link>
                </button>
                <button>PREGUNTAR</button>
            </div>
        </div>
    );
}

export default Ask;
