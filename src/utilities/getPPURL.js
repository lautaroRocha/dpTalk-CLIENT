import { getStorage, ref, getDownloadURL  } from "firebase/storage";

function getProfilePictureURL(reference, setter){
    if(reference){
      const storage = getStorage();
      const storageRef = ref(storage, `${reference}-profilepic`);
      const defaultRef = ref(storage, `DEFAULT-profilePic.jfif`);

      getDownloadURL(storageRef)
      .then((res)=>{{
            setter(res);
            sessionStorage.setItem(`ProPic-${reference}`, res)
          }
      }).catch(error => {
        if(error.message.includes('/object-not-found')){
          getDownloadURL(defaultRef)
          .then((res)=>{
            if(res.error){
              console.log('chanfles')
            }else{
              setter(res);
              sessionStorage.setItem(`ProPic-${reference}`, res)
            }
          
        })
        
        }
      })
    }
  }

export default getProfilePictureURL;
    

  