import React, {useRef, forwardRef, useEffect, useContext} from 'react';
import './navbar.css'
import * as Icons from "../../utilities/svgIcons"
import {Searchbar} from '../../components';
import {  useLocation, NavLink } from 'react-router-dom';
import UserContext from '../../Context/UserContext';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import Swal from 'sweetalert2'


export const Navbar = forwardRef((props, ref) => {

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

    function askIfSure(){
      Swal.fire({
        title: 'Estás por cerrar sesión',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Cerrar sesión',
        customClass: {
          popup: 'swal-cont',
          icon: 'swal-icon',
          image: 'your-image-class',
          content: 'your-content-class',
          input: 'your-input-class',
          actions: 'swal-action',
          confirmButton: 'your-confirm-button-class',
          cancelButton: 'your-cancel-button-class',
          footer: 'your-footer-class'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          props.logOut()
        }
      })
    }

    useEffect(()=>{
        search.current.style.opacity = 0
    }, [location.pathname])



    return (
        <>
            <nav ref={ref}>
            {user &&
            <ul>
                <li id="Feed"><NavLink to="/" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            } >{Icons.home}</NavLink>
               
                </li>
                <li id="Perfil"><NavLink to={`/user/${user.username}`} style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>{Icons.user}</NavLink>
                </li>
                <li onClick={showOrHideSearchBar} id="Buscar"><NavLink>{Icons.search}</NavLink>
                </li>
                <li onClick={askIfSure} id="Salir"><NavLink>{Icons.logOut}</NavLink>
                </li>
                <>
                  <Tooltip className="tooltip" anchorId="Feed" content="Feed" place="right" variant='info'/>
                  <Tooltip className="tooltip" anchorId="Perfil" content="Perfil" place="right" variant='info'/>
                  <Tooltip className="tooltip" anchorId="Buscar" content="Buscar" place="right" variant='info'/>
                  <Tooltip className="tooltip" anchorId="Salir" content="Salir" place="right" variant='warning'/>
                </>
            </ul>
            }
            </nav>
            <Searchbar ref={search} filterQuestions={props.filterQuestions}/>
        </>
    )
  });
