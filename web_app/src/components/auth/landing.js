import React, { Component } from 'react'
import {Nav,Navbar} from 'react-bootstrap'

class Landing extends Component {
  componentDidMount(){
    if(localStorage.usertoken)
        this.props.history.push(`/home`)  
  }
  render() {
    return (
        <div className = "landing">
              BTP
        </div>
    )
  }
}

export default Landing