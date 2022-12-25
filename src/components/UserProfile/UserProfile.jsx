import React, {useContext, useState, useEffect, useRef} from 'react';
import "./userprofile.css"
import UserContext from '../../Context/UserContext';
import TokenContext from '../../Context/TokenContext';
import { Link } from 'react-router-dom';
import ProfilePic from '../ProfilePic/ProfilePic';
import PictureModal from '../PictureModal/PictureModal';
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";
import imageCompression from 'browser-image-compression';

const UserProfile = (props) => {

    const [questionsByUser, setQuestionsByUser] = useState([])
    const [answersByUser, setAnswersByUser] = useState([])
    const [profilePicUrl, setProfilePicUrl] = useState()

    const user = useContext(UserContext)
    const token = useContext(TokenContext)
    const storage = getStorage();

    const storageRef = user && ref(storage, `${user.username}-profilepic`);

    const modal = useRef()

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
      convertSize: 500,
      convertTypes: ['image/png', 'image/webp', 'image/jpg']
    }

    async function uploadToStorage(e, ref, file){
        e.preventDefault()
        const compressedFile = await imageCompression(file, options);
        await uploadBytes(ref, compressedFile).then((snapshot) => {
            console.log('Uploaded a blob or file!');
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
      props.updateUser()
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
      <>
           <PictureModal uploadToStorage={uploadToStorage} storageRef={storageRef} ref={modal}/>
        <div className='profile'>
            {user &&
            <div className="profile-card">
                <div className="profile-head">
                    <ProfilePic url={profilePicUrl} openModal={openModal}/>
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
        </>
    );
}

export default UserProfile;
