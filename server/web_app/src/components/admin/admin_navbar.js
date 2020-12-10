import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'

class AdminNavbar extends Component {
    logOut() {
        localStorage.removeItem("admintoken")
        this.props.history.push('/admin')
    }

    render() {
        return (
            <Navbar
                className="px-5 navbar-dark bg-dark"
                collapseOnSelect
                expand="lg"
                style = {{height : "7vh"}}
            >
                <Navbar.Brand href="/">Headliners</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link
                        className="btn btn-outline-light mx-2"
                        onClick={() => this.props.history.push('/admin/home')}>
                        Admin Home
                        </Nav.Link>
                    <Nav.Link
                        className="btn btn-outline-light mx-2"
                        onClick={() => this.logOut()}>
                        Logout
                        </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default AdminNavbar