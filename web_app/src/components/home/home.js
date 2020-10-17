import React, { Component } from 'react'

class Home extends Component {
    componentDidMount() {
        if (!localStorage.usertoken)
            this.props.history.push(`/login`)
    }
    render() {
        return (
            <div className="home">
                BTP
            </div>
        )
    }
}

export default Home