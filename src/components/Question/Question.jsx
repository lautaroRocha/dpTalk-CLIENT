import React, {useState, useEffect} from 'react';
import "./question.css"
import { useParams } from 'react-router-dom';

const Question = () => {
  const [question, setQuestion] = useState()
  const { questionId } = useParams();

  const questionUrl= `http://localhost:7000/ask/${questionId}`
  
  useEffect(()=>{
    fetch(questionUrl)
    .then(res => res.json())
    .then(data => setQuestion(data))
  }, [])

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
                <h1>{question.title}</h1>
              </div>
            </div>
            <div className="question-body">{question.body}</div>
          </div>
          <div className='question-action'>
            <span>¿Sabés la respuesta?</span>
            <button>RESPONDER</button>
          </div>
          </>
          }
        </main>
      </>
    );
}

export default Question;
