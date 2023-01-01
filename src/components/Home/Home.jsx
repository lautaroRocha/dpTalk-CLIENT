import React from 'react';
import { Navigate } from 'react-router-dom';
import AskButton from '../AskButton/AskButton';
import MinQuestions from '../MinQuestion/MinQuestions';
import "./home.css"
import  UserContext from '../../Context/UserContext';
import { useContext } from 'react';

const Home = (props) => {

  const user = useContext(UserContext)
  console.log(user)

  if(!user){
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
          <AskButton />
        </>
        )
  }
}

export default Home;
