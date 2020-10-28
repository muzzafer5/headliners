import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return (
            <div className="mini-footer" style={{
                backgroundColor: "#5a6770",
                color: "white",
                position: "fixed",
                bottom: 0,
                padding: "10px",
                width: "100%",
                textAlign: "center"
            }}>
                © 2020 Headliners. All rights reserved
            </div>
        )
    }
}

export default Footer