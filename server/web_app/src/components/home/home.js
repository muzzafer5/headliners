import React, { Component } from 'react'
import bg_home from '../../images/bg_home.png'

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
            this.props.history.push(`/auth/login`)
    }
    gameMode() {
        this.props.history.push('/game')
    }
    render() {
        var backgroundStyle = {
            height: "92vh",
            width: "100vw",
            backgroundImage: "url(" + bg_home + ")",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: "left bottom",
            backgroundSize: "100vw 70vh",
            opacity: 1
        };

        return (
            <div style={backgroundStyle} >
                <div style={{ paddingLeft: "10vw", paddingTop: "20vh" }}>
                    <h1 style={{ fontSize: "45px" }}>
                        Welcome to the Headliners.
                    </h1>
                    <div className="form-inline md-form mr-auto" style={{ paddingTop: "5vh", display : "flex"}}>
                        <span
                            style={{ color: "grey", fontSize: "18px", padding: "5px 3vw", border : "1px solid #d6d6d6", marginRight : "2vw", borderRadius : "5px"}}
                        >
                            Enter to the game
                        </span>
                        <button className="btn btn-secondary"
                            style={{ fontSize: "18px", padding : "5px 3vw", border: "none", fontWeight: "500" }}
                            onClick={this.gameMode}
                        >
                            Start
                        </button>
                    </div>
                </div>

                <div className="mini-footer" style={{
                    position : "fixed",
                    color: "white",
                    bottom: 0,
                    padding: "6px",
                    width: "100%",
                    textAlign: "center"
                }}>
                    © 2020 Headliners. All rights reserved
                </div>
            </div>
        )
    }
}

export default Home