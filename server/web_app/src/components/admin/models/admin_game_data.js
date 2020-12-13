import React, { Component } from 'react'
import { fetch_games } from '../ConnectServer'
import TableViewer from 'react-js-table-with-csv-dl';

class AdminGenderDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            game_data : [],
            headers: ["username", "country_code", "lang_code", "news"]
        }
    }

    componentDidMount() {
        fetch_games().then(async res => {
            if (res) {
                for (var i = 0; i < res.length; i++) {
                    res[i].username = res[i].user_id.username
                    res[i].news = JSON.stringify(res[i].news)
                    res[i].user_id = JSON.stringify(res[i].user_id)
                }
                this.setState({game_data : res})
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        return (
            <div style = {{height : "93vh", overflowY : "scroll"}}>
                <div className = "container">
                    <TableViewer
                        title={"Games (Total - " + this.state.game_data.length + ")"}
                        content={this.state.game_data}
                        headers={this.state.headers}
                        minHeight={0}
                        maxHeight={400}
                        activateDownloadButton={true}
                        pagination={10}
                        caseInsensitive={true}
                        filename="games.csv"
                    />
                </div>
            </div>
        )
    }

}

export default AdminGenderDistribution