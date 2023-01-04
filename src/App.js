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


function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [newQuestion, setNewQuestion] = useState(false)
  const [newAnswer, setNewAnswer] = useState(false)
  const [socket, setSocket] = useState(null)

  const questionsUrl = "https://dptalk-api-production.up.railway.app/ask"
  const userUrl = user && `https://dptalk-api-production.up.railway.app/users/${user.username}`


  useEffect(()=>{
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if(savedToken && savedUser){
      setToken(JSON.parse(savedToken))
      setUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(()=>{
    const questionsArray = questions
    setFilteredQuestions(questionsArray.reverse())
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
    const socket = socketIO.connect("https://socket-testing-production.up.railway.app/");
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
      toast.success(`${data.authorOfAnswer} respondió tu pregunta!`)}
    });

    socket.off("confirmed-notification").on("confirmed-notification", (arg) => {
       const data = JSON.parse(arg)
       if(data.authorOfAnswer === user.username){
        toast.success(`${data.authorOfQuestion} marcó tu respuesta como correcta!`)}
    });
    socket.off("like-notification").on("like-notification", (arg) => {
      const data = JSON.parse(arg)
      console.log()
      if(!data.answer.likes.includes(data.authorId) && data.authorOfAnswer === user.username && data.authorOfLike !== user.username){
       toast.success(`A ${data.authorOfLike} le gustó tu respuesta!`)}
   });
   socket.off("post-notification").on("post-notification", (arg) => {
      alert('Hay nuevos posteos')
 });
  }

  const navigate = useNavigate()

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
            style={{"overflow" : "visible"}}
/>
      </TokenContext.Provider>    
      </UserContext.Provider>
    </>
  );
}

export default App;
