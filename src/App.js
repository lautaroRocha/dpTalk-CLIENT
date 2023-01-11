
import {Login, Home, Question, Header, Ask, Register, UserProfile, ScrollToTop, NotificationsPanel, engageSocket} from "./components"
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {  Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import useFetch from './utilities/useFetch';
import TokenContext from "./Context/TokenContext"
import UserContext from "./Context/UserContext"
import socketIO from "socket.io-client";
import 'react-notifications/lib/notifications.css';
import * as URL from "./utilities/ApiUrls"



function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(null)
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [newQuestion, setNewQuestion] = useState(false)
  const [newAnswer, setNewAnswer] = useState(false)
  const [socket, setSocket] = useState(null)
  const [alertNotif, setAlertNotif] = useState(false)

  const questionsUrl = URL.questions
  const userUrl = user && URL.user + user.username
  
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(()=>{
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if(savedToken && savedUser){
      setToken(JSON.parse(savedToken))
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(()=>{
    setFilteredQuestions(questions)
  }, [questions, location])

  useEffect(()=>{
    fetch(questionsUrl)
      .then(res => res.json())
      .then(data => {
        if(data.message){
          toast.error(data.message)
        }else{
          setQuestions(data)
          setNewQuestion(false)
        }})
      .catch(error => toast.error(error))
  }, [newQuestion])

  useEffect(()=>{
    if(!socket){
    const socket = socketIO.connect(URL.socket);
    socket && setSocket(socket)
    }
  }, [])


  if(socket){
    const notSelfReply = data =>  data.authorOfAnswer !== user.username
    const userDidQuestion = data =>  data.authorOfQuestion === user.username
    const userReplied = data => data.authorOfAnswer === user.username
    const wassNotLiked =  data => !data.answer.likes.includes(data.authorId)
    const notSelfLike =  data => data.authorOfLike !== user.username
    const notOwnPost = data => data.author !== user.username
    const onHome = window.location.pathname == "/"
    
    socket.off("answer-notification").on("answer-notification", (arg) => {
        const data = JSON.parse(arg)
        if(notSelfReply(data) && userDidQuestion(data)){
          NotificationManager.success(`respondió tu pregunta!`, `${data.authorOfAnswer}`, 5000, ()=>{navigate(data.link)});
          setAlertNotif(!alertNotif)
       }
        });
    socket.off("confirmed-notification").on("confirmed-notification", (arg) => {
        const data = JSON.parse(arg)
        if(userReplied(data) && notSelfReply(data)){
          NotificationManager.success(`marcó tu respuesta como correcta!`, `${data.authorOfQuestion}`, 5000, ()=>{navigate(data.link)})
          setAlertNotif(!alertNotif)
          }
        });
    socket.off("like-notification").on("like-notification", (arg) => {
        const data = JSON.parse(arg)
        if(wassNotLiked(data) && userReplied(data) && notSelfLike(data)){
          NotificationManager.success(`le gustó tu respuesta!`, ` A ${data.authorOfLike}`, 5000,()=>{navigate(data.link)})
          setAlertNotif(!alertNotif)
          }
       });
    socket.off("post-notification").on("post-notification", (arg) => {
        const data = JSON.parse(arg)
        if(notOwnPost(data) && onHome){
          alertOnNewPosts()
        }
     })
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
        {window.location.pathname === "/" && <NotificationsPanel alert={alertNotif}/>}
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
