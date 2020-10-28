
import React, {Component} from 'react';

import {
    ActivityIndicator,
    View,
    StyleSheet,
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