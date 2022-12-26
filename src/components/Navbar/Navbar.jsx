import React, {useRef, forwardRef, useEffect, useContext} from 'react';
import './navbar.css'
import * as Icons from "../../utilities/svgIcons"
import Searchbar from '../SearchBar/Searchbar';
import { useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../../Context/UserContext';


const Navbar = forwardRef((props, ref) => {

    const navigate = useNavigate()
    const search = useRef()
    const location = useLocation()
    const user = useContext(UserContext)

    function showOrHideSearchBar(){
        if(location.pathname === '/'){
        search.current.style.opacity == 0 ?  search.current.style.opacity = 1 :  search.current.style.opacity = 0;}
    }
    function goHome(){
        navigate('/')
    }
    function goProfile(){
        navigate(`/user/${user.username}`)
    }
    useEffect(()=>{
        search.current.style.opacity = 0
    }, [location])

    return (
        <>
            <nav ref={ref}>
            <ul>
                <li onClick={goHome}>{Icons.home}</li>
                <li onClick={goProfile}>{Icons.user}</li>
                <li onClick={showOrHideSearchBar}>{Icons.search}</li>
                <li onClick={props.logOut}>{Icons.logOut}</li>
            </ul>
            </nav>
            <Searchbar ref={search} filterQuestions={props.filterQuestions}/>
        </>
    )
  });

  export default Navbar;