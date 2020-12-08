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
            <div className="d-flex justify-content-center py-5" style={{ width: "100vw", minHeight: "93vh" }}>
                <div className="d-flex flex-column col-10 justify-content-around shadow-lg">
                    <h1 style = {{textAlign : "center", textDecoration : "underline "}}>
                        Admin Pannel
                    </h1>
                    <div className="d-flex flex-row justify-content-around mb-5">
                        <div className="d-flex flex-column col-3 justify-content-center align-self-center" style={{ border: "1px solid #d6d6d6", boxShadow: "1px 1px 5px #ededed", borderRadius : "10px", padding : "20px"}}>
                            <h3 className = "text-center mb-3">
                                Models
                            </h3>
                            <button 
                                className="btn btn-info mb-1" 
                                onClick={() => this.props.history.push('/admin/users')}>
                                User Data
                            </button>
                            <button
                                className="btn btn-info mb-1 "
                                onClick={() => this.props.history.push('/admin/game_data')}>
                                Game data
                            </button>
                            <button
                                className="btn btn-info mb-1"
                                onClick={() => this.props.history.push('/admin/news_data')}>
                                News data
                            </button>
                        </div>
                        <div className="d-flex flex-column col-3 justify-content-center align-self-center" style={{ border: "1px solid #d6d6d6", boxShadow: "1px 1px 5px #ededed", borderRadius: "10px", padding: "20px" }}>
                            <h3 className="text-center mb-3">
                                Visualisations
                            </h3>
                            <button 
                                className="btn btn-info mb-1" 
                                onClick={() => this.props.history.push('/admin/age_distribution')}>
                                Age Distribution
                            </button>
                            <button 
                                className="btn btn-info mb-1" 
                                onClick={() => this.props.history.push('/admin/gender_distribution')}>
                                Gender Distribution
                            </button>
                            <button
                                className="btn btn-info mb-1"
                                onClick={() => this.props.history.push('/admin/language_distribution')}>
                                Language Distribution
                            </button>
                            <button
                                className="btn btn-info mb-1"
                                onClick={() => this.props.history.push('/admin/country_distribution')}>
                                Country Distribution
                            </button>
                        </div>
                        <div className="d-flex flex-column col-3 justify-content-center align-self-center" style={{ border: "1px solid #d6d6d6", boxShadow: "1px 1px 5px #ededed", borderRadius: "10px", padding: "20px" }}>
                            <h3 className="text-center mb-3">
                                Detailed data
                            </h3>
                            <button
                                className="btn btn-info mb-1"
                                onClick={() => this.props.history.push('/admin/users/detailed')}>
                                User data
                            </button>
                            <button
                                className="btn btn-info mb-1"
                                onClick={() => this.props.history.push('/admin/game_data/detailed')}>
                                Game data
                            </button>
                            <button
                                className="btn btn-info mb-1"
                                onClick={() => this.props.history.push('/admin/news_data')}>
                                News data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome