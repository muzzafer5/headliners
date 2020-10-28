import React, { Component } from 'react'
import { View, Text, Button, StatusBar, StyleSheet, Modal} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Test from '../auth/test'

class Home extends Component {

    constructor() {
        super()
        this.state = {
            show_consent_modal : false,
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

    onEnter(){
        this.setState({show_consent_modal : false})
        this.props.navigation.replace('Game')
    }

    render() {
        const ConsentModal = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show_consent_modal}
                onRequestClose={() => {
                    this.setState({show_consent_modal : false});
                }}
            >
                <View style = {styles.centeredView}>
                    <View style = {styles.modalView}>
                        <Text style = {{fontWeight : "bold", fontSize : 28}}>
                            Headlines Phase 1
                        </Text>
                        <Text style = {{marginVertical : 30, color : "red", fontSize : 18}}>
                            * News Headlines are being pulled from the most popular stations.
                            Swipe left (provide a left arrow for emphasis) if you would not share the headline to your social media community or right 
                            (provide a right arrow for emphasis) if you would share the headline. *
                        </Text>
                        <Button
                            title = "Enter"
                            onPress = {()=>this.onEnter()}
                        />
                    </View>
                </View>
            </Modal>
        )
        return (
            <View style = {styles.container}>
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
                        marginTop: 100,
                        marginLeft: 40,
                        marginRight: 40,
                    }}
                >
                    <Button
                        title = "Click to enter in the game"
                        onPress = {()=>this.setState({show_consent_modal : true})}
                    />
                </View>
                <View
                    style={{
                        marginTop: 200,
                        marginLeft: 40,
                        marginRight: 40,
                    }}
                >
                    <Button
                        title="Logout"
                        onPress={this.logout}
                    />
                </View>
                {ConsentModal}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    WelcomeText: {
        textAlign: "center",
        fontSize: 35,
        paddingTop: 20,
        paddingBottom: 10,
        color: "blue"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 40,
        paddingHorizontal : 30,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default Home