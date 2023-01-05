import React from 'react';
import { Navigate } from 'react-router-dom';
import { AskButton, MinQuestions} from '../../components';
import "./home.css"
import  UserContext from '../../Context/UserContext';
import { useContext } from 'react';

export const Home = (props) => {

  const user = useContext(UserContext)

  
  if(!user){
    return <Navigate to="/login"/>;
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

