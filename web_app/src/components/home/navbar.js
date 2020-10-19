import React, { Component } from 'react'
import { Nav, Navbar} from 'react-bootstrap'

class Header extends Component {

    constructor(props) {
        super(props)
        this.state = {
            errors:{}
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
            <Navbar className="px-3" collapseOnSelect expand="lg"
                style={{
                    borderBottom: "1px solid #e6f7dc",
                }}
            >
                <Navbar.Brand href="/">
                    <span
                        style={{
                            color: "#6FA843",
                            fontSize: "20px",
                            fontWeight: "500"
                        }}
                    >
                        Outsourcing App
            </span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto"></Nav>
                    <Nav>
                        <Nav.Link eventKey={1} >Profile</Nav.Link>
                        <Nav.Link eventKey={2} onClick={this.logOut} className="ml-3">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Header