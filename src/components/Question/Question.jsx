import React, {useState, useEffect, useRef, useContext} from 'react';
import TokenContext from '../../Context/TokenContext';
import "./question.css"
import { useParams } from 'react-router-dom';
import AnswerBox from '../AnswerBox/AnswerBox';
import Answer from '../Answer/Answer';

const Question = (props) => {

  const token = useContext(TokenContext)
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

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
        <main>
          {question &&
          <>
          <div className="question">
            <div className="question-head">
              <div className="question-head-img"> </div>
              <div className="question-head-text">
                <div>
                  <span>{question.author}</span>
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
        </main>
      </>
    );
}

export default Question;
