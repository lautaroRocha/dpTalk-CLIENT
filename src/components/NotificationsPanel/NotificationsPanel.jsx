import { useState } from 'react'
import './notifications.css'

export const NotificationsPanel= (props) => {

    const [isOpen, setIsOpen] = useState(false)

    function openOrClose(){
        setIsOpen(!isOpen)
    }

    return(
    <>
    <div className="notif notif-button">
        <button onClick={openOrClose}>Abrir</button>
    </div>
    {isOpen && 
    <div className="notif notif-panel">
        <button onClick={openOrClose}>Cerrar</button>
    </div>}
    </>
    )
}