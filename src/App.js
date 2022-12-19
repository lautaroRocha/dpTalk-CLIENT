import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Question from './components/Question/Question';
import Header from './components/Header/Header';
import Ask from './components/Ask/Ask';
import Register from './components/Register/Register';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import TokenContext from "./Context/TokenContext"
import UserContext from "./Context/UserContext"

import ScrollToTop from "./utilities/scrollTop"

function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [newQuestion, setNewQuestion] = useState(false)
  const [newAnswer, setNewAnswer] = useState(false)

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

  const url = "http://localhost:7000/ask"

  useEffect(()=>{
    fetch(url)
    .then(res => res.json())
    .then(data => setQuestions(data))
    setNewQuestion(false)
  }, [newQuestion])

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

  return (
    <>
    <UserContext.Provider value={user}>
    <TokenContext.Provider value={token}>
      <ScrollToTop />
        <Header filterQuestions={filterQuestions} logOut={logOut}/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken}/>} /> 
          <Route path='/' element={<Home filteredQuestions={filteredQuestions}/>}/>
          <Route path='/question/:questionId' element={<Question setNewAnswer={setNewAnswer} setNewQuestion={setNewQuestion}/>}/>
          <Route path="/ask" element={<Ask setNewQuestion={setNewQuestion}/>} />
          <Route path="/register" element={<Register setUser={setUser} setToken={setToken} />} />
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
/>
      </TokenContext.Provider>    
      </UserContext.Provider>
    </>
  );
}

export default App;
