import React, {useState, useRef} from 'react';
import  useFetch  from '../../utilities/useFetch';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../animatedCanvas/animatedCanvas';
import './register.css'
import DPLogo from '../DPLogo/DPLogo';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageCompression from 'browser-image-compression';
import { getStorage, ref, uploadBytes} from "firebase/storage";
import defaultPicture from "../../utilities/default.png"


const Register = (props) => {

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

    const newUserURL = "https://dptalk-api-production.up.railway.app/users/signin"
    const url = "https://dptalk-api-production.up.railway.app/users/login"
    const userUrl = `https://dptalk-api-production.up.railway.app/users/${newUser.username}`

    const defaultPictureURL = 'https://media-exp1.licdn.com/dms/image/C4D0BAQGlw01EDZIgVg/company-logo_200_200/0/1624978925235?e=2147483647&v=beta&t=dYqkqfAhVTDGr1GW7_oV1FC11wXeGSx8Ywadhc4KmzA'


    const storage = getStorage();
    const storageRef = newUser.username && ref(storage, `${newUser.username}-profilepic`);

    async function uploadDefaultPicture(ref, file){
        if(!file){
          toast.error("No se ha detectado ningun archivo")
        }else{
        uploadBytes(ref, file).then((snapshot) => {
           console.log(snapshot);
        }).catch(error => console.log(error.message));
      }
    }

    async function LogIn(){
        let token = await useFetch(url, "POST", {'username' : newUser.username, 'password': newUser.password});
        let user = await useFetch(userUrl, "GET")
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

    function getDefaultPictureBlob(url){
        fetch(url)
        .then(res => res.blob())
        .then(blob => new File([blob], 'image', {type:'image'}))
        .then(file => setDefaultPicture(file))
    }

    async function registerUser(){
        if(password.current.value === repeatPassword.current.value){

            fetch(newUserURL, {method:"POST", body: JSON.stringify(newUser), headers: {
                'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then( data => {
                if(data.message){
                    let errors = Array.from(data.message.split(', '))
                    errors.forEach((err) => toast.error(err))
                }else{
                    getDefaultPictureBlob(defaultPictureURL)
                    uploadDefaultPicture(storageRef, defaultPicture)
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


    getDefaultPictureBlob()

    return (
        <div className='register'>
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

export default Register;
