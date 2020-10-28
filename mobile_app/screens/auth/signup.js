import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Button, TextInput, TouchableOpacity, Alert} from 'react-native'


class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '', 
            password: '',
            country: '',
            values: [],
            errors: {}
        }
    }

    onSubmit() {
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            country: "India",
            profession: "student"
        }
        console.log(newUser)
        fetch("http://10.0.2.2:5000/auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json())
            .then((data) => {
                try {
                    if(data.error)
                        console.log(data.error)
                    else{
                        console.log(data)
                        this.props.navigation.replace('Login')
                    }
                } catch (e) {
                    console.log("error", e)
                }
            })
    }

    render(){
        return (
            <View behavior="position" style={styles.container}>
                <StatusBar backgroundColor="#0fa7ff" barStyle="light-content" />
                <View >
                    <Text style={{ fontSize: 25, paddingHorizontal: 50, paddingBottom: 20 }} >Signup</Text>
                    <Text>Username*</Text>
                    <TextInput
                        label='Username'
                        mode="outlined"
                        value={this.state.username}
                        style={{ borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => this.setState({username : text})}
                    />
                    <Text>Password*</Text>
                    <TextInput
                        label='Password'
                        mode="outlined"
                        value={this.state.password}
                        style={{ borderColor: 'gray', borderBottomWidth: 1 }}
                        onChangeText={(text) => this.setState({password : text})}
                    />
                </View>
                <View style = {{marginTop : 20}}></View>
                <Button
                    title = "Signup"
                    onPress={() => this.onSubmit()}
                />
                <TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 18, marginLeft: 18, marginTop : 10, color: "blue"
                        }}
                        onPress={() => this.props.navigation.replace("Login")}
                    >Already have a account ?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent : "center",
        alignItems: "center"
    },
})
export default Signup