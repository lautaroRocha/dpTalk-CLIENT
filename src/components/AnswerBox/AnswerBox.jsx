import React, { forwardRef, useRef } from 'react';
import useFetch from "../../useFetch"
import "./answerbox.css"

const AnswerBox = forwardRef((props, ref) => {

    const answerBody = useRef()

    function hideAnswerBox(){
        ref.current.style.display = "none"
    }

    const answerUrl = "http://localhost:7000/reply"

    async function useAnswerQuestion(){
        const answer = {
            author : props.user.username,
            question : props.question,
            body : answerBody.current.value
        }
        await useFetch(answerUrl, 'POST', answer, props.token)
    }

    return (
        <div className='answer-box' ref={ref}>
            <textarea ref={answerBody}/>
            <div className="answer-box-action">
            <button data-cancel onClick={hideAnswerBox}>CANCELAR</button>
            <button onClick={useAnswerQuestion}>ENVIAR</button>
            </div>
        </div>
    );
})

export default AnswerBox;
