import React, { Component } from 'react'
import {fetch_news} from './ConnectServer'
import {Button, Modal } from 'react-bootstrap'
import bg_pic from '../../static/news2.jpg' 

class Game extends Component {
    constructor() {
        super()
        this.state = {
            show : 0,
            errors: {},
            show_headlines : false,
            news: {}
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onNextModal = this.onNextModal.bind(this)
    }
    componentDidMount() {
        // fetch_news().then(res=>{
        //     console.log(res)
        // })
        if (!localStorage.usertoken)
            this.props.history.push(`/login`)
    }
    onCloseModal(){
        this.props.history.push(`/home`)
    }
 
    onNextModal(){
        if(this.state.show === 0){
            this.setState({show_headlines : true})
            fetch_news({ category: 'sports'}).then(res=>{
                console.log(res)
                this.setState({news:res})
            })
        }
        if (this.state.show === 1) {
            fetch_news({ category: 'politics' }).then(res => {
                console.log(res)
                this.setState({ news: res })
            })
        }
        if (this.state.show === 2) {
            fetch_news({ category: 'science' }).then(res => {
                console.log(res)
                this.setState({ news: res })
            })
        }
        if (this.state.show === 3) {
            fetch_news({ category: 'entertainment' }).then(res => {
                console.log(res)
                this.setState({ news: res })
            })
        }
        if (this.state.show === 4) {
            fetch_news({ category: 'technology' }).then(res => {
                console.log(res)
                this.setState({ news: res })
            })
        }
        if (this.state.show === 5) {
            fetch_news({ category: 'health' }).then(res => {
                console.log(res)
                this.setState({ news: res })
            })
        }
        if (this.state.show === 6) {
            this.setState({show_headlines : false})
        }
        this.setState({show: this.state.show + 1})
    }

    render() {
        const consentModal = (
            <Modal centered show={this.state.show === 0} animation={false}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>Headline News Phase 1</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ color: "#bd4a4a", fontSize : "14px"}}>
                        * News Headlines are being pulled from the most popular stations.
                        Swipe left (provide a left arrow for emphasis) if you would not share the headline to your social media community or right 
                        (provide a right arrow for emphasis) if you would share the headline. *
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className="btn btn-primary" onClick={this.onNextModal}>
                        Enter
          </Button>
                </Modal.Footer>
            </Modal>
        )
        const headline = (
            <Modal centered size = "lg" show={this.state.show_headlines} animation={false}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>Headline News Phase 1</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style = {{height : "500px"}}>
                        {this.state.news ?
                            (
                                <div>
                                        <div className = "text-center pt-3" style = {{fontSize : "20px", fontWeight : "700"}}> Title: </div> 
                                        <div style={{ fontSize : "18px", color: "#4e4f4f"}}>{this.state.news.title}</div>
                                        <div className="text-center pt-5" style={{ fontSize: "20px", fontWeight: "700" }}>Desctiption: </div> 
                                    <div style={{ fontSize: "18px", color: "#4e4f4f" }}>{this.state.news.description}</div>
                                </div>
                            ):''}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" className="btn btn-primary" onClick={this.onNextModal}>
                        Next
          </Button>
                </Modal.Footer>
            </Modal>
        )
        var sectionStyle = {
            width: "100%",
            height: "750px",
            backgroundImage: "url(" + bg_pic + ")",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: "1"
        };
        return (
            <div className="home" style = {sectionStyle}>
                Game
                {consentModal}
                {headline}
            </div>
        )
    }
}

export default Game