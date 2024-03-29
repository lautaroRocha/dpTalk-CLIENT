import React, {useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useFetch from '../../utilities/useFetch';
import { DPLogo, Background } from '../../components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"
import * as URL from "../../utilities/ApiUrls"

export const Login = (props) => {

    const [userData, setUserData] = useState({
        username : "",
        password : ""
    })

    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    const navigate = useNavigate()

    useEffect(()=>{
        if(token && user){
            navigate('/')
        }
    }, [user])


    const userUrl = URL.user + userData.username

    async function LogIn(e){
        e && e.preventDefault()
        let token = await useFetch(URL.logIn, "POST", userData);
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
            toast.info('Hola ' + user.username + ' !')
        }
    }

    return (
        <>
        <div className='login'>
            <Background className="login-canvas"/>
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
                    <input type="text" name="username" className="login-input" onChange={(e) => {setUserData({
        username : e.target.value,
        password : userData.password
        })}}/></label>
                <label htmlFor="password">
                    <span>
                    contraseña:
                    </span>
                    <input type="password" name='password' className="login-input" onChange={(e)=>{setUserData({
                        username: userData.username,
                        password: e.target.value
                    })}}/></label>
                <button onClick={(e) =>{LogIn(e)}}>ingresá</button>

                <Link to="/register">¿No tenés cuenta? Creá una</Link>
            </form>
        </div>
        </>
    );
}

