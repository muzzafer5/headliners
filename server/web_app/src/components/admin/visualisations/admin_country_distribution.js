import React, { Component } from 'react'
import { fetch_users } from '../ConnectServer'
import { Chart } from "react-google-charts"

const countMap = new Map([["Australia", "au"], ["Brazil", "br"], ["Canada", "ca"], ["Switzerland", "ch"], ["China", "cn"], ["Germany", "de"], ["Egypt", "eg"], ["Spain", "es"], ["France", "fr"], ["United Kingdom", "gb"], ["Greece", "gr"], ["Hong Kong", "hk"], ["Ireland", "ie"], ["Israel", "il"], ["India", "in"], ["Italy", "it"], ["Japan", "jp"], ["Netherlands", "nl"], ["Norway", "no"], ["Peru", "pe"], ["Philippines", "ph"], ["Pakistan", "pk"], ["Portugal", "pt"], ["Romania", "ro"], ["Russian Federation", "ru"], ["Sweden", "se"], ["Singapore", "sg"], ["Taiwan, Province of China", "tw"], ["Ukraine", "ua"], ["United States", "us"]]);

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
                    var obj = res[i].country
                    if (country_map.has(obj)){
                        
                        country_map.set(obj, country_map.get(obj)+1)
                    }
                    else{
                        country_map.set(obj, 1)
                    } 
                }
                var geo_data = [['Country', 'Popularity']];
                var get_entries = country_map.entries()
                for (var ele of get_entries)
                    if(ele[0]==="gen")
                        geo_data.push(ele);
                    else
                        geo_data.push([{v: countMap.get(ele[0]), f:ele[0]}, ele[1]]);
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
                    // options={{
                    //     region: 'IE',
                    //     displayMode: 'regions',
                    //     resolution: 'provinces'
                    // }}
                />
            </div>
        )
    }
}

export default AdminCountryDistribution