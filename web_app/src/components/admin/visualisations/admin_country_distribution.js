import React, { Component } from 'react'
import { fetch_users } from '../ConnectServer'
import { Chart } from "react-google-charts"

class AdminCountryDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            geo_data: []
        }
    }

    componentDidMount() {
        fetch_users().then(res => {
            if (res) {
                var country_map = new Map()
                for (var i = 0; i < res.length; i++) {
                    if (country_map.has(res[i].country)){
                        country_map.set(res[i].country, country_map.get(res[i].country)+1)
                    }
                    else{
                        country_map.set(res[i].country, 1)
                    }
                }
                var geo_data = [['Country', 'Popularity']];
                var get_entries = country_map.entries()
                for (var ele of get_entries)
                    geo_data.push(ele);
                this.setState({geo_data, geo_data}) 
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        return(
            <div>
                <Chart
                    width={'90vw'}
                    height={'90vh'}
                    chartType="GeoChart"
                    data={this.state.geo_data}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    }
}

export default AdminCountryDistribution