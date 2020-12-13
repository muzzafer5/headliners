import React, { Component } from 'react'
import { fetch_news_detailed } from '../ConnectServer'
import ReactJson from 'react-json-view'

class AdminNewsDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            news: null,
            page : 1,
            items : 10,
            total_items : ''
        }
    }
 
    componentDidMount() {
        this.onCallFetchNews()
    }

    onCallFetchNews(){
        this.setState({news : null})
        fetch_news_detailed({ skip: (this.state.page - 1) * this.state.items, limit: this.state.items }).then(res => {
            if (res) {
                this.setState({ news: res.news, total_items: res.count })
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    onDownload() {
        const fileData = JSON.stringify(this.state.news);
        const blob = new Blob([fileData], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'news.json';
        link.href = url;
        link.click();
    }

    onDownloadAll() {
        fetch_news_detailed({ skip: 0 , limit: this.state.total_items }).then(res => {
            if (res) {
                const fileData = JSON.stringify(res.news);
                const blob = new Blob([fileData], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'allNews.json';
                link.href = url;
                link.click();
            }
            else {
                this.props.history.push('/admin/home')
            }
        })
    }

    render() {
        return (
            <div style={{ height: "92vh", overflowY: "scroll" }}>
                {this.state.news ? (
                    <div>
                        <h1 className="text-center my-3">News - ( {this.state.total_items} )</h1>
                        <div className="container">
                            <button onClick={() => this.onDownload()} className="btn btn-outline-secondary px-3" >
                                <i className="fa fa-download" style={{ color: "green" }}></i> Download current page news
                            </button>
                            <button onClick={() => this.onDownloadAll()} style = {{float : "right"}} className="btn btn-outline-secondary px-3" >
                                <i className="fa fa-download" style={{ color: "green" }}></i> Download all news
                            </button>
                            {this.state.news.map((data, index) => (
                                <div style={{ margin: "20px 0px" }} key={index}>
                                    <ReactJson
                                        src={data}
                                        theme="colors"
                                        name={"News " + ((this.state.page - 1) * this.state.items + index + 1).toString()}
                                        enableClipboard={false}
                                        displayObjectSize={false}
                                        displayDataTypes={false}
                                        indentWidth={10}
                                        collapsed={3}
                                        style={{ padding: "20px", borderRadius: "10px", border: "1px solid #e3e3e3" }}
                                    />
                                </div>
                            ))}
                            <div className="pagination"
                                style={{
                                    padding: "3px 10px",
                                    flexDirection: "row",
                                    fontSize: "15px",
                                    fontFamily: "serif",
                                    color: "white",
                                    justifyContent: "space-between",
                                    backgroundColor: "#0076bf",
                                    borderRadius: "10px"
                                }}
                            >
                                <div
                                    style={{ padding: "5px" }}
                                >
                                    Total results: {this.state.total_items}
                                </div>
                                <div
                                    style={{ padding: "5px" }}
                                >
                                    Current page: {this.state.page}
                                </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: 1 }, () => this.onCallFetchNews())}
                                >
                                    Go to First page
                            </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: Math.min(this.state.page + 1, Math.ceil(this.state.total_items / this.state.items)) }, () => this.onCallFetchNews())}
                                >
                                    Next page
                            </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: Math.max(this.state.page, 2) - 1 }, () => this.onCallFetchNews())}
                                >
                                    Prev page
                            </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: Math.ceil(this.state.total_items / this.state.items) }, () => this.onCallFetchNews())}
                                >
                                    Last page
                            </div>
                                <div style={{ padding: "5px" }}>

                                    Max items per page
                                <input
                                        type="number"
                                        style={{ border: "none", outline: "none", marginLeft: "10px", width: "50px", color: "grey" }}
                                        name="items"
                                        min={1}
                                        required
                                        value={this.state.items}
                                        onChange={(e) => this.setState({ items: parseInt(e.target.value) })}
                                    />
                                    <span
                                        style={{ cursor: "pointer", marginLeft: "10px" }}
                                        onClick={() => this.setState({ page: 1 }, () => this.onCallFetchNews())}
                                    > Go
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) :
                    <div style={{ display: "flex", justifyContent: "center", height: "70vh", alignItems: "center" }}>
                        <div style={{ fontSize: "50px", color: "grey" }}>
                            <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default AdminNewsDistribution