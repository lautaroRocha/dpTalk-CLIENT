import React, {useState, useRef} from 'react';
import  useFetch  from '../../utilities/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import {Background, DPLogo} from "../../components"
import './register.css'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import * as URL from "../../utilities/ApiUrls"

export const Register = (props) => {

    const [newUser, setNewUser] = useState({
        "username": " ",
        "email": " ",
        "password" : " ",
    })
    const [defaultPicture, setDefaultPicture] = useState()

    const navigate = useNavigate()

    const username = useRef()
    const email = useRef()
    const password = useRef()
    const repeatPassword = useRef()


    async function LogIn(){
        let token = await useFetch(URL.logIn, "POST", {'username' : newUser.username, 'password': newUser.password});
        let user = await useFetch(URL.user + newUser.username, "GET")
        if(token.message){
            toast.error(token.message)
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
            fetch(URL.registerUser, {method:"POST", body: JSON.stringify(newUser), headers: {
                'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then( data => {
                if(data.message){
                    let errors = Array.from(data.message.split(', '))
                    errors.forEach((err) => toast.error(err))
                }else{
                    LogIn()
                }
            })
            .catch(error => toast.error(error))
        }else{
            toast.error('las contraseñas deben coincidir')
        }
    }

    function handleRegister(e){
        e.preventDefault()
        registerUser()
    }


    return (
        <div className='register'>
            <img src="" alt="" />
        <Background />
              <span>TALK</span>
        <div className='dev-place-logo'>
            <DPLogo/>
            <DPLogo/>
        </div>
        <form className='register-form'>
            <div>
            <div>
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
            </div>
            <div>
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
            </div>
            </div>
            <button onClick={(e) => {handleRegister(e)}}>registrate</button>
            
            <Link to="/login">¿Ya tenés cuenta? Ingresá</Link> 
        </form>
        </div>
    );
}

