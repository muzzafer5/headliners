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
    .post('/api/news/fetch', postData, axiosConfig)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
} 