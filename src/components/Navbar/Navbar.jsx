import React, {useRef, forwardRef, useEffect, useContext} from 'react';
import './navbar.css'
import * as Icons from "../../utilities/svgIcons"
import Searchbar from '../SearchBar/Searchbar';
import {  useLocation, NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext';


const Navbar = forwardRef((props, ref) => {

    let activeStyle = {
        "backgroundColor" : "var(--soft-pink)"
      };

    const search = useRef()
    const location = useLocation()
    const user = useContext(UserContext)

    function showOrHideSearchBar(){
      if(location.pathname === "/"){
       search.current.style.opacity == 0 ? search.current.style.opacity = 1 : search.current.style.opacity = 0;
    }
    }


    useEffect(()=>{
        search.current.style.opacity = 0
    }, [location.pathname])



    return (
        <>
            <nav ref={ref}>
            {user &&
            <ul>
                <li><NavLink to="/" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } >{Icons.home}</NavLink></li>
                <li><NavLink to={`/user/${user.username}`} style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>{Icons.user}</NavLink></li>
                <li onClick={showOrHideSearchBar} ><NavLink>{Icons.search}</NavLink></li>
                <li onClick={props.logOut}><NavLink>{Icons.logOut}</NavLink></li>
            </ul>
            }
            </nav>
            <Searchbar ref={search} filterQuestions={props.filterQuestions}/>
        </>
    )
  });

  export default Navbar;