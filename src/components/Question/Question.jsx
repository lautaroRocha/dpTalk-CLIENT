import React from 'react';
import "./question.css"
import { useParams } from 'react-router-dom';

const Question = () => {

    const { questionId } = useParams();

    {console.log(questionId)}
    return (
        <>
        <main>
          PREGUNTAS
        </main>
      </>
    );
}

export default Question;
