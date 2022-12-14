import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../useFetch';
import "./ask.css"

const Ask = (props) => {

    const [question, setQuestion] = useState({title : "", body : ""})

    const askUrl = "http://localhost:7000/ask"

    function createQuestion(){
        const newQuestion = {
            author : props.user.username,
            title : question.title,
            body : question.body
        }
        return newQuestion
    }

    async function usePostToDatabase(){
        const newQuestion = createQuestion()
        const asking = await useFetch(askUrl, 'POST', newQuestion, props.token)
    }



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
                <button onClick={usePostToDatabase}>PREGUNTAR</button>
            </div>
        </div>
    );
}

export default Ask;
