import Login from './components/Login/Login';
import Home from './components/Home/Home';
import Question from './components/Question/Question';
import Header from './components/Header/Header';
import Ask from './components/Ask/Ask';
import Register from './components/Register/Register';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {  Route, Routes, useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import TokenContext from "./Context/TokenContext"
import UserContext from "./Context/UserContext"
import ScrollToTop from "./utilities/scrollTop"
import UserProfile from './components/UserProfile/UserProfile';

function App() {

  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [token, setToken] = useState(false)
  const [filteredQuestions, setFilteredQuestions] = useState(null)
  const [newQuestion, setNewQuestion] = useState(false)
  const [newAnswer, setNewAnswer] = useState(false)

  const questionsUrl = "http://localhost:7000/ask"
  const userUrl = user && `http://localhost:7000/users/${user.username}`


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
       showError(user.message)
        return
    }else{
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
    }
}


function showError(error){
  toast.error(error)
}

console.log('render')

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
          <Route path="/user" element={<UserProfile updateUser={useUpdateUser}/>} />
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
