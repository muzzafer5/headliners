import axios from 'axios'

export const fetch_users = () => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': localStorage.admintoken
        }
    }

    return axios
        .get('/api/v1/admin/fetch/user',axiosConfig)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
} 

export const admin_login = details =>{
    var postData = details

    return axios
        .post('/api/v1/admin/login', postData)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            alert("Wrong key, you will be blocked if number of attemps reached max limit")
        })
} 

export const fetch_games = () => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': localStorage.admintoken
        }
    }

    return axios
        .get('/api/v1/admin/fetch/game', axiosConfig)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
} 

export const fetch_games_detailed = (details) => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': localStorage.admintoken
        }
    }

    return axios
        .get('/api/v1/admin/fetch/game/detailed/' + (details.skip) + '/' + details.limit, axiosConfig)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
} 

export const fetch_news = () => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': localStorage.admintoken
        }
    }

    return axios
        .get('/api/v1/admin/fetch/news', axiosConfig)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
} 

export const fetch_news_detailed = (details) => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': localStorage.admintoken
        }
    }

    return axios
        .get('/api/v1/admin/fetch/news/detailed/' + (details.skip) + '/' + details.limit, axiosConfig)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
        })
} 