import React, { Component } from 'react'
import { fetch_news, save_game } from './ConnectServer'
import { Button, Modal } from 'react-bootstrap'
import { CanvasJSChart } from 'canvasjs-react-charts'
import MultiSelect from 'react-multi-select-component'

class Game extends Component {
    constructor() {
        super()
        this.state = {
            show: 0,
            errors: {},
            show_headlines: false,
            show_headlines2: false,
            show_chart: false,
            show_chart2: false,
            show_feadback: false,
            shared: [],
            shared_with_media: [],
            time: [],
            time_with_media: [],
            cultural_values_1: null,
            cultural_values_2: null,
            cultural_values_3: null,
            cultural_values_4: null,
            cultural_values_5: null,
            cultural_values_6: null,
            fake_news_1: false,
            fake_news_2: false,
            fake_news_3: false,
            fake_news_4: false,
            fake_news_5: false,
            fake_news_6: false,
            current_date : '',
            feedback: [],
            news: {}
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onNextModal = this.onNextModal.bind(this)
        this.onShare = this.onShare.bind(this)
        this.onShare2 = this.onShare2.bind(this)
    }
    componentDidMount() {
        if (!localStorage.usertoken)
            this.props.history.push(`/login`)
    }

    async onSubmit() {
        var game_data = {}
        for (var i = 1; i <= 6; i++){
            if (this.state["cultural_values_" + i.toString()] === null || this.state["cultural_values_" + i.toString()].length === 0){
                alert("Choose at least one cultural values for news article of " + this.state.feedback[i-1].category)
                return ;
            }
        }
        for (var i=0;i<6;i++){
            var ind = this.state.feedback[i].index
            var cult = this.state["cultural_values_" + ind]
            if(cult){
                for(var j =0 ; j < cult.length; j++){
                    cult[j] = cult[j].value
                }
            }
            var sr = this.state.shared.includes(ind)
            var srm = this.state.shared_with_media.includes(ind)
            var obj = {
                news_id : this.state.feedback[i].id,
                time_without_media : this.state.time[i],
                time_with_media : this.state.time_with_media[i],
                share_without_media : sr,
                share_with_media : srm,
                fake_news: this.state["fake_news_" + ind],
                cultural_values: cult
            }
            game_data[this.state.feedback[i].category] = obj
        }
        var detail = {
            news : game_data
        }
        console.log(detail)
        save_game(detail).then(res=>{
            console.log(res)
        })
    }

    onCloseModal() {
        this.props.history.push(`/home`)
    }

    onShare() {
        var shared_news = this.state.shared
        shared_news.push(this.state.news.index)
        this.setState({ shared: shared_news })
        this.onNextModal()
    }

    onShare2() {
        var shared_news = this.state.shared_with_media
        shared_news.push(this.state.news.index)
        this.setState({ shared_with_media: shared_news })
        this.onNextModal()
    }

    onNextModal() {
        if (this.state.show === 0) {
            this.setState({ current_date: new Date(), show_headlines: true  })
            fetch_news({ category: 'sports' }).then(res => {
                var content = res
                content.index = '1'
                content.category = 'Sports'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content,  feedback: temp })
            })
        }
        if (this.state.show === 1) {
            var time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time : time_arr})
            fetch_news({ category: 'entertainment' }).then(res => {
                var content = res
                content.index = '2'
                content.category = 'Entertainment'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content, feedback: temp })            
            })
        }
        if (this.state.show === 2) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'science' }).then(res => {
                var content = res
                content.index = '3'
                content.category = 'Education'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content, feedback: temp })
            })
        }
        if (this.state.show === 3) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'technology' }).then(res => {
                var content = res
                content.index = '4'
                content.category = 'Technology'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content, feedback: temp })
            })
        }
        if (this.state.show === 4) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'nation' }).then(res => {
                var content = res
                content.index = '5'
                content.category = 'Politics'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content, feedback: temp })
            })
        }

        if (this.state.show === 5) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'health' }).then(res => {
                var content = res
                content.index = '6'
                content.category = 'Health'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content, feedback: temp })
            })
        }
        if (this.state.show === 6) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            this.setState({ show_headlines: false })
            this.setState({ show_chart: true })
        }
        if (this.state.show === 7) {
            this.setState({ show_chart: false })
        }
        if (this.state.show === 8) {
            this.setState({ current_date: new Date(), show_headlines2: true })
            this.setState({ news: this.state.feedback[0] })
        }
        if (this.state.show === 9) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[1] })
        }
        if (this.state.show === 10) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[2] })
        }
        if (this.state.show === 11) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[3] })
        }
        if (this.state.show === 12) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[4] })
        }
        if (this.state.show === 13) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[5] })
        }
        if (this.state.show === 14) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ show_headlines2: false })
            this.setState({ show_chart2: true })
            console.log(this.state.time_with_media)
            console.log(this.state.shared_with_media)
        }
        if (this.state.show === 15) {
            this.setState({ show_chart2: false })
            this.setState({ show_feadback: true })
        }
        this.setState({ show: this.state.show + 1 })
    }

    render() {
        const cultural_values_options = [
            { value: 'Importance of Individual Goals', label: 'Importance of Individual Goals' },
            { value: 'Importance of Group Goals', label: 'Importance of Group Goals' },
            { value: 'Hierarchical Decision Making', label: 'Hierarchical Decision Making' },
            { value: 'Collaborative Decision Making', label: 'Collaborative Decision Making' },
            { value: 'Structured Rules', label: 'Structured Rules' },
            { value: 'Being Flexible in situations', label: 'Being Flexible in situations' },
            { value: 'Focus on Task Completion', label: 'Focus on Task Completion' },
            { value: 'Focus on Relationships', label: 'Focus on Relationships' },
            { value: 'Place focus on long-term benefits', label: 'Place focus on long-term benefits' },
            { value: 'Being quick in planning', label: 'Being quick in planning' },
            { value: 'Indirect Communication', label: 'Indirect Communication' },
            { value: 'Explicit communication', label: 'Explicit communication' },
            { value: 'Separate work and personal activities', label: 'Separate work and personal activities' },
            { value: 'A blending of work life and personal life', label: 'A blending of work life and personal life' },
            { value: 'Cultivate nurturing behaviors', label: 'Cultivate nurturing behaviors' },
            { value: 'Seek achievement behaviors', label: 'Seek achievement behaviors' }
        ];

        const options1 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Headliners"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: [
                    { y: this.state.shared.length, label: "Shared" },
                    { y: 6- this.state.shared.length, label: "Non shared"}
                ]
            }]
        }
        const options2 = {
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: "Headliners"
            },
            data: [{
                type: "pie",
                startAngle: 75,
                toolTipContent: "<b>{label}</b>: {y}",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}",
                dataPoints: [
                    { y: this.state.shared_with_media.length, label: "Shared" },
                    { y: 6 - this.state.shared_with_media.length, label: "Non shared" }
                ]
            }]
        }
        const consentModal = (
            <Modal centered show={this.state.show === 0} animation={true} className="shadow-lg">
                <Modal.Header>
                    <Modal.Title>Phase 1</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ fontFamily: "Lato", fontSize: "small", textAlign: "justify" }}>
                        <ul>
                            <li>
                                News Headlines are being pulled from the most popular stations.
                            </li>
                            <li>
                                Click on the button "<b>Don't Share</b>" if you would not share the news headline to your social media community, else click on the button "<b>Share</b>".
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn btn-primary" onClick={this.onNextModal}>
                        Enter
                    </Button>
                    <Button variant="dark" className="btn btn-primary" onClick={this.onCloseModal}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
        const consentModal2 = (
            <Modal centered show={this.state.show === 8} animation={false}>
                <Modal.Header>
                    <Modal.Title>Phase 2</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ fontFamily: "Lato", fontSize: "small", textAlign: "justify" }}>
                        <ul>
                            <li>
                                News Headlines are being pulled from the most popular stations.
                            </li>
                            <li>
                                Click on the button "<b>Don't Share</b>" if you would not share the news headline to your social media community, else click on the button "<b>Share</b>".
                            </li>
                        </ul>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" className="btn btn-primary" onClick={this.onNextModal}>
                        Enter
                    </Button>
                    <Button variant="dark" className="btn btn-primary" onClick={this.onCloseModal}>
                        Exit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
        const headline = (
            <Modal centered show={this.state.show_headlines} animation={true} style={{ fontFamily: "Lato" }}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>{this.state.news.category}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        {this.state.news ?
                            (
                                <div className="container">
                                    <div className="my-2" style={{ fontSize: "large", fontWeight: "bold" }}>Title</div>
                                    <div className="mb-2" style={{ fontSize: "small", textAlign: "justify" }}>{this.state.news.title}</div>
                                    <div className="my-2" style={{ fontSize: "large", fontWeight: "bold" }}>Description</div>
                                    <div className="my-auto" style={{ fontSize: "small", textAlign: "justify" }}>{this.state.news.content}</div>
                                </div>
                            ) : ''}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style = {{width : "100%"}}>
                        <Button className="btn btn-secondary" onClick={this.onNextModal}>
                            Don't Share
                        </Button>
                        <Button className="btn btn-secondary" style = {{float : "right"}}onClick={this.onShare}>
                            Share
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
        const headline2 = (
            <Modal centered show={this.state.show_headlines2} animation={true} style={{ fontFamily: "Lato" }}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>{this.state.news.category}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        {this.state.news ?
                            (
                                <div className="container">
                                    {   this.state.news.image ?
                                        (<div style={{ alignItems: "center" }}>
                                            <img src={this.state.news.image} alt="news" style={{ maxWidth: "100%", height: "auto" }}></img>
                                        </div>)
                                        : ''}
                                    <div className="my-2" style={{ fontSize: "large", fontWeight: "bold" }}>Title</div>
                                    <div className="mb-2" style={{ fontSize: "small", textAlign: "justify" }}>{this.state.news.title}</div>
                                    <div className="my-2" style={{ fontSize: "large", fontWeight: "bold" }}>Description</div>
                                    <div className="my-auto" style={{ fontSize: "small", textAlign: "justify" }}>{this.state.news.description}</div>

                                </div>
                            ) : ''}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div style={{ width: "100%" }}>
                        <Button className="btn btn-secondary" onClick={this.onNextModal}>
                            Don't Share
                        </Button>
                        <Button className="btn btn-secondary" style={{ float: "right" }} onClick={this.onShare2}>
                            Share
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        )
        const pieChart = (
            <Modal centered show={this.state.show_chart} animation={false}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>Chart (Phase 1)</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        <CanvasJSChart options={options1} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={this.onNextModal}>
                        Move to Phase 2
                    </Button>
                </Modal.Footer>
            </Modal>
        )
        const pieChart2 = (
            <Modal centered show={this.state.show_chart2} animation={false}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>Chart (Phase 2)</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div>
                        <CanvasJSChart options={options2} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={this.onNextModal}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal>
        )
        const feedback = (
            <Modal centered show={this.state.show_feadback} animation={false}>
                <Modal.Header closeButton onClick={this.onCloseModal}>
                    <Modal.Title>Feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <div style={{ fontSize: "small", fontFamily: "Lato" }}>
                        {
                            this.state.feedback.map((data, i) => (
                                <div key={i} style={{
                                    marginTop: "10px",
                                    border: "1px solid #D3D3D3",
                                    padding: "10px",
                                    boxShadow: "2px 2px 3px #bfbfbf",
                                    borderRadius: "15px",
                                }}>
                                    <div style={{ fontSize: "18px" }}>
                                        {data.category}
                                    </div>
                                    <div className="form-group mt-3 mb-2">
                                        <div >
                                            <b>News Title:</b>
                                        </div>
                                        <div style={{ color: "grey", fontWeight: "600" }}>
                                            {data.title}
                                        </div>
                                    </div>
                                    <div className="form-group mb-3">
                                        {this.state.shared.includes(data.index) ? (<div>
                                            Shared without media
                                        </div>) :(<div>
                                            Not shared without media
                                        </div>)}
                                        {this.state.shared_with_media.includes(data.index) ? (<div>
                                            Shared with media
                                        </div>) : (<div>
                                            Not shared with media
                                        </div>)}
                                    </div>
                                    <div className="form-check mb-1">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={this.state["fake_news_" + data.index]} 
                                            onChange={() => this.setState({ ['fake_news_' + data.index]: !this.state["fake_news_" + data.index] }, console.log(this.state["fake_news_" + data.index]))}>
                                        </input>
                                        <label >
                                            Will you mark this news fake?
                                        </label>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label >Involved cultural values*</label>
                                        <MultiSelect
                                            value={this.state['cultural_values_' + data.index]}
                                            onChange={(values) => this.setState({ ['cultural_values_' + data.index]: values })}
                                            options={cultural_values_options}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" onClick={()=>this.onSubmit()}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        )
        return (
            <div>
                {consentModal}
                {headline}
                {pieChart}
                {consentModal2}
                {headline2}
                {pieChart2}
                {feedback}
            </div>
        )
    }
}

export default Game