import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import landing_pic from '../../static/news2.jpg'

class Landing extends Component {
  componentDidMount() {
    if (localStorage.usertoken)
      this.props.history.push(`/home`)
  }
  render() {
    var sectionStyle = {
      width: "100%",
      height: "100vh",
      backgroundImage: "url(" + landing_pic + ")",
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      opacity: "1"
    };
    return (
      <div className="landing" style={sectionStyle}>
        <div className="header px-3"
          style={
            {
              borderBottom: "1px solid #e6f7dc"
            }
          } >
          <Navbar collapseOnSelect expand="lg" >
            <Navbar.Brand href="/" >
              <span style={
                {
                  color: "#6FA843",
                  fontSize: "20px",
                  fontWeight: "500"
                }
              } >
                Headliners </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
              <Nav className="mr-auto" > </Nav>
              <Nav >
                <Nav.Link href="/auth/login" > <b>Login</b> </Nav.Link>
                <Nav.Link eventKey={2}
                  href="/auth/signup" > <b>Signup</b> </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div className="text-center mt-5" 
        >
          <h1>News App</h1>

        </div>
      </div>
    )
  }
}

export default Landing