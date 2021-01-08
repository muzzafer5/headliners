import React, { Component } from 'react'
import { View, Text, Button, StatusBar, StyleSheet, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'

class Home extends Component {

    constructor() {
        super()
        this.state = {
            errors: {}
        }
        this.logout = this.logout.bind(this)
    }

    logout() {
        var props = this.props
        AsyncStorage.removeItem("token").then(() => {
            props.navigation.replace("Landing")
        })
    }

    
    clickLogout(){
        Alert.alert(
            "Headliners:",
            "Are you sure to logout ?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { 
                    text: "Yes", 
                    onPress: this.logout
                }
            ],
            { cancelable: false }
        );
    }
    componentDidMount() {
        this.check()
    }

    async check() {
        var token = await AsyncStorage.getItem('token')
        if (token == null)
            this.props.navigation.replace('Landing')
    }

    render() {

        return (
            <View style = {styles.container}>

                <StatusBar backgroundColor="black" barStyle="light-content" />
                    <View style={styles.header}>
                    <Text style={{ fontSize: 22, color: "white", fontFamily: "serif" }} onPress={() => this.props.navigation.replace('Home')}>Headliners</Text>
                        <View style = {{flexDirection : "row"}}>
                        <Icon name="person-circle-outline" size={28} color="white" style={{ paddingHorizontal: 20 }} onPress={() => this.props.navigation.replace('Profile')}/>
                            <Icon name="log-out-outline" size={28} color="white" onPress={() => this.clickLogout()} />
                        </View>
                    </View>

                    <View style = {styles.body}>
                        <Text style = {{fontSize : 35,fontFamily : "serif", textAlign : "center"}}>
                            Welcome to the Headliners
                        </Text>
                        <View style ={{flexDirection : "row", marginTop : 30,marginBottom : 50, justifyContent : "space-evenly"}}>
                            <Text style = {{borderWidth : 1,borderColor : "#cccccc",borderRadius : 5, fontSize : 16, paddingVertical : 5,paddingHorizontal : 10, color :"grey"}}>
                                Enter in the Game
                            </Text>
                            <Button
                                title = "    Start    "
                                onPress={() => this.props.navigation.replace('Game')}
                            />
                        
                        </View>
                    </View>
                    <View style = {styles.footer}>
                        <Text style = {{color : "white"}}>
                            © 2020 Headliners. All rights reserved
                        </Text>
                    </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    header : {
        flexDirection: "row", 
        justifyContent: "space-between", 
        backgroundColor: "#2b2b2b", 
        padding: 10
    },
    body: {
        flex: 1,
        justifyContent: "center"
    },
    footer: {
        backgroundColor: "#2b2b2b",
        paddingVertical: 10,
        alignItems : "center"
    }
})

export default Home