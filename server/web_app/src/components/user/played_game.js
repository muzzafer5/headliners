import React, { Component } from 'react'
import { fetch_played_games } from './ConnectServer'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css"

class PlayedGame extends Component {
    constructor() {
        super()
        this.state = {
            games: null,
            cat : ["Sports", "Entertainment", "Education", "Technology", "Politics", "Health"],
            errors: {}
        }
    }
    componentDidMount() {
        if (!localStorage.usertoken)
            this.props.history.push(`/auth/login`)
        else{
            fetch_played_games().then(res => {
                if(res){
                    for (var i=0;i<res.length;i++){
                        var  game = []
                        for (var j=0;j<this.state.cat.length;j++){
                            var obj = {
                                original: res[i].news[this.state.cat[j]].news_id.article.image,
                                thumbnail: res[i].news[this.state.cat[j]].news_id.article.image,
                                originalTitle: this.state.cat[j],
                                thumbnailTitle: this.state.cat[j],
                                description: res[i].news[this.state.cat[j]].news_id.article.title,
                            }
                            game.push(obj)
                        }
                        res[i] = game
                    }
                    this.setState({games : res})
                }
                else{
                    this.setState({ games: [] })
                }
            })
        }
    }
    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "20px"}}>
                {this.state.games ? (
                        this.state.games.length === 0 ?
                            (
                                <div style={{ textAlign: "center", color: "grey" }}>
                                    Not Played Any Game!
                                </div>
                            )
                            :
                            (
                                <div style={{ textAlign: "center", color: "grey" }}>
                                    {this.state.games.map((data, index) => (
                                        <div key={index} style={{ marginBottom: "20px" }}>
                                            <h3>Game {index + 1}</h3>
                                            <div style={{ backgroundColor: 'black', padding: "30px 30px 15px 30px", borderRadius: "10px", width: "80vw" }}>
                                                <ImageGallery
                                                    items={data}
                                                    thumbnailPosition="bottom"
                                                    onErrorImageURL="https://picsum.photos/id/1015/1000/600/"
                                                    showPlayButton={false}
                                                    showBullets={true}
                                                    slideDuration={400}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                ):(
                    <div style={{  display: "flex", justifyContent: "center", height: "70vh", alignItems: "center" }}>
                        <div style={{ fontSize: "50px", color: "grey" }}>
                            <i className="fa fa-spinner fa-pulse" aria-hidden="true"></i>
                        </div>
                    </div>
                )}
                
            </div>
        )
    }
}

export default PlayedGame