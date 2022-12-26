import React from 'react';
import "../UserProfile/userprofile.css"
import * as Icons from "../../utilities/svgIcons"


const ProfilePic = (props) => {
    return (
        <div className='profile-picture'>
        <img  src={props.url} />
        {props.ownProfile &&
        <button onClick={(e)=>{props.openModal(e)}}>{Icons.camera}</button>}
        </div>
    );
}

export default ProfilePic;
