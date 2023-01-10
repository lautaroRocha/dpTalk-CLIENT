import "../NotificationsPanel/notifications.css"
import { Link } from "react-router-dom"
import {useEffect} from "react"

export const Notification = (props) => {

    const dates = props.noti && props.noti.at.split(',')

    const currentDate = new Date().toLocaleDateString()

    const dateToShow = dates[0] === currentDate ? dates[1].slice(0, 5) : dates[0]

    let className = "notifications";

    if(props.noti.read){
        className = "notifications read"
    }


    return(
    <Link className={className} to={props.noti.href}>
        <span>
            {props.noti.notification}
        </span>
        <span>
            {dateToShow}                
        </span>
    </Link>
    )
}

