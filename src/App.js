import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Question from './components/Question/Question';
import Header from './components/Header/Header';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(null)

  useEffect(()=>{
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if(savedToken && savedUser){
      setToken(JSON.parse(savedToken).token)
      setUser(savedUser)
    }
  }, [])

  useEffect(()=>{
    setFilteredQuestions(questions)
  }, [questions])

  const url = "http://localhost:7000/ask"

  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => setQuestions(data))
  },[])

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
        <Header filterQuestions={filterQuestions} logOut={logOut}/>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken}/>} /> 
          <Route path='/' element={<Home filteredQuestions={filteredQuestions} user={user}/>}/>
          <Route path='/question/:questionId' element={<Question />}/>
        </Routes>        
      </BrowserRouter>
    </>
  );
}

export default App;
