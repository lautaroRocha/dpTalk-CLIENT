import React, {useContext, useState, useEffect, useRef} from 'react';
import "./userprofile.css"
import UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import { Link } from 'react-router-dom';

import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";


const UserProfile = (props) => {

    const [questionsByUser, setQuestionsByUser] = useState([])
    const [answersByUser, setAnswersByUser] = useState([])

    const user = useContext(UserContext)
    const token = useContext(TokenContext)

    const storage = getStorage();
    const storageRef = ref(storage, `${user.username}-profilepic`);


    const imagen = useRef()

    async function uploadToStorage(e, ref, file){
        e.preventDefault()
        await uploadBytes(ref, file).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        getURL(ref)
    }
   
  function getURL(ref){
      getDownloadURL(ref)
        .then((url) => {
          console.log(url) //url de la imagen de perfil
        })
        .catch((error) => {
          console.log(error)
      });
    }


    useEffect( () => {
        if(user){
            const answersUrl = `http://localhost:7000/reply/by/${user.username}`
            const questionsUrl = `http://localhost:7000/ask/by/${user.username}`
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
                    <span className="profile-picture"> </span>  
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
