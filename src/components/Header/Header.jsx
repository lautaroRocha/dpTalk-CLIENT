import React, {useRef, useEffect} from 'react';
import "./header.css"
import Background from '../animatedCanvas/animatedCanvas';
import DPLogo from '../DPLogo/DPLogo';
import Navbar from '../Navbar/Navbar';
import { useLocation } from 'react-router-dom';

const Header = (props) => {

    const header = useRef()
    const canvas = useRef();
    const logo = useRef();
    const talk = useRef()
    const nav = useRef()

    const location = window.location.pathname
    const navigated = useLocation()

    useEffect(() => {
        if(location === "/login" || location === "/register" ){
            header.current.style.display = "none"
        }else{
            header.current.style.display = "flex"
        }
    }, [navigated]);


    function handleScroll(){
        if(window.innerWidth < 900){
        if (document.documentElement.scrollTop > 50) {
            canvas.current.style.height = "10vh";
            logo.current.style.width = "40%"
            talk.current.style.left = "0%"
            talk.current.style.top = "3vh"
            talk.current.style.transform = "scale(.6)"
            talk.current.style.fontSize = 'clamp(.7rem, 10vw, 1rem)';
            nav.current.style.marginTop="10vh"
        } else {
            canvas.current.style.height = "15vh";
            logo.current.style.width = "100%"
            talk.current.style.left = "60%"
            talk.current.style.top = "7vh"
            talk.current.style.transform = "scale(1) skewX(-15deg)";
            talk.current.style.fontSize = 'clamp(1.5rem, 20vw, 2rem)';
            nav.current.style.marginTop="15vh"
        }
        }else{
            if (document.documentElement.scrollTop > 50) {
                canvas.current.style.height = "5rem";
                logo.current.style.width = "50%"
                talk.current.style.left = "10%"
                talk.current.style.top = "3vh"
                talk.current.style.transform = "scale(.6)"
                talk.current.style.fontSize = 'clamp(.7rem, 10vw, 1rem)';
                nav.current.style.marginTop="5rem"
            } else {
                canvas.current.style.height = "10rem";
                logo.current.style.width = "100%"
                talk.current.style.left = "60%"
                talk.current.style.top = "5rem"
                talk.current.style.transform = "scale(1) skewX(-15deg)";
                talk.current.style.fontSize = 'clamp(1.5rem, 20vw, 2rem)';
                nav.current.style.marginTop="12rem"
            }
        }
    }

    window.onscroll = () =>{
        handleScroll()
    }

    return (
        <div ref={header} className="header-wrapper">
        <header ref={canvas}>
                <Background />
                <div ref={logo}>
                    <DPLogo />
                </div>
                    <span ref={talk}>TALK</span>
            </header>
            <Navbar ref={nav} filterQuestions={props.filterQuestions} logOut={props.logOut}/>
        </div>

    );
}

export default Header;
