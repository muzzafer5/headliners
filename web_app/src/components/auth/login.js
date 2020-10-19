import React, { Component } from 'react'
import { login } from './ConnectServer'
import { Link } from 'react-router-dom'
import auth from '../../static/news2.jpg' 

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }

    login(user).then(res => {
      if (res) {
        localStorage.setItem('usertoken', res)
        this.props.history.push('/home')
      }
    })
  }

  render() {
    var sectionStyle = {
      width: "100%",
      height: "750px",
      backgroundImage: "url(" + auth + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      opacity: "1"
    };

    return (
      <div style = {sectionStyle}>
      <div className="login "
        style={{
          border: "2px solid grey",
          position: "absolute",
          top: "25%",
          width: "36%",
          left: "32%",
          borderRadius: "20px",
          backgroundColor : "white"
        }}>
        <form validate="true" onSubmit={this.onSubmit}>
          <h1 className="h2 text-center py-2" style={{ borderBottom: "1px solid grey" }}>Login</h1>
          <div className="form-group my-3 mx-3">
            <label htmlFor="email">User name</label>
            <input
              type="text"
              className="form-control"
              name="username"
              placeholder="Enter the user name"
              required
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group my-3 mx-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Password"
              required
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>

          <div className="my-3">
            <button
              type="submit"
              className="btn btn-primary ml-3 mr-5   px-5"
            >
              Login
              </button>
            <Link to={'/auth/signup'} >Don't have an account?</Link>
          </div>
        </form>
      </div>
      </div>
    )
  }
}

export default Login