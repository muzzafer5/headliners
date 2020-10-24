import React, { Component } from 'react'
import { login } from './ConnectServer'
import { Link } from 'react-router-dom'

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
    return (
      <div className="card py-5" style={{ fontFamily: "Lato" }}>
        <div className="shadow-lg signup card-body col-lg-5 col-sm-7 col-md-6 col-10 mx-auto">
          <h1 className="card-title text-center my-3">Login</h1>
          <form validate="true" onSubmit={this.onSubmit}>
            <div className="form-group my-3 mx-3">
              <label htmlFor="email">Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
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
            <div className="my-3 mx-3">
              <button type="submit" className="btn btn-primary px-5">Login</button>
            </div>
            <div className="my-3 mx-3">
              <Link to={'/auth/signup'} >Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login