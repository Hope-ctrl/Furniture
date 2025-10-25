export const Api = async (data = null, directory, token = null) => {

    const options = {
        method: 'POST',
        headers: {'Content-Type' : 'application/json',
            ...(token && {'authorization' : `Bearer ${token}`})
        },
    }
    if(data){
        options.body = JSON.stringify(data)
    }
    const response = await fetch(`http://localhost:8080/${directory}`,options);
    return response.json()
} 