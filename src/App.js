import Login from './components/Login/Login';
import Home from './components/Home/Home'
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [questions, setQuestions] = useState()
  const [token, setToken] = useState(false)
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    token ? setIsLogged(true) : setIsLogged(false)
    token && setToken(JSON.parse(token).token)
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setIsLogged={setIsLogged} setToken={setToken}/>} /> 
          <Route path='/' element={<Home/>}/>
        </Routes>        
      </BrowserRouter>
    </>
  );
}

export default App;
