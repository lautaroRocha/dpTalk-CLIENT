import React, {useState, useEffect} from 'react';
import { Navigate } from 'react-router-dom';
import Header from '../Header/Header';
import MinQuestions from '../MinQuestion/MinQuestions';
import "./home.css"

const Home = (props) => {


  if(!props.user){
    return <Navigate to="/login" replace />;
    }else{
      return(
        <>
        <h1>¡Bienvenidx a DevPlaceTALK!</h1>
          <main>
            {props.filteredQuestions && props.filteredQuestions.map((qstn, idx) => {
              return(<MinQuestions question={qstn} key={idx} />)
            })}
          </main>
        </>
        )
  }
}

export default Home;
