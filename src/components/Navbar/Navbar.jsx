import React, {useRef, forwardRef} from 'react';
import './navbar.css'
import * as Icons from "../../utilities/svgIcons"
import Searchbar from '../SearchBar/Searchbar';
import { useNavigate } from 'react-router-dom';


const Navbar = forwardRef((props, ref) => {

    const navigate = useNavigate()
    const search = useRef()

    function showOrHideSearchBar(){
        search.current.style.opacity == 0 ?  search.current.style.opacity = 1 :  search.current.style.opacity = 0;
    }
    function goHome(){
        navigate('/')
    }

    return (
        <>
            <nav ref={ref}>
            <ul>
                <li>{Icons.user}</li>
                <li onClick={showOrHideSearchBar}>{Icons.search}</li>
                <li>{Icons.ask}</li>
                <li onClick={goHome}>{Icons.home}</li>
            </ul>
            </nav>
            <Searchbar ref={search}/>
        </>
    )
  });

  export default Navbar;