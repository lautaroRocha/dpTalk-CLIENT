import React, {forwardRef, useRef} from 'react';
import './picturemodal.css'


const PictureModal = forwardRef((props, ref) => {
    const imagen = useRef()
    return (
        <div className="modal-back"  ref={ref}>
            <div className="update-modal profile">
                <form>
                        <span>Elegí un archivo</span>
                        <input type="file" ref={imagen}/>  
                        <button onClick={(e)=>{props.uploadToStorage(e, props.storageRef, imagen.current.files[0])}}>subir</button> 
                </form> 
            </div>
        </div>
    );
})

export default PictureModal;
