import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch';
import DPLogo from "../DPLogo/DPLogo"
import Background from '../animatedCanvas/animatedCanvas';
import "./Login.css"

const Login = (props) => {

    const [userData, setUserData] = useState({
        username : "",
        password : ""
    })

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')
        if(token && user){
            navigate('/')
        }

    }, [])

    const navigate = useNavigate()
    const url = "http://localhost:7000/users/login"
    const userUrl = `http://localhost:7000/users/${userData.username}`

    async function LogIn(e){
        e.preventDefault()
        let token = await useFetch(url, "POST", userData)
        let user = await useFetch(userUrl, "GET")
            if(token.token){
                props.setToken(token.token)
                localStorage.setItem('token', JSON.stringify(token))
            }else{
                console.log(token.message)
            }
        if(user){
            props.setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/')
        }
    }


    return (
        <div className='login'>
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

                <a href="">¿No tenés cuenta? Creá una</a>
            </form>
        </div>
    );
}

export default Login;
