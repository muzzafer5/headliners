import React, { Component } from 'react'
import {fetch_users} from '../ConnectServer'
import ReactJson from 'react-json-view'

class AdminUsersDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            users : []
        }
    }

    componentDidMount() {
        fetch_users().then(res=>{
            if(res){
                // for (var i = 0; i < res.length ; i++){
                //     res[i].cultural_values = JSON.stringify(res[i].cultural_values);;
                // }
                this.setState({users : res})
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    onDownload() {
        const fileData = JSON.stringify(this.state.users);
        const blob = new Blob([fileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'users.json';
        link.href = url;
        link.click();
    }

    render() {
        return (
            <div style={{ height: "92vh", overflowY: "scroll" }}>
                <h1 className="text-center my-3">Users - {this.state.users.length} </h1>
                <div className="container">
                    <button onClick={() => this.onDownload()} className="btn btn-outline-secondary px-3" >
                        <i className="fa fa-download" style={{ color: "green" }}></i> Download
                    </button>
                    {this.state.users ? this.state.users.map((data, index) => (
                        <div style={{ margin: "20px 0px" }} key={index}>
                            <ReactJson
                                src={data}
                                theme="colors"
                                name={"User " + (index+1).toString()}
                                enableClipboard={false}
                                displayObjectSize={false}
                                displayDataTypes={false}
                                indentWidth={10}
                                collapsed={2}
                                style={{ padding: "20px", borderRadius: "10px", border: "1px solid #e3e3e3" }}
                            />
                        </div>
                    )) : ''}

                </div>
            </div>
        )
    }
}

export default AdminUsersDistribution