import React, { Component } from 'react'
import {fetch_profile} from './ConnectServer'

class Profile extends Component {

  constructor(){
    super()
    this.state = {
      profile : null,
      errors: {}
    }
  }

  componentDidMount() {
    if (!localStorage.usertoken)
      this.props.history.push(`/auth/login`)
    else{
      fetch_profile().then(res=>{
        if(res){
          this.setState({profile : res})
        }
        else{
          this.props.history.push(`/home`)
        }
      })
    }
  }
  
  render() {
    return (
      <div >
        {this.state.profile ? (
          <div className = "d-flex justify-content-around " style={{ width: "90vw", height: "80vh", margin: "6vh 5vw" }}>
            <div className="card shadow-lg" style={{ width: "50vw", padding: "20px" }}>
              <h3 className="card-title text-center text-underline pb-3" >
                <u> User Profile</u>
              </h3>
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h6 className="mb-0">Username</h6>
                  </div>
                  <div className="col text-secondary">
                    {this.state.profile.username}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <h6 className="mb-0">Profession</h6>
                  </div>
                  <div className="col text-secondary">
                    {this.state.profile.profession}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <h6 className="mb-0">Language</h6>
                  </div>
                  <div className="col text-secondary">
                    {this.state.profile.language}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <h6 className="mb-0">Gender</h6>
                  </div>
                  <div className="col text-secondary">
                    {this.state.profile.gender}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <h6 className="mb-0">Age</h6>
                  </div>
                  <div className="col text-secondary">
                    {this.state.profile.age}
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col">
                    <h6 className="mb-0">Country</h6>
                  </div>
                  <div className="col text-secondary">
                    {this.state.profile.country}
                  </div>
                </div>
                <hr />
              </div>
            </div>
            <div className="card shadow-lg" style={{ width: "30vw", padding: "20px" }}>
              <h3 className="card-title text-center text-underline pb-3" >
                <u> Cultural values</u>
              </h3>
              <div className="card-body" style={{ overflowY: "scroll" }}>
                {this.state.profile.cultural_values ? this.state.profile.cultural_values.map((data, index) => (
                  <div>
                    {data}
                    <hr />
                  </div>
                )) : ''}
              </div>
            </div>
            </div>
          ):(
            <div style = {{ display: "flex", justifyContent: "center", height: "70vh", alignItems: "center" }}>
              <div style={{ fontSize: "50px", color: "grey" }}>
                <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>
              </div>
            </div>
        )}
          
      </div>
    )
  }
}

export default Profile