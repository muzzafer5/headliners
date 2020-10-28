
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    StyleSheet,
    Text,
    Button
} from 'react-native';

class Game extends Component {

    constructor() {
        super()
        this.state = {
            token: '',
            news: {
                title : '',
                description : '',
                urlToImage : ''
            },
        }
    }

    componentDidMount(){
        this.check()
    }

    async check() {
        var token = await AsyncStorage.getItem('token')
        if (token == null)
            this.props.navigation.replace('Login')
        else {
            this.setState({token : token})
            this.fetch_news()
        }
    }

    fetch_news() {
        const detail = {
            category: "sports"
        }
        fetch("http://10.0.2.2:5000/news/fetch", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'AUTHORIZATION': this.state.token
            },
            body: JSON.stringify(detail)
        }).then(res => res.json())
            .then((data) => {
                try {
                    if (data.error)
                        console.log(data.error)
                    else {
                        this.setState({news : data})
                    }
                } catch (e) {
                    console.log("error", e)
                }
            })
    }



    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 25, fontWeight: "bold"}}>
                    Title
                </Text>
                <Text style = {styles.title}>
                    {this.state.news.title}
                    {this.state.news.description}
                </Text>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor : "white"
    },
    title : {
        marginHorizontal: 20, 
        fontSize: 22,
        color : "brown"
    }

})

export default Game