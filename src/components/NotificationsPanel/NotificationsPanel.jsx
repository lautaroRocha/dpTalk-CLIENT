import { useState, useContext, useEffect } from 'react'
import * as Icons from "../../utilities/svgIcons"
import * as URL from "../../utilities/ApiUrls"
import './notifications.css'
import UserContext from "../../Context/UserContext"
import { Notification } from '../../components'
import { useFetchNotifs } from '../../utilities/fetchNotifs'

export const NotificationsPanel= (props) => {


    const [isOpen, setIsOpen] = useState(false)
    const [isRead, setIsRead] = useState(true)
    
    const user = useContext(UserContext)

    let notifications = useFetchNotifs()

    const somethingIsUnread = notifications.find(noti => noti.read === false)

    function openOrClose(){
        setIsOpen(!isOpen)
    }

    function handleRead(e){
        e.preventDefault();
        openOrClose()
        setIsRead(true)
        fetch(URL.notifications + user.username, {method : 'PATCH'})
    }
    

    useEffect(()=>{
        if(isRead){
            if(somethingIsUnread){
                setIsRead(false)
            }
        }
    }, [notifications, props.alertNotif])

    

    {console.log('render de notif')}
    return(
    <>
    <div className="notif">
        <button className="notif-button" onClick={handleRead}>
        {props.notifications !== [] && !isRead && <span className="notif-alert"/>}
            {Icons.bell}</button>
    </div>
    {isOpen && 
    <>
    <div className="notif notif-panel">
        <div>
        {notifications.map((noti, idx)=>{return(
            <Notification noti={noti} key={idx}/>
        )})}
        </div>
    </div>
    <div className="notif-panel-overlay" onClick={()=>{setIsOpen(false)}}></div>
    </>}
    </>
    )
}