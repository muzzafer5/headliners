import React, { Component } from 'react'

class Home extends Component {
    constructor() {
        super()
        this.state = {
            errors: {}
        }
        this.gameMode = this.gameMode.bind(this)
    }
    componentDidMount() {
        if (!localStorage.usertoken)
            this.props.history.push(`/login`)
    }
    gameMode() {
        this.props.history.push('/game')
    }
    render() {
        return (
            <div style={{ width: "100vw", minHeight: "90vh" }} className="container-fluid">
                <div className="d-flex flex-column justify-content-center" style={{ minHeight: "90vh" }}>
                    <div className="d-flex flex-row justify-content-center">
                        <button
                            className="btn btn-primary px-5"
                            onClick={this.gameMode}>Start</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home