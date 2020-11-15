import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Button, TextInput, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { login } from './ConnectServer';
class Login extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    async onSubmit() {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        console.log(user)
        login(user).then(async (data) => {
            try {
                if (data.error){
                    console.log(data.error)
                    Alert.alert(
                        "Headliners:",
                        "Invalid Username or Password",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            }
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    await AsyncStorage.setItem('token', data)
                    this.props.navigation.replace('Home')
                }
            } catch (e) {
                console.log("error", e)
                Alert.alert(
                    "Headliners:",
                    "Invalid Username or Password",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                );
            }
        }).catch(err=>{
            console.log("error", err)
        }) 
    }

    render() {
        return (
            <View behavior="position" style={styles.container}>

                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Landing')}
                    >
                        <Text style={{ fontSize: 22, color: "white" }}>Headliners</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <View style = {styles.loginBox}>
                        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30, paddingVertical: 30 }} >Login</Text>

                        <Text style = {styles.textLabel}>Username</Text>
                        <TextInput
                            label='Username'
                            mode="outlined"
                            value={this.state.username}
                            style = {styles.textInput}
                            onChangeText={(text) => this.setState({ username: text })}
                        />
                        <Text style={styles.textLabel} >Password</Text>
                        <TextInput
                            label='Password'
                            mode="outlined"
                            value={this.state.password}
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({ password: text })}
                        />

                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                backgroundColor: "#1290ff",
                                paddingVertical: 8,
                                marginTop : 25,
                                elevation : 3
                            }}
                            onPress={() => this.onSubmit()}
                        >
                            <Text style={{ fontSize: 18, color: "white" }}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 15, marginTop: 20, color: "#1f5c99"
                                }}
                                onPress={() => this.props.navigation.replace("Signup")}
                            >* Don't have a account ?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#2b2b2b",
        padding: 10
    },
    body : {
        flex: 1, 
        justifyContent: "center",
    },
    loginBox: {
        borderColor: "white",
        flex : 1,
        paddingHorizontal : 20
    },
    textLabel: {
        fontSize : 16,
        marginTop : 15
    },
    textInput: { 
        borderColor: '#e8e8e8', 
        borderWidth: 1, 
        borderRadius: 10, 
        fontSize: 15, 
        color: "grey", 
        height: 40, 
        marginTop: 5, 
        paddingHorizontal: 10 
    }
})
export default Login