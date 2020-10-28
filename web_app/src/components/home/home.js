import React, { Component } from 'react'
import reporter from '../../images/reporter.png'
import paper from '../../images/news.png'

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
            <div className="home" >
                <div className="row mx-2">
                    <div className="col-4" style={{
                        height: "400px",
                        backgroundImage: "url(" + reporter + ")",
                        backgroundPosition: 'center',
                        backgroundSize: '400px',
                        backgroundRepeat: 'no-repeat',
                        marginTop: "100px",
                        opacity: "1"
                    }}>
                    </div>
                    <div className="col-4">
                        <button
                            className="btn btn-primary  px-5 "
                            style={{
                                position: "absolute",
                                top: "40%",
                                fontSize: "30px",
                                borderRadius: 100
                            }}
                            onClick={this.gameMode}
                        >
                            Click to enter in the game
                        </button>
                    </div>
                    <div className="col-4" style={{
                        backgroundImage: "url(" + paper + ")",
                        backgroundPosition: 'center',
                        backgroundSize: '450px',
                        backgroundRepeat: 'no-repeat',
                        marginTop: "100px",
                        opacity: "1"
                    }}>

                    </div>
                </div>

            </div>
        )
    }
}

export default Home