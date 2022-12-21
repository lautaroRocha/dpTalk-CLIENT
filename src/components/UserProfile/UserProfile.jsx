import React, {useContext, useState, useEffect, useRef} from 'react';
import "./userprofile.css"
import UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic/ProfilePic';

import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";


const UserProfile = () => {

    const [questionsByUser, setQuestionsByUser] = useState([])
    const [answersByUser, setAnswersByUser] = useState([])
    const [profilePicUrl, setProfilePicUrl] = useState()

    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const storage = getStorage();

    const storageRef = user && ref(storage, `${user.username}-profilepic`);


    const imagen = useRef()

    async function uploadToStorage(e, ref, file){
        e.preventDefault()
        await uploadBytes(ref, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        saveURL(ref)
    }
   
  function saveURL(ref){
      getDownloadURL(ref)
        .then((url) => {
          setProfilePicUrl(url);
          fetch("http://localhost:7000/users/profile-pic", {
            method : "PATCH",
            body : JSON.stringify({
              "username" : user.username,
                "picture" : url
            }),
            headers : {
              "Content-Type" : "application/json"
            }})
        })
        .catch((error) => {
          console.log(error)
      });
    }


    useEffect( () => {
        if(user){
            const answersUrl = `http://localhost:7000/reply/by/${user.username}`
            const questionsUrl = `http://localhost:7000/ask/by/${user.username}`
            setProfilePicUrl(user.profilePic)
        fetch(answersUrl, {headers: { 
            "x-access" : token
        }})
        .then(res => res.json())
        .then(data => {
          if(data.message){
            console.log(data.message)
          }else{
            setAnswersByUser(Array.from(data))
          }})
        .catch(error => console.log(error))
        

        fetch(questionsUrl, {headers: { 
            "x-access" : token
        }})
        .then(res => res.json())
        .then(data => {
          if(data.message){
            console.log(data.message)
          }else{
            setQuestionsByUser(Array.from(data))
          }})
        .catch(error => console.log(error))
        }
    
    }, [user])

    return (
        <div className='profile'>
            <form action="">
            <input type="file" ref={imagen}/>  
            <button type="submit" onClick={(e)=>{uploadToStorage(e, storageRef, imagen.current.files[0])}}>subir</button> 
            </form>

            {user &&
            <div className="profile-card">
                <div className="profile-head">
                  <ProfilePic url={profilePicUrl} />
                    <div>
                        <h2>{user.username}</h2>
                        <span>{user.email}</span>
                    </div>   
                </div>
                <div className="profile-body">
                    <div className="questions">
                        <h3>
                    Hiciste  
                    <span> {questionsByUser.length}</span> preguntas</h3>
                        <div>
                        {questionsByUser.map((qstn, idx) => {return(<Link key={idx} to={`../question/${qstn._id}`}>{qstn.title}</Link>)})}
                        </div>
                    </div>
                    <div className="answers">
                    <h3>
                    Subiste  
                    <span> {answersByUser.length}</span> respuestas</h3>
                        <div>
                        {answersByUser.map((answ, idx) => {return(<Link key={idx} to={`../question/${answ.question}`}>{answ.body}</Link>)})}
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default UserProfile;
