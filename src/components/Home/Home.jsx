import React, {useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AskButton, MinQuestions, NotificationsPanel} from '../../components';
import "./home.css"
import  UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';

export const Home = (props) => {

  const user = useContext(UserContext)
  const token = useContext(TokenContext)




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
          </main>          <AskButton />
        </>
        )
  }
}

