import React, {useRef} from 'react';
import "./header.css"
import Background from '../animatedCanvas/animatedCanvas';
import DPLogo from '../DPLogo/DPLogo';

const Header = () => {

    const canvas = useRef();
    const logo = useRef();
    const talk = useRef()


    function handleScroll(){
        if (document.documentElement.scrollTop > 50) {
            canvas.current.style.height = "10vh";
            logo.current.style.width = "40%"
            talk.current.style.left = "0%"
            talk.current.style.top = "3vh"
            talk.current.style.transform = "scale(.6)"
            talk.current.style.fontSize = 'clamp(.7rem, 10vw, 1rem)';
        } else {
            canvas.current.style.height = "15vh";
            logo.current.style.width = "100%"
            talk.current.style.left = "60%"
            talk.current.style.top = "7vh"
            talk.current.style.transform = "scale(1) skewX(-15deg)";
            talk.current.style.fontSize = 'clamp(1.5rem, 20vw, 2rem)';

        }
    }

    window.onscroll = () =>{
        handleScroll()
    }

    return (
        <header ref={canvas}>
                <Background />
                <div ref={logo}>
                    <DPLogo />
                </div>
                    <span ref={talk}>TALK</span>
            </header>
    );
}

export default Header;
