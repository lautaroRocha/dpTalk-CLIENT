import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import Spinner from '../Spinner/Spinner'
import "./minquestion.css"
import getProfilePicture from '../../utilities/getPPURL';


const MinQuestions = (props) => {

    const [profilePictureUrl, setProfilePicUrl] = useState()

    const cachedURL = sessionStorage.getItem(`ProPic-${props.question._id}`)

    useEffect(()=>{
        if(cachedURL && !profilePictureUrl){
            setProfilePicUrl(cachedURL)
        }else{
            getProfilePicture(props.question.author, setProfilePicUrl)
            sessionStorage.setItem(`ProPic-${props.question._id}`, profilePictureUrl )
        }
    },[])
   
    
    

    return (
        <Link className='min-question'  to={`question/${props.question._id}`} >
            <div className='min-question-author'>
                {!profilePictureUrl ?
                <Spinner className='min-question-author-img' /> : 
                <img className='min-question-author-img' src={`${profilePictureUrl}` }/>
                }
                <span className='min-queston-author-name'>{props.question.author}</span>
            </div>
                <span className='min-question-status'>{!props.question.status ? <></> : "CONTESTADA"}</span>
            <div className='min-question-text'>
                <h2>{props.question.title}</h2>
                <p>{props.question.body.slice(0, 70)}</p>
            </div>
        </Link>
    );
}

export default MinQuestions;
