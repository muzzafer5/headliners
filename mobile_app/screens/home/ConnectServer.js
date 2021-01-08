
export const fetch_profile = detail => {
    return fetch("https://headlinerss.herokuapp.com/api/v1/user/profile", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': detail.token
        }
    }).then(response => response.json()).then(data=>{
        return data
    })
    .catch(err => {
        return { error: "error" }
    })
}
