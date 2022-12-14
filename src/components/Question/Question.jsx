import React, {useState, useEffect, useRef} from 'react';
import "./question.css"
import { useParams } from 'react-router-dom';
import AnswerBox from '../AnswerBox/AnswerBox';

const Question = (props) => {

  const [question, setQuestion] = useState();
  const [answers, setAnswers] = useState();

  const { questionId } = useParams();

  const answerBox = useRef()

  const questionUrl= `http://localhost:7000/ask/${questionId}`
  const answersUrl= `http://localhost:7000/reply/${questionId}`

  
  useEffect(()=>{
    fetch(questionUrl)
    .then(res => res.json())
    .then(data => setQuestion(data))

    fetch(answersUrl, {headers:{'x-access' : props.token}})
    .then(res => res.json())
    .then(data => setAnswers(data))
  }, [])


  function showAnswerBox(){
    answerBox.current.style.display = "flex"
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

          <AnswerBox ref={answerBox} question={question._id} user={props.user} token={props.token}/>
          </>
          }
        </main>
      </>
    );
}

export default Question;
