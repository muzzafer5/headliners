import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            errors: {}
        }
        this.logOut = this.logOut.bind(this)
    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem("usertoken")
        this.props.history.push('/auth/login')
    }

    render() {
        return (
            <Navbar 
                className="px-5 navbar-dark bg-dark" 
                collapseOnSelect 
                expand="lg"
                style={{height:"10vh"}}>
                <Navbar.Brand href="/">Headliner</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link 
                            eventKey={1} 
                            className="btn btn-outline-secondary mx-2 disabled">Profile</Nav.Link>
                        <Nav.Link 
                            eventKey={2} 
                            className="btn btn-outline-secondary mx-2" 
                            onClick={this.logOut}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header