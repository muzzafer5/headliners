import React, { Component } from 'react'
import { admin_login } from './ConnectServer'
import { Navbar } from 'react-bootstrap'

class Admin extends Component {
    constructor() {
        super()
        this.state = {
            password: '',
            errors: {}
        }
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e) {
        e.preventDefault()
        const cred = {
            password: this.state.password
        }

        admin_login(cred).then(res => {
            if (res) {
                localStorage.setItem('admintoken', res)
                this.props.history.push(`/admin/home`)
            }
        })
    }

    componentDidMount() {
        if (localStorage.admintoken)
            this.props.history.push(`/admin/home`)
    }

    render() {
        return (
            <div>
                <Navbar className="px-5 navbar-dark bg-dark" style={{height:"10vh"}}>
                    <Navbar.Brand href="/">Headliners</Navbar.Brand>
                </Navbar>
                <div className="d-flex justify-content-center py-5" style={{ width: "100vw", minHeight: "90vh" }}>
                    <div className="d-flex flex-column col-lg-6 col-md-8 col-10 justify-content-center px-5 shadow-lg">
                        <div className="d-flex flex-row form-group">
                            <label for="admin-password"><h3>Admin Password</h3></label>
                        </div>
                        <div className="d-flex flex-row form-group mb-1">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="admin-password"
                                required
                                value={this.state.password}
                                onChange={(e) => this.setState({ password: e.target.value })} />
                        </div>
                        <div className="d-flex flex-row form-group text-center mt-2">
                            <button onClick={this.onSubmit} className="btn btn-primary px-5 shadow">
                                Enter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Admin