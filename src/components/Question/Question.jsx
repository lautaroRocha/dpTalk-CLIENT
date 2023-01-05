import React, {useState, useEffect, useRef, useContext} from 'react';
import TokenContext from '../../Context/TokenContext';
import "./question.css"
import { useParams } from 'react-router-dom';
import { Answer, AnswerBox, Spinner  } from '../../components';
import getProfilePicture from '../../utilities/getPPURL';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as URL from "../../utilities/ApiUrls"


export const Question = (props) => {

  const token = useContext(TokenContext)
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [profilePictureUrl, setProfilePicUrl] = useState()

  const { questionId } = useParams();

  const answerBox = useRef()


  
  useEffect(()=>{
    fetch(URL.questions + questionId, {headers:{'x-access' : token}})
    .then(res => res.json())
    .then(data => setQuestion(data))


    fetch(URL.answers + questionId, {headers:{'x-access' : token}})
    .then(res => res.json())
    .then(data => setAnswers(Array.from(data)))
    props.setNewAnswer(false)
    
  }, [props])

answers.sort((a, b) =>{
  const aLikes = a.likes.length;
  const bLikes = b.likes.length;
      if(aLikes == bLikes) {
        return 0; 
      }
      if(aLikes < bLikes) {
        return 1;
      }
      return -1;
    })

 
  if(question && !profilePictureUrl){
  const cachedURL = sessionStorage.getItem(`ProPic-${question.author}`)

  if(cachedURL && !profilePictureUrl){
      setProfilePicUrl(cachedURL)
  }else{
      getProfilePicture(question.author, setProfilePicUrl)
      sessionStorage.setItem(`ProPic-${question.author}`, profilePictureUrl )
  }
}


  function showAnswerBox(){
    answerBox.current.style.display = "flex"
  }
  function setAsResolved(){
    fetch(URL.questions + questionId, {
        method : "PATCH",
        headers : {
            "Content-Type": "application/json",
            "x-access" : token
        }
    })
    .then(response => {
        if(!response.ok){
            toast.error('Tuvimos un problema, intentá de nuevo más tarde')
        }else{
            props.setNewQuestion(true)
           
        }
    
    })
}


    return (
        <>
        {!question ?
        <Spinner/> :
        <div className='question-wrapper'>
          {question &&
          <>
          <div className="question">
            <div className="question-head">
            <img className='question-head-img' src={profilePictureUrl}/>
              <div className="question-head-text">
                <div>
                  <Link to={`/user/${question.author}`}>{question.author}</Link>
                  <span>{question.askedOn.slice(0,10)}</span>
                  <span>{question.status === false ? "PENDIENTE" : "CONTESTADA"}</span>
                </div>
                <h2 className='question-title'>{question.title}</h2>
              </div>
            </div>
            <div className="question-body">{question.body}</div>
          </div>
          <div className='question-action'>
            <span>¿Sabés la respuesta?</span>
            <button onClick={showAnswerBox}>RESPONDER</button>
          </div>
          <AnswerBox ref={answerBox} question={question} setAnswers={setAnswers} setNewAnswer={props.setNewAnswer} socket={props.socket}/>
          </>
          }
          {answers && 
          <>
          <div className="answers-container">
            {answers.map((ans, idx) =>{
              return (<Answer answer={ans} key={idx} setNewAnswer={props.setNewAnswer} question={question} setAsResolved={setAsResolved} socket={props.socket}/>)
            })}
            </div>
          </>
          }
        </div>}
      </>
    );
}

