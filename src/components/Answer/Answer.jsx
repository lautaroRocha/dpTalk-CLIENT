import React, {useContext} from 'react';
import TokenContext from "../../Context/TokenContext"
import UserContext from "../../Context/UserContext"
import './answer.css'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import * as URL from "../../utilities/ApiUrls"
import {sendNotification} from "../../utilities/sendNotification"


export const Answer = (props) => {

    const likesUrl = URL.like + props.answer._id
    const dislikesUrl = URL.dislike + props.answer._id
    const answerUrl= URL.answers + props.answer._id

    const token = useContext(TokenContext)
    const user = useContext(UserContext)

    function likeAnswer(){
        fetch(likesUrl, {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
                "x-access" : token
            },
            body : JSON.stringify({
                userId : user._id
            })
        })
        .then(response => {
            if(!response.ok){
                toast.error('Hubo un error, intentá más tarde')
            }else{
                props.setNewAnswer(true)
                props.socket.emit('new-liked', {authorOfLike : user.username, authorOfAnswer: props.answer.author, answer : props.answer, authorId : user._id, link: window.location.pathname})
                if(!props.answer.likes.includes(user._id)){
                    sendNotification({
                        message: `A ${user.username} le gustó tu respuesta!`, 
                        receiver: props.answer.author,
                        date: new Date().toLocaleDateString() +','+ new Date().toLocaleTimeString()}, token)
                }
            }
        })
    }

    function dislikeAnswer(){
        fetch(dislikesUrl, {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
                "x-access" : token
            },
            body : JSON.stringify({
                userId : user._id
            })
        })
        .then(response => {
            if(!response.ok){
                toast.error('Hubo un error, intentá más tarde')
            }else{
                props.setNewAnswer(true)
            }
        
        })
    }

    function setAsCorrect(){
        fetch(answerUrl, {
            method : "PATCH",
            headers : {
                "Content-Type": "application/json",
                "x-access" : token
            }
        })
        .then(response => {   
            if(!response.ok){
                toast.error('Hubo un error, intentá más tarde')
            }else{
                props.setAsResolved();
                props.socket.emit('new-confirmed', {authorOfQuestion : props.question.author, authorOfAnswer: props.answer.author, link: window.location.pathname})
                if(props.answer.author !== user._id){
                sendNotification({
                    message: `${user.username} aprobó tu respuesta!`, 
                    receiver: props.answer.author,
                    date: new Date().toLocaleDateString() +','+ new Date().toLocaleTimeString()},token)
                }
                props.setNewAnswer(true)
            }})
        .catch(error => toast.error(error))
    }

    return (
        <div className='answer'>
            <div className="answer-data">
                <Link to={`../user/${props.answer.author}`}>{props.answer.author}</Link>
                <span>{props.answer.repliedOn.slice(0, 10)}</span>
                <span className='answer-status'>{props.answer.status ? "APROBADA" : " "}</span>
            </div>
            <div className="answer-body">
                <p>{props.answer.body}</p>
            </div>
            <div className="answer-likes">
            {props.question.author === user.username ?
            <>
                {props.question.status ? <span className='min-question-status'></span>
                    : 
                <button data-set onClick={setAsCorrect}>Aprobar</button> 
                    } </>:
            <>
                <span data-like onClick={likeAnswer}>{props.answer.likes.length}</span>
                <span data-dislike onClick={dislikeAnswer}>{props.answer.dislikes.length}</span>
            </>
            }
            </div>
        </div>
    );
}

