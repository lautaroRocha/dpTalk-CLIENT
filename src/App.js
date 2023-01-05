import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Question from './components/Question/Question';
import Header from './components/Header/Header';
import Ask from './components/Ask/Ask';
import Register from './components/Register/Register';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import useFetch from './utilities/useFetch';
import TokenContext from "./Context/TokenContext"
import UserContext from "./Context/UserContext"
import ScrollToTop from "./utilities/scrollTop"
import UserProfile from './components/UserProfile/UserProfile';
import socketIO from "socket.io-client";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import * as URL from "./utilities/ApiUrls"


function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [newQuestion, setNewQuestion] = useState(false)
  const [newAnswer, setNewAnswer] = useState(false)
  const [socket, setSocket] = useState(null)


  const questionsUrl = URL.questions
  const userUrl = user && URL.user + user.username
  
  const navigate = useNavigate()


  useEffect(()=>{
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if(savedToken && savedUser){
      setToken(JSON.parse(savedToken))
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(()=>{
    setFilteredQuestions(Array.from(questions).reverse())
  }, [questions])

  useEffect(()=>{
    fetch(questionsUrl)
      .then(res => res.json())
      .then(data => {
        if(data.message){
          console.log(data.message)
        }else{
          setQuestions(data)
          setNewQuestion(false)
        }})
      .catch(error => console.log(error))
  }, [newQuestion])

  useEffect(()=>{
    if(!socket){
    const socket = socketIO.connect(URL.socket);
    socket && setSocket(socket)
    }
  }, [])

  if(socket){
    socket.on("connection", (arg) => {
      console.log('entraste al socket');
    });
    socket.off("answer-notification").on("answer-notification", (arg) => {
      const data = JSON.parse(arg)
      if(data.authorOfQuestion === user.username){
      NotificationManager.success(`respondió tu pregunta!`, `${data.authorOfAnswer}`, 5000, ()=>{navigate(data.link)});
    }
    });
    socket.off("confirmed-notification").on("confirmed-notification", (arg) => {
       const data = JSON.parse(arg)
       if(data.authorOfAnswer === user.username){
        NotificationManager.success(`marcó tu respuesta como correcta!`, `${data.authorOfQuestion}`, 5000, ()=>{navigate(data.link)})}
    });
    socket.off("like-notification").on("like-notification", (arg) => {
      const data = JSON.parse(arg)
      console.log()
      if(!data.answer.likes.includes(data.authorId) && data.authorOfAnswer === user.username && data.authorOfLike !== user.username){
       NotificationManager.success(`le gustó tu respuesta!`, ` A ${data.authorOfLike}`, 5000,()=>{navigate(data.link)})}
   });
   socket.off("post-notification").on("post-notification", (arg) => {
    const data = JSON.parse(arg)
    if(data.author !== user.username && window.location.pathname == "/"){
      alertOnNewPosts()
    }
 });
  }

  function alertOnNewPosts(){
    const refreshButton = document.createElement('button')
    refreshButton.setAttribute('class', 'new-post-button')
    refreshButton.innerText = "HAY NUEVOS POSTEOS"
    document.body.append(refreshButton)
    refreshButton.onclick = () =>{
      setNewQuestion(true);
      refreshButton.remove()
    }
  }


  function filterQuestions(e){
    let input = e.target.value;
    const filteredByTitle = questions.filter( (obj) => {return( obj.title.toLowerCase().includes(input.toLowerCase()))})
    setFilteredQuestions(filteredByTitle)
  }
  function logOut(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setToken(null)
    navigate('/login')
  }


  async function useUpdateUser(e){
    e && e.preventDefault()
    let user = await useFetch(userUrl, "GET")
    if(user.message){
        toast.error(user.message)
        return
    }else{
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }
}

  return (
    <>
    <UserContext.Provider value={user}>
    <TokenContext.Provider value={token}>
      <ScrollToTop />
        <Header filterQuestions={filterQuestions} logOut={logOut}/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken}/>} /> 
          <Route path='/' element={<Home filteredQuestions={filteredQuestions}/>}/>
          <Route path='/question/:questionId' element={<Question setNewAnswer={setNewAnswer} setNewQuestion={setNewQuestion} socket={socket}/>}/>
          <Route path="/ask" element={<Ask setNewQuestion={setNewQuestion} socket={socket}/>} />
          <Route path="/register" element={<Register setUser={setUser} setToken={setToken} />} />
          <Route path="/user/:username" element={<UserProfile updateUser={useUpdateUser}/>} />
        </Routes>    
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{"overflow" : "visible"}}/>
        <NotificationContainer style={{'overflow': 'visible'}}/>
      </TokenContext.Provider>    
      </UserContext.Provider>
    </>
  );
}

export default App;
