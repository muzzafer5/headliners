import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

class Landing extends Component {
  componentDidMount() {
    if (localStorage.usertoken)
      this.props.history.push(`/home`)
  }
  render() {
    return (
      <div>
        <Navbar
          className="px-5 navbar-dark bg-dark fixed-top"
          collapseOnSelect
          expand="lg"
          >
          <Navbar.Brand>Headliners</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link
                className="btn btn-outline-secondary mx-2 my-1"
                href={'/auth/login/'}>Login</Nav.Link>
              <Nav.Link
                className="btn btn-outline-secondary mx-2 my-1"
                href={'/auth/signup/'}>Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ width: "100vw", minHeight: "100vh" }} className="container-fluid">
          <div className="d-flex flex-column justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="d-flex flex-row justify-content-center">
              <h1>Welcome</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing