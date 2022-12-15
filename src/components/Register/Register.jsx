import React, {useState, useRef} from 'react';
import  useFetch  from '../../useFetch';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../animatedCanvas/animatedCanvas';
import './register.css'
import DPLogo from '../DPLogo/DPLogo';

const Register = (props) => {

    const [newUser, setNewUser] = useState({
        "username": " ",
        "email": " ",
        "password" : " ",
    })

    const navigate = useNavigate()

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const repeatPassword = useRef()


    const newUserURL = "http://localhost:7000/users/signin"
    const url = "http://localhost:7000/users/login"
    const userUrl = `http://localhost:7000/users/${newUser.username}`

    async function LogIn(){
        let token = await useFetch(url, "POST", {'username' : newUser.username, 'password': newUser.password});
        let user = await useFetch(userUrl, "GET")
        if(token.message){
            console.log(token.message)
            return
        }else{
            props.setUser(user)
            props.setToken(token.token)
            localStorage.setItem('token', JSON.stringify(token.token))
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
        }
    }

    async function registerUser(){
        if(password.current.value === repeatPassword.current.value){
            fetch(newUserURL, {method:"POST", body: JSON.stringify(newUser), headers: {
                'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then( data => {
                if(data.message){
                    console.log(Array.from(data.message.split(', ')))
                }else{
                    LogIn()
                }
            })
            .catch(error => console.log(error))
        }else{
            console.log('las contraseñas deben coincidir')
        }
    }

    function handleRegister(e){
        e.preventDefault()
        registerUser()
    }


    return (
        <div className='register'>
        <Background />
              <span>TALK</span>
        <div className='dev-place-logo'>
            <DPLogo/>
            <DPLogo/>
        </div>
        <form >
            <label htmlFor="username">
                <span>
                usuario:
                </span>
                <input type="text" name="username" ref={username} onChange={(e) => {setNewUser({
                     "username" : e.target.value,
                     "email" : newUser.email,
                     "password" : newUser.password
                })}}/>
            </label>
            <label htmlFor="email">
                <span>
                email:
                </span>
                <input type="email" name='email' ref={email} onChange={(e) => {setNewUser({
                     "username" : newUser.username,
                     "email" : e.target.value,
                     "password" : newUser.password
                })}}/>
            </label>
            <label htmlFor="password">
                <span>
                contraseña:
                </span>
                <input type="password" name='password' ref={password} onChange={(e) => {setNewUser({
                     "username" : newUser.username,
                     "email" : newUser.email,
                     "password" : e.target.value
                })}} />
            </label>
            <label htmlFor="repeat-password">
                <span>
                confirmá la contraseña:
                </span>
                <input type="password" name='repeat-password' ref={repeatPassword} />
            </label>
            <button onClick={(e) => {handleRegister(e)}}>registrate</button>
            
            <Link to="/login">¿Ya tenés cuenta? Ingresá</Link> 
        </form>
        </div>
    );
}

export default Register;
