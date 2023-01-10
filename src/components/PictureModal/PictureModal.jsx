import React, {forwardRef, useRef} from 'react';
import './picturemodal.css'


export const PictureModal = forwardRef((props, ref) => {
    const imagen = useRef()
    const imagePreview = useRef()

    function getImgData() {
        const files = imagen.current.files[0];
        if (files) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(files);
          fileReader.addEventListener("load", function () {
            imagePreview.current.style.display = "block";
            imagePreview.current.innerHTML = '<img src="' + this.result + '" />';
          });    
        }
      }

    return (
        <div className="modal-back"  ref={ref}>
            <div className="update-modal profile">
                <form>
                        <span>Elegí un archivo</span>
                        <input type="file" ref={imagen} accept="image/*" onChange={getImgData}/>  
                        <div className="img-preview" ref={imagePreview} />
                        <div className="form-actions">
                        <button onClick={(e)=>{props.uploadToStorage(e, props.storageRef, imagen.current.files[0])}}>subir</button> 
                        <button data-cancel onClick={(e) =>{props.closeModal(e, imagen, imagePreview)}}>Cancelar</button>
                        </div>
                </form> 
            </div>
        </div>
    );
})

