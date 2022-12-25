import React, { forwardRef, useRef, useContext } from 'react';
import UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import { toast } from 'react-toastify';
import useFetch from "../../utilities/useFetch"
import "./answerbox.css"

const AnswerBox = forwardRef((props, ref) => {

    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const answerBody = useRef()

    function hideAnswerBox(){
        ref.current.style.display = "none"
    }

    const answerUrl = "http://localhost:7000/reply"

    async function useAnswerQuestion(){
        const answer = {
            author : user.username,
            question : props.question,
            body : answerBody.current.value
        }
        const postedAnswer = await useFetch(answerUrl, 'POST', answer, token)
        if(postedAnswer.message){
            toast.error(postedAnswer.message)
        }else{
            hideAnswerBox()
            toast.info('Gracias por responder!')
            props.setNewAnswer(true)
        }  
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
