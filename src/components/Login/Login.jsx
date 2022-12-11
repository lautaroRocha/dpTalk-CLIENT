import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch';
import Background from '../animatedCanvas/animatedCanvas';
import "./Login.css"

const Login = (props) => {

    const [userData, setUserData] = useState({
        username : "",
        password : ""
    })

    const navigate = useNavigate()
    const url = "https://dptalk-api-production-2a5b.up.railway.app/users/login"

    async function LogIn(e){
        e.preventDefault()
        let token = await useFetch(url, "POST", userData)
        if(token.token){
            props.setToken(token.token)
            props.setIsLogged(true)
            navigate('/')
        }else{
            console.log(token.message)
        }
    }


    return (
        <div className='login'>
            <Background />
                  <span>TALK</span>
            <div className='dev-place-logo'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.63 81.48" >
        <g id="Capa_2" data-name="Capa 2">
          <g id="logo_definitivo" data-name="logo definitivo">
            <path class="cls-1" d="M57.9,5.84a7.91,7.91,0,0,0,5.84,2.38H92.61a8,8,0,0,0,5.78-2.38A7.81,7.81,0,0,0,100.83,0H55.52A8.08,8.08,0,0,0,57.9,5.84Z"></path>
            <path class="cls-1" d="M57.9,38.71a7.91,7.91,0,0,0,5.84,2.38H92.61a8,8,0,0,0,5.78-2.38,7.81,7.81,0,0,0,2.44-5.84H55.52A8.08,8.08,0,0,0,57.9,38.71Z"></path>
            <path class="cls-1" d="M57.9,22.28a7.94,7.94,0,0,0,5.84,2.37H92.61a8,8,0,0,0,5.78-2.37,7.83,7.83,0,0,0,2.44-5.84H55.52A8.11,8.11,0,0,0,57.9,22.28Z"></path>
            <path class="cls-1" d="M176.23,8.22h37.09v4.11a4,4,0,0,1-1.22,2.95,4.08,4.08,0,0,1-2.89,1.16h-33V41.09h8.21V24.65h28.88a8,8,0,0,0,5.77-2.37,7.83,7.83,0,0,0,2.44-5.84V0h-45.3Z"></path>
            <path class="cls-1" d="M240,0h-8.22V41.09h33.09a8,8,0,0,0,5.78-2.38,7.85,7.85,0,0,0,2.44-5.84H240Z"></path>
            <path class="cls-1" d="M283.65,5.84a7.91,7.91,0,0,0,5.84,2.38h28.87a8,8,0,0,0,5.78-2.38A7.81,7.81,0,0,0,326.58,0H281.27A8.08,8.08,0,0,0,283.65,5.84Z"></path>
            <polygon class="cls-1" points="281.27 41.09 289.49 41.09 289.49 24.65 318.36 24.65 318.36 41.09 326.58 41.09 326.58 16.44 281.27 16.44 281.27 41.09"></polygon>
            <path class="cls-1" d="M336.8,8.22h37.09a8,8,0,0,0,5.78-2.38A7.85,7.85,0,0,0,382.11,0H336.8Z"></path>
            <path class="cls-1" d="M346.17,31.72a4.15,4.15,0,0,1-1.15-3V16.44H336.8V32.87a8.07,8.07,0,0,0,2.37,5.84A8,8,0,0,0,345,41.09h28.87a8,8,0,0,0,5.78-2.38,7.85,7.85,0,0,0,2.44-5.84h-33A4.14,4.14,0,0,1,346.17,31.72Z"></path>
            <path class="cls-1" d="M401.54,8.22h28.87a8,8,0,0,0,5.78-2.38A7.81,7.81,0,0,0,438.63,0H393.32a8,8,0,0,0,2.38,5.84A7.91,7.91,0,0,0,401.54,8.22Z"></path>
            <path class="cls-1" d="M395.7,22.28a7.94,7.94,0,0,0,5.84,2.37h28.87a8,8,0,0,0,5.78-2.37,7.83,7.83,0,0,0,2.44-5.84H393.32A8.07,8.07,0,0,0,395.7,22.28Z"></path>
            <path class="cls-1" d="M395.7,38.71a7.91,7.91,0,0,0,5.84,2.38h28.87a8,8,0,0,0,5.78-2.38,7.81,7.81,0,0,0,2.44-5.84H393.32A8,8,0,0,0,395.7,38.71Z"></path>
            <path class="cls-1" d="M37.09,0H0A8,8,0,0,0,2.38,5.84,7.91,7.91,0,0,0,8.22,8.22H33a4,4,0,0,1,4.11,4.1V28.76A4,4,0,0,1,33,32.87H8.22V16.44H0V41.09H37.09a8,8,0,0,0,5.78-2.38,7.85,7.85,0,0,0,2.44-5.84V8.22a7.85,7.85,0,0,0-2.44-5.84A8,8,0,0,0,37.09,0Z"></path>
            <path class="cls-1" d="M119.27,0a7.85,7.85,0,0,0-5.85,2.44,8,8,0,0,0-2.37,5.78V30.65l8.22-9.5Z"></path>
            <polygon class="cls-1" points="111.54 41.09 114.26 41.09 122.99 41.09 158.41 0 147.18 0 111.54 41.09"></polygon>
          </g>
        </g>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 438.63 81.48" >

<g id="Capa_2" data-name="Capa 2">
  <g id="logo_definitivo" data-name="logo definitivo">
    <path class="cls-1" d="M57.9,5.84a7.91,7.91,0,0,0,5.84,2.38H92.61a8,8,0,0,0,5.78-2.38A7.81,7.81,0,0,0,100.83,0H55.52A8.08,8.08,0,0,0,57.9,5.84Z"></path>
    <path class="cls-1" d="M57.9,38.71a7.91,7.91,0,0,0,5.84,2.38H92.61a8,8,0,0,0,5.78-2.38,7.81,7.81,0,0,0,2.44-5.84H55.52A8.08,8.08,0,0,0,57.9,38.71Z"></path>
    <path class="cls-1" d="M57.9,22.28a7.94,7.94,0,0,0,5.84,2.37H92.61a8,8,0,0,0,5.78-2.37,7.83,7.83,0,0,0,2.44-5.84H55.52A8.11,8.11,0,0,0,57.9,22.28Z"></path>
    <path class="cls-1" d="M176.23,8.22h37.09v4.11a4,4,0,0,1-1.22,2.95,4.08,4.08,0,0,1-2.89,1.16h-33V41.09h8.21V24.65h28.88a8,8,0,0,0,5.77-2.37,7.83,7.83,0,0,0,2.44-5.84V0h-45.3Z"></path>
    <path class="cls-1" d="M240,0h-8.22V41.09h33.09a8,8,0,0,0,5.78-2.38,7.85,7.85,0,0,0,2.44-5.84H240Z"></path>
    <path class="cls-1" d="M283.65,5.84a7.91,7.91,0,0,0,5.84,2.38h28.87a8,8,0,0,0,5.78-2.38A7.81,7.81,0,0,0,326.58,0H281.27A8.08,8.08,0,0,0,283.65,5.84Z"></path>
    <polygon class="cls-1" points="281.27 41.09 289.49 41.09 289.49 24.65 318.36 24.65 318.36 41.09 326.58 41.09 326.58 16.44 281.27 16.44 281.27 41.09"></polygon>
    <path class="cls-1" d="M336.8,8.22h37.09a8,8,0,0,0,5.78-2.38A7.85,7.85,0,0,0,382.11,0H336.8Z"></path>
    <path class="cls-1" d="M346.17,31.72a4.15,4.15,0,0,1-1.15-3V16.44H336.8V32.87a8.07,8.07,0,0,0,2.37,5.84A8,8,0,0,0,345,41.09h28.87a8,8,0,0,0,5.78-2.38,7.85,7.85,0,0,0,2.44-5.84h-33A4.14,4.14,0,0,1,346.17,31.72Z"></path>
    <path class="cls-1" d="M401.54,8.22h28.87a8,8,0,0,0,5.78-2.38A7.81,7.81,0,0,0,438.63,0H393.32a8,8,0,0,0,2.38,5.84A7.91,7.91,0,0,0,401.54,8.22Z"></path>
    <path class="cls-1" d="M395.7,22.28a7.94,7.94,0,0,0,5.84,2.37h28.87a8,8,0,0,0,5.78-2.37,7.83,7.83,0,0,0,2.44-5.84H393.32A8.07,8.07,0,0,0,395.7,22.28Z"></path>
    <path class="cls-1" d="M395.7,38.71a7.91,7.91,0,0,0,5.84,2.38h28.87a8,8,0,0,0,5.78-2.38,7.81,7.81,0,0,0,2.44-5.84H393.32A8,8,0,0,0,395.7,38.71Z"></path>
    <path class="cls-1" d="M37.09,0H0A8,8,0,0,0,2.38,5.84,7.91,7.91,0,0,0,8.22,8.22H33a4,4,0,0,1,4.11,4.1V28.76A4,4,0,0,1,33,32.87H8.22V16.44H0V41.09H37.09a8,8,0,0,0,5.78-2.38,7.85,7.85,0,0,0,2.44-5.84V8.22a7.85,7.85,0,0,0-2.44-5.84A8,8,0,0,0,37.09,0Z"></path>
    <path class="cls-1" d="M119.27,0a7.85,7.85,0,0,0-5.85,2.44,8,8,0,0,0-2.37,5.78V30.65l8.22-9.5Z"></path>
    <polygon class="cls-1" points="111.54 41.09 114.26 41.09 122.99 41.09 158.41 0 147.18 0 111.54 41.09"></polygon>
  </g>
</g>
    </svg>
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
