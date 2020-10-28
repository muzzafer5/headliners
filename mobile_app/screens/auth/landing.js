import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, StatusBar, Button, TouchableOpacity} from 'react-native'

class Landing extends Component {

    render(){
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <StatusBar backgroundColor="#0fa7ff" barStyle="light-content" />
                <Text 
                    style={styles.WelcomeText}
                >
                    Headliners
   
                </Text>

                <View
                    style={{
                        borderBottomColor: "grey",
                        borderBottomWidth: 3,
                        borderRadius: 10,
                        marginLeft : 30,
                        marginRight : 30
                    }}
                />
                <View 
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 500
                    }
                }>
                    <View style = {styles.AuthBox}>
                        <Text style={{ fontSize: 25, paddingHorizontal : 50, paddingBottom : 20}}>Join Headliners</Text>
                        <View style={{ paddingBottom: 20 }}>
                            <TouchableOpacity
                                style = {styles.button}
                                onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={{ fontSize: 23, color: "white"}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingBottom: 10 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('Signup')}
                            >

                                <Text style={{ fontSize: 23, color: "white", }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    WelcomeText: {
        textAlign : "center",
        fontSize: 35, 
        paddingTop: 20, 
        paddingBottom : 10,
        color: "blue"
    },
    AuthBox : {
        borderColor: "grey",
        borderWidth: 2,
        padding : 20
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1290ff",
        padding: 10,

    }
})
export default Landing