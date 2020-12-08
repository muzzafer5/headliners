import React, { Component } from 'react'
import { fetch_games_detailed } from '../ConnectServer'
import ReactJson from 'react-json-view'

class AdminGenderDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            game_data : []
        }
    }

    componentDidMount() {
        fetch_games_detailed().then(res => {
            if (res) { 
                this.setState({game_data : res})
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    onDownload(){
            const fileData = JSON.stringify(this.state.game_data);
            const blob = new Blob([fileData], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = 'game_data.json';
            link.href = url;
            link.click();
    }

    render() {
        return (
            <div style = {{height : "92vh", overflowY : "scroll"}}>
                <h1 className="text-center my-3">Game played - {this.state.game_data.length} </h1>
                <div className = "container">
                    <button onClick={() => this.onDownload()} className="btn btn-outline-secondary px-3" >
                        <i className="fa fa-download" style = {{color : "green"}}></i> Download
                    </button>
                    {this.state.game_data ? this.state.game_data.map((data, index)=>( 
                        <div style = {{margin : "20px 0px"}} key = {index}>
                            <ReactJson
                                src={data}
                                theme="colors"
                                name={"game "+index.toString()}
                                enableClipboard={false}
                                displayObjectSize={false}
                                displayDataTypes={false}
                                indentWidth={10}
                                collapsed={2}
                                style={{ padding: "20px", borderRadius: "10px", border: "1px solid #e3e3e3"}}
                            />
                        </div>
                    )):''}

                </div>
            </div>
        )
    }

}

export default AdminGenderDistribution