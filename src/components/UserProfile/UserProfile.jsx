import React, {useContext, useState, useEffect} from 'react';
import "./userprofile.css"
import UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {

    const [questionsByUser, setQuestionsByUser] = useState([])
    const [answersByUser, setAnswersByUser] = useState([])

    const user = useContext(UserContext)
    const token = useContext(TokenContext)

    useEffect( () => {
        if(user){
            const answersUrl = `http://localhost:7000/reply/by/${user.username}`
            const questionsUrl = `http://localhost:7000/ask/by/${user.username}`
        fetch(answersUrl, {headers: { 
            "x-access" : token
        }})
        .then(res => res.json())
        .then(data => {
          if(data.message){
            console.log(data.message)
          }else{
            setAnswersByUser(Array.from(data))
          }})
        .catch(error => console.log(error))
        

        fetch(questionsUrl, {headers: { 
            "x-access" : token
        }})
        .then(res => res.json())
        .then(data => {
          if(data.message){
            console.log(data.message)
          }else{
            setQuestionsByUser(Array.from(data))
          }})
        .catch(error => console.log(error))
        }
    
    }, [user])

    return (
        <div className='profile'>
            {user &&
            <div className="profile-card">
                <div className="profile-head">
                    <span className="profile-picture"> </span>     
                    <div>
                        <h2>{user.username}</h2>
                        <span>{user.email}</span>
                    </div>   
                </div>
                <div className="profile-body">
                    <div className="questions">
                        <h3>
                    Hiciste  
                    <span> {questionsByUser.length}</span> preguntas</h3>
                        <div>
                        {questionsByUser.map((qstn, idx) => {return(<Link key={idx} to={`../question/${qstn._id}`}>{qstn.title}</Link>)})}
                        </div>
                    </div>
                    <div className="answers">
                    <h3>
                    Subiste  
                    <span> {answersByUser.length}</span> respuestas</h3>
                        <div>
                        {answersByUser.map((answ, idx) => {return(<Link key={idx} to={`../question/${answ.question}`}>{answ.body}</Link>)})}
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default UserProfile;
