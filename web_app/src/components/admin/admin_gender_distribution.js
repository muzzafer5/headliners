import React, { Component } from 'react'
import { fetch_users } from './ConnectServer'
import { Doughnut } from 'react-chartjs-2'

class AdminGenderDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            male_count: 0,
            female_count: 0,
        }
    }

    componentDidMount() {
        fetch_users().then(res => {
            if (res) {
                var m = 0, f = 0;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].gender === "Male")
                        m += 1
                    else
                        f += 1
                }
                this.setState({ male_count: m })
                this.setState({ female_count: f })
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        const labels = ["Male", "Female"];
        const datasets = [{
            data: [this.state.male_count, this.state.female_count],
            backgroundColor: ['red', 'green']
        }];
        return (
            <div >
                
                <h1 className = "text-center my-5">User gender distribution </h1>
                <Doughnut
                    className="container" 
                    data={{
                        labels: labels,
                        datasets: datasets
                    }}
                    height='100%'
                />
            </div>
        )
    }

}

export default AdminGenderDistribution