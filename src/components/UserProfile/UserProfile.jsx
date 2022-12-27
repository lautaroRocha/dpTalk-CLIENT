import React, {useContext, useState, useEffect, useRef} from 'react';
import "./userprofile.css"
import UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProfilePic from '../ProfilePic/ProfilePic';
import PictureModal from '../PictureModal/PictureModal';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import imageCompression from 'browser-image-compression';
import { useParams } from 'react-router-dom';

const UserProfile = (props) => {

    const [questionsByUser, setQuestionsByUser] = useState([])
    const [answersByUser, setAnswersByUser] = useState([])
    const [userData, setUserData] = useState({username:"", email:"", profilePic: ""})
    const [ownProfile, setOwnProfile] = useState(false)

    const { username } = useParams()

    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const storage = getStorage();
    const storageRef = user && ref(storage, `${user.username}-profilepic`);
    const modal = useRef()

    useEffect(()=>{
      if(user){
      username === user.username && setOwnProfile(true)
      }
    },[user])
    

    async function uploadToStorage(e, ref, file){
        e.preventDefault()
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 500,
          useWebWorker: true,
          convertSize: 500,
          convertTypes: ['image/png', 'image/webp', 'image/jpg']
        }
        const compressedFile = await imageCompression(file, options);
        await uploadBytes(ref, compressedFile).then((snapshot) => {
            toast.info('Estamos subiendo tu foto...');
        });
        saveURL(ref)
        modal.current.style.opacity = 0
        modal.current.style.zIndex = -10
    }

    function openModal(e){
      e.preventDefault()
      modal.current.style.zIndex = 10
      modal.current.style.opacity = 1
    }
   
  function saveURL(ref){
      getDownloadURL(ref)
        .then((url) => {
          setUserData({
            email: userData.email,
            username: userData.username,
            profilePic: url
          })
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
      props.updateUser()
    }


    useEffect( () => {
        if(user){
            const answersUrl = `http://localhost:7000/reply/by/${username}`
            const questionsUrl = `http://localhost:7000/ask/by/${username}`
            if(ownProfile){
              setUserData({
                username : user.username,
                email : user.email,
                profilePic: user.profilePic
              })
            }else{
              const usersUrl = `http://localhost:7000/users/${username}`
              fetch(usersUrl)
                .then(res => res.json())
                .then(data => setUserData({
                  username : data.username,
                  email : data.email,
                  profilePic: data.profilePic
                }))
              
            }

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
    
    }, [user, ownProfile])


    return (
      <>
           <PictureModal uploadToStorage={uploadToStorage} storageRef={storageRef} ref={modal}/>
        <div className='profile'>
            {user &&
            <div className="profile-card">
                <div className="profile-head">
                    <ProfilePic url={userData.profilePic} openModal={openModal} ownProfile={ownProfile}/>
                    <div>
                        <h2>{userData.username}</h2>
                        <span>{userData.email}</span>
                    </div>   
                </div>
                <div className="profile-body">
                    <div className="questions">
                      {ownProfile ?
                        <h3>
                    Hiciste  
                    <span> {questionsByUser.length} </span>{questionsByUser.length > 1  ? 'preguntas' : 'pregunta'}</h3> :
                    <h3>
                    Hizo  
                    <span> {questionsByUser.length} </span>{questionsByUser.length > 1  ? 'preguntas' : 'pregunta'}</h3>}
                        <div>
                        {questionsByUser.map((qstn, idx) => {return(<Link key={idx} to={`../question/${qstn._id}`}>{qstn.title}</Link>)})}
                        </div>
                    </div>
                    <div className="answers">
                      {ownProfile ?
                      <h3>
                      Subiste  
                      <span> {answersByUser.length} </span>{answersByUser.length > 1  ? 'respuestas' : 'respuesta'}</h3> :
                       <h3>
                       Subió
                       <span> {answersByUser.length} </span>{answersByUser.length > 1  ? 'respuestas' : 'respuesta'}</h3>
                      }
                    
                        <div>
                        {answersByUser.map((answ, idx) => {return(<Link key={idx} to={`../question/${answ.question}`}>{answ.body}</Link>)})}
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
        </>
    );
}

export default UserProfile;