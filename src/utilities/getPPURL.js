import { getStorage, ref, getDownloadURL  } from "firebase/storage";

function getProfilePictureURL(reference, setter){
    if(reference){
      const storage = getStorage();
      const storageRef = ref(storage, `${reference}-profilepic`);
      getDownloadURL(storageRef)
      .then((url) => {
        setter(url);
        sessionStorage.setItem(`ProPic-${reference}`, url)
      })
      .catch((error) => console.log(error))
    }
}

export default getProfilePictureURL;
    

  