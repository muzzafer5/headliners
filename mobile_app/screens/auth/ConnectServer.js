
export const login = user => {
    return fetch("https://headlinerss.herokuapp.com/api/v1/auth/login", {
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

export const signup = newUser => {
    return fetch("https://headlinerss.herokuapp.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(response => response.json()).then(data => {
        return data
    })
        .catch(err => {
            return { error: "error" }
        })

}
