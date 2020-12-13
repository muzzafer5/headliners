import React, { Component } from 'react'
import { fetch_users } from '../ConnectServer'
import { Bar } from 'react-chartjs-2'

class AdminLanguageDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            lang : ['Arabic', 'German', 'Greek', 'English', 'Spanish', 'French', 'Hebrew', 'Hindi', 'Italian', 'Japanese', 'Malayalam', 'Marathi', 'Dutch', 'Norwegian', 'Portuguese', 'Romanian', 'Russian', 'Swedish', 'Tamil', 'Telugu', 'Ukrainian', 'Chinese'],
            data : []
        }
    }

    componentDidMount() {
        fetch_users().then(async res => {
            if (res) {
                var lang_data = []
                var lang = this.state.lang
                var lang_map = new Map()
                for (var i=0;i<lang.length;i++){
                    await lang_map.set(lang[i], 0)
                }
                for (var i = 0; i < res.length; i++) {
                    await lang_map.set(res[i].language, lang_map.get(res[i].language)+1)
                }
                for (var i = 0; i < lang.length; i++) {
                    lang_data.push(lang_map.get(lang[i]))
                }
                this.setState({ data: lang_data })
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        const labels = this.state.lang
        const datasets = [{
            label: '# of Users',
            barPercentage: 1,
            minBarLength: 2,
            data: this.state.data,
            backgroundColor: "#fa867f"
        }];
        return (
            <div >

                <h1 className="text-center my-5">Language distribution </h1>
                <Bar
                    className="container"
                    data={{
                        labels: labels,
                        datasets: datasets
                    }}
                    options={{
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                    }}
                    height='100%'
                />
            </div>
        )
    }

}

export default AdminLanguageDistribution