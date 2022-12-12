import React from 'react';
import "./question.css"
import Header from "../Header/Header"
import { useParams } from 'react-router-dom';

const Question = () => {

    const { questionId } = useParams();

    {console.log(questionId)}
    return (
        <>
        <Header/>
        <main>
          PREGUNTAS
        </main>
      </>
    );
}

export default Question;
