
import React, {Component} from 'react';

import {
    ActivityIndicator,
    View,
    StyleSheet,
    StatusBar
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

class Loading extends Component {
    componentDidMount() {
        this.check()
    }
    async check() {
        var token = await AsyncStorage.getItem('token')
        if (token == null)
            this.props.navigation.replace('Landing')
        else{
            this.props.navigation.replace('Home')
        }
    }
    render() {
        return (
            <View style={styles.loading}>
                <StatusBar backgroundColor="black" barStyle="light-content" />
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }
};



const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }

})

export default Loading