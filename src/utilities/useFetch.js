
async function useFetch(url, method, body, token){

    let valueToReturn

    switch(method){
        case "POST":
            await fetch(url, {
                method : method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access' : token
                  },
                body : JSON.stringify(body)
            })
            .then((response) => response.json())
                .then((data) => {
                    valueToReturn = data;
                })
                .catch((error) => {
                console.log(error)
                })
        break;
        case "GET":
            await fetch(url)
            .then((response) => response.json())
                .then((data) => {
                    valueToReturn = data;
                })
                .catch((error) => {
                console.log(error)
                })
            break;
    }

    return valueToReturn
}

export default useFetch;