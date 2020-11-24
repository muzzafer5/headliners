import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { FaGooglePlay, FaApple } from 'react-icons/fa';


class Landing extends Component {
  componentDidMount() {
    if (localStorage.usertoken)
      this.props.history.push(`/home`)
  }
  render() {
    return (
      <div>
        <Navbar
          className="px-5 navbar-dark bg-dark fixed-top "
          collapseOnSelect
          expand="lg"
          >
          <Navbar.Brand>Headliners</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto"></Nav>
            <Nav>
              <Nav.Link
                className="btn btn-outline-secondary mx-2 px-4"
                href={'/auth/login/'}>Login</Nav.Link>
              <Nav.Link
                className="btn btn-outline-secondary mx-2 px-4"
                href={'/auth/signup/'}>Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{ width: "100vw", minHeight: "100vh" }} className="container-fluid">
          <div className="d-flex flex-column justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="d-flex flex-row justify-content-center">
              <h1>Welcome</h1>

            </div>
            <div className="d-flex flex-row justify-content-center my-5">
              <button className="btn btn-outline-dark btn-icon-text mx-3">
                <div>Available on the</div>
                <FaApple size="2em" /> App Store
                </button>
              <button className="btn btn-outline-dark btn-icon-text mx-3">
                <div>Get it on the</div>
                <FaGooglePlay size="2em" /> Play Store
                </button>
            </div>
          </div>
        </div>

        <div className="mini-footer" style={{
          backgroundColor: "#5a6770",
          color: "white",
          position: "fixed",
          bottom: 0,
          padding: "10px",
          width: "100%",
          textAlign: "center"
        }}>
          © 2020 Headliners. All rights reserved
            </div>
      </div>
    )
  }
}

export default Landing