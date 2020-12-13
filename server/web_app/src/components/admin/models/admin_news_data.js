import React, { Component } from 'react'
import { fetch_news } from '../ConnectServer'
import TableViewer from 'react-js-table-with-csv-dl';

class AdminGenderDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            news_data: [],
            headers: ["category", "country_code", "lang_code","article"]
        }
    }

    componentDidMount() {
        fetch_news().then(async res => {
            if (res) {
                for (var i = 0; i < res.length; i++) {
                    res[i].article = JSON.stringify(res[i].article)
                }
                this.setState({ news_data: res })
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        return (
            <div style={{ height: "93vh", overflowY: "scroll" }}>
                <div className="container">
                    <TableViewer
                        title={"News (Total - " + this.state.news_data.length + ")"}
                        content={this.state.news_data}
                        headers={this.state.headers}
                        minHeight={0}
                        maxHeight={400}
                        activateDownloadButton={true}
                        pagination={10}
                        caseInsensitive={true}
                        filename="news.csv"
                    />
                </div>
            </div>
        )
    }

}

export default AdminGenderDistribution