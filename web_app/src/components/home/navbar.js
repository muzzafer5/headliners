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
                className="px-5 navbar-dark bg-dark fixed-top"
                collapseOnSelect
                expand="lg">
                <Navbar.Brand href="/">Headliners</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link
                        eventKey={1}
                        className="btn btn-outline-secondary mx-2 my-1"
                        onClick={this.logOut}>Logout</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header