import React, {useState, useEffect, useRef, useContext} from 'react';
import TokenContext from '../../Context/TokenContext';
import "./question.css"
import { useParams } from 'react-router-dom';
import AnswerBox from '../AnswerBox/AnswerBox';
import Answer from '../Answer/Answer';
import getProfilePicture from '../../utilities/getPPURL';
import { Link } from 'react-router-dom';


const Question = (props) => {

  const token = useContext(TokenContext)
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [profilePictureUrl, setProfilePicUrl] = useState()

  const { questionId } = useParams();

  const answerBox = useRef()

  const questionUrl= `http://localhost:7000/ask/${questionId}`
  const answersUrl= `http://localhost:7000/reply/${questionId}`

  
  useEffect(()=>{
    fetch(questionUrl)
    .then(res => res.json())
    .then(data => setQuestion(data))

  
    fetch(answersUrl, {headers:{'x-access' : token}})
    .then(res => res.json())
    .then(data => setAnswers(Array.from(data)))
    props.setNewAnswer(false)
    
  }, [props])

  answers.sort((a, b) => b.likes -  a.likes )

  if(question && !profilePictureUrl){
  const cachedURL = sessionStorage.getItem(`ProPic-${question._id}`)

  if(cachedURL && !profilePictureUrl){
      setProfilePicUrl(cachedURL)
  }else{
      getProfilePicture(question.author, setProfilePicUrl)
      sessionStorage.setItem(`ProPic-${question._id}`, profilePictureUrl )
  }
}


  function showAnswerBox(){
    answerBox.current.style.display = "flex"
  }
  function setAsResolved(){
    fetch(questionUrl, {
        method : "PATCH",
        headers : {
            "Content-Type": "application/json",
            "x-access" : token
        }
    })
    .then(response => {
        if(!response.ok){
            console.log(response.message)
        }else{
            console.log('exito')
            props.setNewQuestion(true)
        }
    
    })
}


    return (
        <>
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
          <AnswerBox ref={answerBox} question={question._id} setAnswers={setAnswers} setNewAnswer={props.setNewAnswer}/>
          </>
          }
          {answers && 
          <>
          <div className="answers-container">
            {answers.map((ans, idx) =>{
              return (<Answer answer={ans} key={idx} setNewAnswer={props.setNewAnswer} question={question} setAsResolved={setAsResolved}/>)
            })}
            </div>
          </>
          }
        </div>
      </>
    );
}

export default Question;
