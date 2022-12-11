import Login from './components/Login/Login';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';

function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [questions, setQuestions] = useState()

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path='/' element={ <div>EL HOME</div>}/>
        </Routes>        
      </BrowserRouter>
    </>
  );
}

export default App;
