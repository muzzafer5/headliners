import React, { Component } from 'react'

class AdminHome extends Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
    }

    componentDidMount() {
        if (!localStorage.admintoken)
            this.props.history.push(`/admin`)
    }

    render(){
        return(
            <div >
                <div className = "container">
                    <div style = {{textAlign : "center", margin : "50px 200px"}}>
                        <button className="btn btn-dark" style = {{width:"100%"}} onClick={() => this.props.history.push('/admin/users')}>
                            User details
                        </button>
                    </div>
                    <div style={{ textAlign: "center", margin: "50px 200px" }}>
                        <button className="btn btn-dark" style={{ width: "100%" }}  onClick={() => this.props.history.push('/admin/age_distribution')}>
                            Age distribution
                            </button>                            
                    </div>
                    <div style={{ textAlign: "center", margin: "50px 200px" }}>
                        <button className="btn btn-dark" style={{ width: "100%" }}  onClick={() => this.props.history.push('/admin/gender_distribution')}>
                            Gender distribution
                            </button>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminHome