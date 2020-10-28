import axios from 'axios'

export const fetch_users = () => {

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': localStorage.admintoken
        }
    }

    return axios
        .get('/admin/fetch/user',axiosConfig)
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
        .post('/admin/login', postData)
        .then(response => {
            return response.data
        })
        .catch(err => {
            console.log(err)
            alert("Wrong key, you will be blocked if number of attemps reached max limit")
        })
} 