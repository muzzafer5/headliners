import React, { Component } from 'react'
import {fetch_users} from './ConnectServer'
import {Line} from 'react-chartjs-2'

class AdminAgeDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            labels : [],
            data : [],
        }
    }

    componentDidMount() {
        fetch_users().then(res => {
            if(res){
                var labels = []
                var data = []
                for (var ii = 10; ii <= 70; ii++) {
                    labels.push(ii);
                    data.push(0);
                }
                for(var i=0 ;i<res.length ;i ++){
                    var age = parseInt(res[i].age)
                    if(age>=70)
                        data[60]+=1
                    else
                        data[age-10]+=1
                }
                this.setState({labels : labels})
                this.setState({data : data})
            }
            else{
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        const labels = this.state.labels;
        const datasets = [{
            label: '# of Users',
            fill: false,
            data: this.state.data,
            backgroundColor: 'red',
            borderColor: '#695a5e',
        }];
        return (
            <div  >
                <h1  className="text-center my-5">User age distribution </h1>
                <div className = "container">
                    <Line
                        data = {{
                            labels : labels,
                            datasets : datasets
                        }}
                        options = {{
                                    scales: {
                                        xAxes: [
                                            {
                                                ticks: {
                                                    stepSize: 5
                                                }
                                            }
                                        ]
                                    }
                                }}
                        height = '100%'
                    />
                </div>
            </div>
        )
    }

}

export default AdminAgeDistribution