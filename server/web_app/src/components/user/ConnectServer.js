import axios from 'axios'

export const fetch_profile = () => {

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'AUTHORIZATION': localStorage.usertoken
    }
  }
  return axios
    .get('/api/v1/user/profile', axiosConfig)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
} 


export const fetch_played_games = () => {

  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'AUTHORIZATION': localStorage.usertoken
    }
  }
  return axios
    .get('/api/v1/user/games', axiosConfig)
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
} 
