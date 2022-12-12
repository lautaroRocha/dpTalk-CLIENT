import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Question from './components/Question/Question';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  
  useEffect(()=>{
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if(savedToken && savedUser){
      setToken(JSON.parse(savedToken).token)
      setUser(savedUser)
    }
  }, [])

  const url = "http://localhost:7000/ask"

  useEffect(()=>{
    fetch(url)
      .then(res => res.json())
      .then(data => setQuestions(data))
  },[])



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} setToken={setToken}/>} /> 
          <Route path='/' element={<Home questions={questions} user={user}/>}/>
          <Route path='/question/:questionId' element={<Question />}/>
        </Routes>        
      </BrowserRouter>
    </>
  );
}

export default App;
