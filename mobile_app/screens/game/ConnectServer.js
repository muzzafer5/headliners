
export const fetch_news = detail => {
    return fetch("https://iitj-app.herokuapp.com/news/fetch", {
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
