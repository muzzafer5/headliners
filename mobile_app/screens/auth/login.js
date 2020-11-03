import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Button, TextInput, TouchableOpacity } from 'react-native'
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
                if (data.error)
                    console.log(data.error)
                else {
                    await AsyncStorage.setItem('token', data)
                    this.props.navigation.replace('Home')
                }
            } catch (e) {
                console.log("error", e)
            }
        }).catch(err=>{
            console.log("error", err)
        }) 
    }

    render() {
        return (
            <View behavior="position" style={styles.container}>
                <StatusBar backgroundColor="#0fa7ff" barStyle="light-content" />
                <View >
                    <Text style={{ fontSize: 25, paddingHorizontal: 50, paddingBottom: 20 }} >Login</Text>
                    <Text>Username*</Text>
                    <TextInput
                        label='Username'
                        mode="outlined"
                        value={this.state.username}
                        style={{ borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => this.setState({ username: text })}
                    />
                    <Text>Password*</Text>
                    <TextInput
                        label='Password'
                        mode="outlined"
                        value={this.state.password}
                        style={{ borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => this.setState({ password: text })}
                    />
                </View>
                <View style={{ marginTop: 20 }}></View>
                <Button
                    title="Login"
                    onPress={() => this.onSubmit()}
                />
                <TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 18, marginTop: 10, color: "blue"
                        }}
                        onPress={() => this.props.navigation.replace("Signup")}
                    >Don't have a account ?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
})
export default Login