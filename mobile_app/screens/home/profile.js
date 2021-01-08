import React, { Component } from 'react'
import { View, Text, Button, StatusBar, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import {fetch_profile} from './ConnectServer'

class Profile extends Component {

    constructor() {
        super()
        this.state = {
            token : '',
            profile: null,
            errors: {}
        }
    }

    componentDidMount() {
        this.check()
    }

    logout() {
        var props = this.props
        AsyncStorage.removeItem("token").then(() => {
            props.navigation.replace("Landing")
        })
    }


    clickLogout() {
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

    async check() {
        var token = await AsyncStorage.getItem('token')
        if (token == null)
            this.props.navigation.replace('Landing')
        else{
            fetch_profile({token : token}).then(res => {
                this.setState({profile : res})
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="black" barStyle="light-content" />
                <View style={styles.header}>
                    <Text style={{ fontSize: 22, color: "white", fontFamily: "serif" }} onPress={() => this.props.navigation.replace('Home')}>Headliners</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Icon name="person-circle-outline" size={28} color="white" style={{ paddingHorizontal: 20 }} onPress={() => this.props.navigation.replace('Profile')} />
                        <Icon name="log-out-outline" size={28} color="white" onPress={() => this.clickLogout()} />
                    </View>
                </View>

                <View style={styles.body}>
                    <Text style={{ fontSize: 30, fontFamily: "serif", textAlign: "center" }}>
                        User Profile
                    </Text>
                    {this.state.profile ? (
                        <View style = {{borderWidth : 1, borderColor : "#f2f2f2", borderRadius : 10, padding : 30, marginVertical : 20}}>
                            <Text style = {styles.TextInfo}>Username : {this.state.profile.username}</Text>
                            <Text style={styles.TextInfo}>Profession : {this.state.profile.profession}</Text>
                            <Text style={styles.TextInfo}>Language : {this.state.profile.language}</Text>
                            <Text style={styles.TextInfo}>Gender : {this.state.profile.gender}</Text> 
                            <Text style={styles.TextInfo}>Age : {this.state.profile.age}</Text>
                            <Text style={styles.TextInfo}>Country : {this.state.profile.country}</Text>
                        </View>): (<ActivityIndicator size = "large" color = "blue" />)}
                </View>
                <View style={styles.footer}>
                    <Text style={{ color: "white" }}>
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
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#2b2b2b",
        padding: 10
    },
    body: {
        flex: 1,
        justifyContent: "center",
        alignItems : "center"
    },
    footer: {
        backgroundColor: "#2b2b2b",
        paddingVertical: 10,
        alignItems: "center"
    },
    TextInfo : {
        borderBottomWidth : 1,
        borderBottomColor: "#ebebeb",
        fontSize : 16,
        paddingTop : 15,
        color : "grey"
    }
})

export default Profile