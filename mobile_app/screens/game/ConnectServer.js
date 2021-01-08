
export const fetch_news = detail => {
    return fetch("https://headlinerss.herokuapp.com/api/v1/news/fetch", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': detail.token
        },
        body: JSON.stringify(detail)
    }).then(response => response.json()).then(data=>{
        return data
    })
    .catch(err => {
        return { error: "error" }
    })
}

export const save_game = detail => {
    return fetch("https://headlinerss.herokuapp.com/api/v1/game/create", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': detail.token
        },
        body: JSON.stringify(detail)
    }).then(response => response.json()).then(data => {
        return data
    })
        .catch(err => {
            return { error: "error" }
        })
}
