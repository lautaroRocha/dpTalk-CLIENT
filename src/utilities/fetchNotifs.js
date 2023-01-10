import {useState, useEffect, useContext} from 'react'
import * as URL from "./ApiUrls"
import UserContext from '../Context/UserContext'
import TokenContext from '../Context/TokenContext'


export const useFetchNotifs = () => {

    const [notifications, setNotifications] = useState([])

    const user = useContext(UserContext)
    const token = useContext(TokenContext)

    useEffect( ()=>{
        user &&  fetch(URL.notifications + user.username, {headers: {'x-access' : token}})
            .then(res => res.json())
            .then(data => setNotifications(data.notifications.reverse()))
      }, [user])

    return notifications
}