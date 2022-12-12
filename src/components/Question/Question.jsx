import React, {useState, useEffect} from 'react';
import useFetch from '../../useFetch';
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
          PREGUNTAS
        </main>
      </>
    );
}

export default Question;
