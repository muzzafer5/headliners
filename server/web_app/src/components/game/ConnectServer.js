import axios from 'axios'

export const fetch_news = details => {

  var postData = details

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'AUTHORIZATION': localStorage.usertoken
    }
  }
  return axios
    .post('/api/v1/news/fetch', postData, axiosConfig)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
} 

export const save_game = details => {

  var postData = details

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'AUTHORIZATION': localStorage.usertoken
    }
  }
  return axios
    .post('/api/v1/game/create', postData, axiosConfig)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
} 