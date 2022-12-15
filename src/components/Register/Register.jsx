import React from 'react';
import Background from '../animatedCanvas/animatedCanvas';
import './register.css'
import DPLogo from '../DPLogo/DPLogo';

const Register = () => {
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
                <input type="text" name="username"/>
            </label>
            <label htmlFor="email">
                <span>
                email:
                </span>
                <input type="email" name='email' />
            </label>
            <label htmlFor="password">
                <span>
                contraseña:
                </span>
                <input type="password" name='password' />
            </label>
            <button>ingresá</button>

        </form>
    </div>
    );
}

export default Register;
