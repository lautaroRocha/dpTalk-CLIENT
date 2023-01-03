import React from 'react';
import "../UserProfile/userprofile.css"
import * as Icons from "../../utilities/svgIcons"
import Spinner from '../Spinner/Spinner';


const ProfilePic = (props) => {
    return (
        <>
        {!props.url ? 
            <Spinner /> :
        <div className='profile-picture'>
        <img  src={props.url} />
        {props.ownProfile &&
        <button onClick={(e)=>{props.openModal(e)}}>{Icons.camera}</button>}
        </div>
        }
        </>
    );
}

export default ProfilePic;
