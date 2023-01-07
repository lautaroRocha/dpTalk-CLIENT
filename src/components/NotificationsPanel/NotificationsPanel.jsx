import { useState } from 'react'
import * as Icons from "../../utilities/svgIcons"
import './notifications.css'
import { Notification } from '../../components'

export const NotificationsPanel= (props) => {

    const [isOpen, setIsOpen] = useState(false)

    function openOrClose(){
        setIsOpen(!isOpen)
    }




    return(
    <>
    <div className="notif">
        <button className="notif-button" onClick={openOrClose}>{Icons.bell}</button>
    </div>
    {isOpen && 
    <>
    <div className="notif notif-panel">
        <div>
        {props.notifications && props.notifications.map((noti, idx)=>{return(
            <Notification noti={noti} key={idx}/>
        )})}
        </div>
    </div>
    <div className="notif-panel-overlay"></div>
    </>}
    </>
    )
}