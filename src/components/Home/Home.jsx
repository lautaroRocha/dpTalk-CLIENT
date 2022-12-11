import React from 'react';
import { Navigate } from "react-router-dom";

const Home = (props) => {
    
    if(!props.isLogged){
        return(<Navigate to="/login" replace={true}  />)
    }else{
        return(
            <div>
                HOME
            </div>
        )
    }
    ;
}

export default Home;
