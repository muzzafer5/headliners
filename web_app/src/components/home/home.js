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
    gameMode(){
        this.props.history.push('/game')
    }
    render() {
        return (
            <div className="home" >
                <button
                    className="btn btn-primary  px-5 "
                    style={{
                        position: "absolute",
                        top: "30%",
                        left : "40%",
                        fontSize : "30px"
                    }}
                    onClick = {this.gameMode}
                >
                   Click to enter in game
                </button>
            </div>
        )
    }
}

export default Home