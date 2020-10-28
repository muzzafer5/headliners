import React, { Component } from 'react'

class AdminNavbar extends Component {

    logOut() {
        localStorage.removeItem("admintoken")
        this.props.history.push('/admin')
    }

    render(){
        return(
            <div style={{ padding: "10px", borderBottom: "1px solid #e6f7dc", }}>
                <button className="btn btn-dark"
                    style={{
                        fontSize: "20px",
                        borderRadius: "50px",
                        padding: "2px 10px",
                    }}
                    onClick={() => this.props.history.push('/admin/home')}
                >
                    Admin Page
                    </button>
                <button className="btn btn-danger"
                    style={{
                        float: "right",
                        marginLeft: "10px",
                        fontSize: "14px",
                        marginTop: "2px",
                        borderRadius: "50px",
                        padding: "2px 10px",
                    }}
                    onClick={() => this.logOut() }
                >
                    Logout
                    </button>
                <button className="btn btn-success"
                    style={{
                        float: "right",
                        fontSize: "14px",
                        marginTop: "2px",
                        borderRadius: "50px",
                        padding: "2px 10px",
                    }}
                    onClick={() => this.props.history.push('/')}
                >
                    Headliners
                    </button>
            </div>
        )
    }

}

export default AdminNavbar