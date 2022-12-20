import React, {useContext} from 'react';
import TokenContext from "../../Context/TokenContext"
import UserContext from "../../Context/UserContext"
import './answer.css'


const Answer = (props) => {

    const likesUrl = `http://localhost:7000/reply/like/${props.answer._id}`
    const dislikesUrl = `http://localhost:7000/reply/dislike/${props.answer._id}`
    const answerUrl= `http://localhost:7000/reply/${props.answer._id}`

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
                console.log(response)
            }else{
                console.log('exito')
                props.setNewAnswer(true)
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
                console.log(response.message)
            }else{
                console.log('exito')
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
                console.log(response)
            }else{
                props.setAsResolved();
                props.setNewAnswer(true)
            }})
        .catch(error => console.log(error))
    }

    return (
        <div className='answer'>
            <div className="answer-data">
                <span>{props.answer.author}</span>
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
