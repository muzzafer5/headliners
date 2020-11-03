import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, StatusBar, Button, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

class Landing extends Component {

    componentDidMount() {
        this.check()
    }

    async check() {
        var token = await AsyncStorage.getItem('token')
        if (token !== null)
            this.props.navigation.replace('Home')
    }

    render() {

        return (
            <View style={styles.container}>

                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Landing')}
                    >
                        <Text style={{ fontSize: 22, color: "white" }}>Headliners</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>

                    <View style={styles.AuthBox}>
                        <Text style={{ fontSize: 26, paddingBottom: 20, fontWeight : "bold" }}>Join Headliners</Text>
                        <View style={{ paddingBottom: 20 }}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={{ fontSize: 21, color: "white" }}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View >
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => this.props.navigation.navigate('Signup')}
                            >
                                <Text style={{ fontSize: 21, color: "white", }}>Signup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

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
        alignItems: "center"
    },
    footer: {
        backgroundColor: "#2b2b2b",
        paddingVertical: 10,
        alignItems: "center"
    },
    AuthBox: {
        borderColor: "#ffffff",
        padding: 50,
        shadowColor: "#fafafa",
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.1,
        shadowRadius: 1.2,
        elevation: 6
    },
    button: {
        alignItems: "center",
        backgroundColor: "#1290ff",
        paddingVertical: 8,
        borderRadius : 30
    }
})

export default Landing