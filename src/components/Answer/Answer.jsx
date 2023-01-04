import React, {useContext} from 'react';
import TokenContext from "../../Context/TokenContext"
import UserContext from "../../Context/UserContext"
import './answer.css'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';


const Answer = (props) => {

    const likesUrl = `https://dptalk-api-production.up.railway.app/reply/like/${props.answer._id}`
    const dislikesUrl = `https://dptalk-api-production.up.railway.app/reply/dislike/${props.answer._id}`
    const answerUrl= `https://dptalk-api-production.up.railway.app/reply/${props.answer._id}`

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
                props.socket.emit('new-liked', {authorOfLike : user.username, authorOfAnswer: props.answer.author, answer : props.answer, authorId : user._id})
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
                props.socket.emit('new-confirmed', {authorOfQuestion : props.question.author, authorOfAnswer: props.answer.author})
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

export default Answer;
