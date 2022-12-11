
function useFetch(url, method, body){

    switch(method){
        case "POST":
            fetch(url, {
                method : method,
                headers: {
                    'Content-Type': 'application/json',
                  },
                body : JSON.stringify(body)
            })
            .then((response) => response.json())
                .then((data) => {
                console.log(data);
                })
                .catch((error) => {
                console.log(error)
                })
        break;
        case "GET":
            fetch(url)
            .then((response) => response.json())
                .then((data) => {
                console.log(data);
                })
                .catch((error) => {
                console.log(error)
                })
            break;
    }

}

export default useFetch;