import React, { Component } from 'react'
import {fetch_users} from './ConnectServer'
import TableViewer from 'react-js-table-with-csv-dl';

class AdminUsers extends Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            users : [],
            headers: ["username", "age", "gender", "profession", "country", "cultural_values"],
            sortby : "age"
        }
    }
    componentDidMount() {
        fetch_users().then(res=>{
            if(res){
                for (var i = 0; i < res.length ; i++){
                    var values = res[i].cultural_values;
                    var s = "";
                    for (var j=0;j<values.length ; j++){
                        s += values[j].value
                        if(j !== values.length-1)
                            s+=", "
                    }
                    res[i].cultural_values = s;
                }
                this.setState({users : res})
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }
    render() {
        return (
            <div>
                
                <div className="container" >
                    <TableViewer
                        title="Users"
                        content={this.state.users}
                        headers={this.state.headers}
                        minHeight={0}
                        maxHeight={400}
                        activateDownloadButton={true}
                        pagination = {10}
                        caseInsensitive = {true}
                        filename = "headliners.csv"
                    />
                </div>
            </div>
        )
    }
}

export default AdminUsers