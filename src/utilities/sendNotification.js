import * as URL from "./ApiUrls"

export const sendNotification = (body, token) => {
    fetch(URL.notifications, {
    method : 'POST',
    headers : {
        "Content-Type": "application/json",
        "x-access" : token
    },
    body : JSON.stringify(body)
    })
        .then( (res) => {
            if(!res.ok){
                console.log('error')
            }else{
                console.log('yes')
            }
        })
}