import React, {useState, useEffect, useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AskButton, MinQuestions, NotificationsPanel} from '../../components';
import "./home.css"
import  UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import * as URL from "../../utilities/ApiUrls"

export const Home = (props) => {

  const [notifications, setNotifications] = useState([])

  const user = useContext(UserContext)
  const token = useContext(TokenContext)

  useEffect( ()=>{
    user &&  fetch(URL.notifications + user.username, {headers: {'x-access' : token}})
        .then(res => res.json())
        .then(data => setNotifications(data))
  }, [user])


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
          <NotificationsPanel notifications={notifications.notifications}/>
          <AskButton />
        </>
        )
  }
}

