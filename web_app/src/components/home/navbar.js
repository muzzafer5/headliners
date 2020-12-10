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
                style = {{height : "8vh"}}
            >
                <Navbar.Brand href="/">Headliners</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav.Link
                        eventKey={1}
                        className="btn btn-outline-secondary mx-2 my-1"
                        onClick={() => this.props.history.push('/user/game')}
                    >
                        Played games
                    </Nav.Link>
                    <Nav.Link
                        eventKey={2}
                        className="btn btn-outline-secondary mx-2 my-1"
                        onClick={()=>this.props.history.push('/user/profile')}
                    >
                        Profile
                    </Nav.Link>
                    <Nav.Link
                        eventKey={3}
                        className="btn btn-outline-secondary mx-2 my-1"
                        onClick={this.logOut}
                    >
                        Logout
                    </Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header