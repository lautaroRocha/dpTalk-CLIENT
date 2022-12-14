import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Question from './components/Question/Question';
import Header from './components/Header/Header';
import Ask from './components/Ask/Ask';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from "./utilities/scrollTop"

function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [newQuestion, setNewQuestion] = useState(false)

  useEffect(()=>{
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if(savedToken && savedUser){
      setToken(JSON.parse(savedToken).token)
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
  }

  return (
    <>
      <BrowserRouter>
      <ScrollToTop />
        <Header filterQuestions={filterQuestions} logOut={logOut}/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken}/>} /> 
          <Route path='/' element={<Home filteredQuestions={filteredQuestions} user={user}/>}/>
          <Route path='/question/:questionId' element={<Question />}/>
          <Route path="/ask" element={<Ask user={user} token={token} setNewQuestion={setNewQuestion}/>} />
        </Routes>        
      </BrowserRouter>
    </>
  );
}

export default App;
