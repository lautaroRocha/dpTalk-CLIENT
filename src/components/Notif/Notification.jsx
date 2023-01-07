import "../NotificationsPanel/notifications.css"

export const Notification = (props) => {

    const dates = props.noti.at.split(',')

    const currentDate = new Date().toLocaleDateString()

    const dateToShow = dates[0] === currentDate ? dates[1].slice(0, 5) : dates[0]


    return(
    <div className="notifications">
        <span>
            {props.noti.notification}
        </span>
        <span>
            {dateToShow}                
        </span>
    </div>
    )
}

