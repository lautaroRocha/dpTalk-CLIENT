import { useState, useContext, useEffect } from 'react'
import * as Icons from "../../utilities/svgIcons"
import * as URL from "../../utilities/ApiUrls"
import './notifications.css'
import UserContext from "../../Context/UserContext"
import TokenContext from '../../Context/TokenContext'
import { Notification } from '../../components'

export const NotificationsPanel= (props) => {


    const [isOpen, setIsOpen] = useState(false)
    const [isRead, setIsRead] = useState(true)
    const [notifications, setNotifications] = useState([])

    const token = useContext(TokenContext)
    const user = useContext(UserContext)

    useEffect(()=>{
        user &&  fetch(URL.notifications + user.username, {headers: {'x-access' : token}})
        .then(res => res.json())
        .then(data => setNotifications(data.notifications.reverse()))
    }, [user, props.alert])



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


    return(
    <>
    <div className="notif">
        <button className="notif-button" onClick={handleRead}>
        {notifications !== [] && !isRead && <span className="notif-alert"/>}
            {Icons.bell}</button>
    </div>
    {isOpen && 
    <>
    <div className="notif notif-panel">
        <h2>Notificaciones</h2>
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