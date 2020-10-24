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
          className="px-5 navbar-dark bg-dark"
          collapseOnSelect
          expand="lg"
          style={{ height: "10vh" }}>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link
                eventKey={1}
                className="btn btn-outline-secondary mx-2"
                href={'/auth/login/'}>Login</Nav.Link>
              <Nav.Link
                eventKey={2}
                className="btn btn-outline-secondary mx-2"
                href={'/auth/signup/'}>Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ width: "100vw", minHeight: "90vh" }} className="container-fluid">
          <div className="d-flex flex-column justify-content-center" style={{ minHeight: "90vh" }}>
            <div className="d-flex flex-row justify-content-center">
              <h1>Headliner</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Landing