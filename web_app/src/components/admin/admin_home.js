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

    render() {
        return (
            <div className="d-flex justify-content-center py-2" style={{ width: "100vw", minHeight: "90vh" }}>
                <div className="d-flex flex-column col-10 justify-content-center shadow-lg">
                    <div className="d-flex flex-row mb-1 justify-content-center">
                        <button 
                            className="btn btn-info col-lg-4 col-md-6 col-sm-8 col-10" 
                            onClick={() => this.props.history.push('/admin/users')}>
                            User Data
                        </button>
                    </div>
                    <div className="d-flex flex-row mb-1 justify-content-center">
                        <button 
                            className="btn btn-info col-lg-4 col-md-6 col-sm-8 col-10" 
                            onClick={() => this.props.history.push('/admin/age_distribution')}>
                            Age Distribution
                        </button>
                    </div>
                    <div className="d-flex flex-row mb-1 justify-content-center">
                        <button 
                            className="btn btn-info col-lg-4 col-md-6 col-sm-8 col-10" 
                            onClick={() => this.props.history.push('/admin/gender_distribution')}>
                            Gender Distribution
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome