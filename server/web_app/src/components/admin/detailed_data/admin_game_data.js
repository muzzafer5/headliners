import React, { Component } from 'react'
import { fetch_games_detailed } from '../ConnectServer'
import ReactJson from 'react-json-view'

class AdminGenderDistribution extends Component {

    constructor() {
        super()
        this.state = {
            errors: {},
            total_items : '',
            items : 10,
            page : 1,
            game_data : null
        }
    }

    componentDidMount() {
        this.onCallFetchGames()
    }

    onCallFetchGames(){
        this.setState({game_data : null})
        fetch_games_detailed({ skip: (this.state.page - 1) * this.state.items, limit: this.state.items }).then(res => {
            if (res) {
                this.setState({ game_data: res.games, total_items: res.count })
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
            link.download = 'games.json';
            link.href = url;
            link.click();
    }

    onDownloadAll() {
        fetch_games_detailed({ skip: 0, limit: this.state.total_items }).then(res => {
            if (res) {
                const fileData = JSON.stringify(res.games);
                const blob = new Blob([fileData], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'allGames.json';
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
            <div style = {{height : "92vh", overflowY : "scroll"}}>
                {this.state.game_data ? (
                    <div>
                        <h1 className="text-center my-3">Game played - {this.state.total_items} </h1>
                        <div className="container">
                            <button onClick={() => this.onDownload()} className="btn btn-outline-secondary px-3" >
                                <i className="fa fa-download" style={{ color: "green" }}></i> Download current page games
                            </button>
                            <button onClick={() => this.onDownloadAll()} style={{ float: "right" }} className="btn btn-outline-secondary px-3" >
                                <i className="fa fa-download" style={{ color: "green" }}></i> Download all games
                            </button>
                            {this.state.game_data.map((data, index) => (
                                <div style={{ margin: "20px 0px" }} key={index}>
                                    <ReactJson
                                        src={data}
                                        theme="colors"
                                        name={"game " + (index + (this.state.page - 1) * this.state.items + 1).toString()}
                                        enableClipboard={false}
                                        displayObjectSize={false}
                                        displayDataTypes={false}
                                        indentWidth={10}
                                        collapsed={2}
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
                                    onClick={() => this.setState({ page: 1 }, () => this.onCallFetchGames())}
                                >
                                    Go to First page
                            </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: Math.min(this.state.page + 1, Math.ceil(this.state.total_items / this.state.items)) }, () => this.onCallFetchGames())}
                                >
                                    Next page
                            </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: Math.max(this.state.page, 2) - 1 }, () => this.onCallFetchGames())}
                                >
                                    Prev page
                            </div>
                                <div
                                    style={{ cursor: "pointer", padding: "5px" }}
                                    onClick={() => this.setState({ page: Math.ceil(this.state.total_items / this.state.items) }, () => this.onCallFetchGames())}
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
                                        onClick={() => this.setState({ page: 1 }, () => this.onCallFetchGames())}
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

export default AdminGenderDistribution