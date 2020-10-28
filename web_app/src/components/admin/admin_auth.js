import React, { Component } from 'react'
import admin from '../../static/admin.jpg' 
import {admin_login} from './ConnectServer'

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
            password : this.state.password
        }

        admin_login(cred).then(res=>{
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
            <div
                style= {{
                    width: "100%",
                    height: "100vh",
                    backgroundImage: "url(" + admin + ")",
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }
                }
            >
                <div className="admin"
                    style={{
                        position: "absolute",
                        top: "35%",
                        width: "30%",
                        left: "35%",
                    }}>
                    <div className = "container">
                        <div className="form-group mb-4 mt-3">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                required
                                value={this.state.password}
                                onChange={(e)=>this.setState({password:e.target.value})}
                            />
                        </div>
                        <div className="form-group my-2 text-center">
                            <button
                                onClick = {this.onSubmit}
                                className="btn btn-dark px-5"
                            >
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