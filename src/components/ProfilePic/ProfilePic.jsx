import React from 'react';
import "../UserProfile/userprofile.css"

const ProfilePic = (props) => {
    return (
        <>
        {
        <img className='profile-picture' src={props.url} />}
        </>
    );
}

export default ProfilePic;
