import React, { Component } from 'react'
import {fetch_users} from '../ConnectServer'
import TableViewer from 'react-js-table-with-csv-dl';

class AdminUsers extends Component {
    constructor() {
        super()
        this.state = {
            errors: {},
            users : [],
            headers: ["username", "age", "gender", "profession", "country", "language", "cultural_values"]
        }
    }
    componentDidMount() {
        fetch_users().then(res=>{
            if(res){
                for (var i = 0; i < res.length ; i++){
                    res[i].cultural_values = JSON.stringify(res[i].cultural_values);;
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
            <div style={{ height: "93vh", overflowY: "scroll" }}>    
                <div className="container" >
                    <TableViewer
                        title={"Users (Total - " + this.state.users.length +")"}
                        content={this.state.users}
                        headers={this.state.headers}
                        minHeight={0}
                        maxHeight={400}
                        activateDownloadButton={true}
                        pagination = {10}
                        caseInsensitive = {true}
                        filename = "users.csv"
                    />
                </div>
            </div>
        )
    }
}

export default AdminUsers