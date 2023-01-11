import React, {useState, useContext} from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import UserContext from "../../Context/UserContext"
import TokenContext from "../../Context/TokenContext"
import { toast } from 'react-toastify';
import useFetch from '../../utilities/useFetch';
import "./ask.css"
import * as URL from "../../utilities/ApiUrls"

export const Ask = (props) => {

    const [question, setQuestion] = useState({title : "", body : ""})

    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const navigate = useNavigate()

    function createQuestion(){
        if(question.title !== "" && question.body !== ""){
        const newQuestion = {
            author : user.username,
            title : question.title,
            body : question.body
        }
        return newQuestion
        }else{
            toast.error('Tu pregunta debe tener título y cuerpo')

        }
    }

    async function usePostToDatabase(){
        const newQuestion = createQuestion()
        const asking = await useFetch(URL.questions, 'POST', newQuestion, token)
        if(asking.message){
            let errors = Array.from(asking.message.split(', '))
            errors.forEach((err) => toast.error(err))
        }else{
            toast.info('Pregunta hecha!')
            navigate('/')
            props.socket.emit('new-post', {author : user.username})
        }
        await props.setNewQuestion(true)
    }

    if(!user){
        return <Navigate to="/login"/>;
        }else{
    return (
        <div className='ask'>
            <div className='ask-text'>
                <textarea type="text" placeholder='Título...' onChange={(e)=>{setQuestion({title: e.target.value, body : question.body})}}/>
                <textarea type="text" placeholder='Tu pregunta...'  onChange={(e)=>{setQuestion({title: question.title, body : e.target.value})}}/>
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
}

