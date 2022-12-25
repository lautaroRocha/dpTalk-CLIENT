import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import "./minquestion.css"
import getProfilePicture from '../../utilities/getPPURL';


const MinQuestions = (props) => {

    const [profilePictureUrl, setProfilePicUrl] = useState(null)

    const cachedURL = sessionStorage.getItem(`ProPic-${props.question._id}`)

    if(cachedURL && !profilePictureUrl){
        setProfilePicUrl(cachedURL)
    }else{
        getProfilePicture(props.question.author, setProfilePicUrl)
        sessionStorage.setItem(`ProPic-${props.question._id}`, profilePictureUrl )
    }
    
    

    return (
        <Link className='min-question'  to={`question/${props.question._id}`} >
            <div className='min-question-author'>
                <img className='min-question-author-img' src={`${profilePictureUrl}` }/>
                <span className='min-queston-author-name'>{props.question.author}</span>
            </div>
            <div className='min-question-text'>
                <span className='min-question-status'>{!props.question.status ? <></> : "CONTESTADA"}</span>
                <h2>{props.question.title}</h2>
                <p>{props.question.body.slice(0, 70)}</p>
            </div>
        </Link>
    );
}

export default MinQuestions;
