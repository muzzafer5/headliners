
export const login = user => {
    return fetch("https://iitj-app.herokuapp.com/auths/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then(response => response.json()).then(data=>{
            return data
        })
        .catch(err => {
            return { error : "error" }
        })

}
