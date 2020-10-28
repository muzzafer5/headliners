import axios from 'axios'

export const signup = newUser => {
  var postData = newUser
  return axios
    .post('/api/auth/signup/', postData)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        alert("Username already exist")
      })
} 

export const login = user => {
  var postData = user
  return axios
    .post('/api/auth/login', postData)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log(err)
        alert("Invalid username or password")
      })
}
