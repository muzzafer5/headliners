import React, { Component } from 'react'
import axios from 'axios'
import MultiSelect from "react-multi-select-component";

class Game extends Component {
    constructor() {
        super()
        this.state = {
            category: 'business',
            errors: {},
            news: {}
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onNextModal = this.onNextModal.bind(this)
    }
    componentDidMount() {
        if (!localStorage.usertoken)
            this.props.history.push(`/login`)
    }
    onCloseModal() {
        this.props.history.push(`/home`)
    }

    onNextModal() {
        if (this.state.category === 'business') {
            this.setState({ category: 'entertainment' })
        }
        else if (this.state.category === 'entertainment') {
            this.setState({ category: 'health' })
        }
        else if (this.state.category === 'health') {
            this.setState({ category: 'science' })
        }
        else if (this.state.category === 'science') {
            this.setState({ category: 'sports' })
        }
        else if (this.state.category === 'sports') {
            this.setState({ category: 'technology' })
        }
        var category = this.state.category
        var url = 'https://newsapi.org/v2/top-headlines?country=in&category='.concat(category.concat('&apiKey=e72f2023fa894d99944fb610c2fc31dd'))
        axios.get(url).then(res => {
            console.log(res['data']['articles'][0])
            this.setState({ news: res['data']['articles'][0] })
        })
    }

    render() {
        var category = this.state.category
        var url = 'https://newsapi.org/v2/top-headlines?country=in&category='.concat(category.concat('&apiKey=e72f2023fa894d99944fb610c2fc31dd'))
        axios.get(url).then(res => {
            console.log(res)
            this.setState({ news: res['data']['articles'][0] })
        })
        var button;
        if (this.state.category === 'technology') {
            button = <button onClick="" class="btn btn-primary">End</button>
        }
        else {
            button = <button onClick={this.onNextModal} class="btn btn-primary">Next</button>
        }
        const headline = (
            <div
                className="container"
                style={{ width: "100vw" }}>
                <div className="row justify-content-center">
                    <div class="card shadow-lg col-lg-6 col-md-8 col-10 my-5">
                        <div class="card-body">
                            <h2 class="card-header mb-3 text-capitalize">{this.state.category}</h2>
                            <div className="row">
                                <div className="col-12 my-2" style={{ order: 1 }}>
                                    <div class="card col-12">
                                        <div class="card-body">
                                            <h5 class="card-title">{this.state.news.title}</h5>
                                            <p class="card-text">{this.state.news.content}</p>
                                            <div class="card bg-LIGHT mb-3">
                                                <div class="card-body">
                                                    <div class="row border-light">
                                                        <div className="col-8 my-auto py-auto">
                                                            Will you share this news?
                                                        </div>
                                                        <div className="col-4">
                                                            <div class="form-group">
                                                                <select class="form-control" id="share">
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card bg-LIGHT mb-3">
                                                <div class="card-body">
                                                    <div class="row border-light">
                                                        <div className="col-8 my-auto py-auto">
                                                            Will you mark this news fake?
                                                        </div>
                                                        <div className="col-4">
                                                            <div class="form-group">
                                                                <select class="form-control" id="share">
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card bg-LIGHT mb-3">
                                                <div class="card-body">
                                                    <div class="mb-2">Involved Cultural Values</div>
                                                    <MultiSelect
                                                        required
                                                        name="culturalValues"
                                                        // value="{this.state.cultural_values}"
                                                        // onChange={cultural_values => this.setState({ cultural_values })}
                                                        options={[{value: 'Value 1', label: 'Value 1'}, {value: 'Value 2', label: 'Value 2'}]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 my-2" style={{ order: 2 }}>
                                    <div class="card col-12">
                                        <img class="card-img-top" src={this.state.news.urlToImage} alt="News Headline"></img>
                                        <div class="card-body">
                                            <h5 class="card-title">{this.state.news.title}</h5>
                                            <p class="card-text">{this.state.news.description}</p>
                                            <div class="card bg-LIGHT mb-3">
                                                <div class="card-body">
                                                    <div class="row border-light">
                                                        <div className="col-8 my-auto py-auto">
                                                            Will you share this news?
                                                        </div>
                                                        <div className="col-4">
                                                            <div class="form-group">
                                                                <select class="form-control" id="share">
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card bg-LIGHT mb-3">
                                                <div class="card-body">
                                                    <div class="row border-light">
                                                        <div className="col-8 my-auto py-auto">
                                                            Will you mark this news fake?
                                                        </div>
                                                        <div className="col-4">
                                                            <div class="form-group">
                                                                <select class="form-control" id="share">
                                                                    <option>Yes</option>
                                                                    <option>No</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card bg-LIGHT mb-3">
                                                <div class="card-body">
                                                    <div class="mb-2">Involved Cultural Values</div>
                                                    <MultiSelect
                                                        required
                                                        name="culturalValues"
                                                        // value="{this.state.cultural_values}"
                                                        // onChange={cultural_values => this.setState({ cultural_values })}
                                                        options={[{value: 'Value 1', label: 'Value 1'}, {value: 'Value 2', label: 'Value 2'}]}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {button}
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <div style={{ width: "100vw", minHeight: "100vh", fontFamily: "Lato" }}>
                {headline}
            </div>
        )
    }
}

export default Game