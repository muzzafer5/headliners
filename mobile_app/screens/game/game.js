
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    StyleSheet,
    Text,
    Button,
    Modal,
    Image
} from 'react-native';
import { fetch_news } from './ConnectServer'
import { TextInput } from 'react-native-gesture-handler';

class Game extends Component {
    constructor() {
        super()
        this.state = {
            show: 0,
            errors: {},
            show_headlines: false,
            show_headlines2: false,
            show_chart: false,
            show_chart2: false,
            show_feadback: false,
            shared: [],
            shared_with_media: [],
            cultural_values_1: null,
            cultural_values_2: null,
            cultural_values_3: null,
            cultural_values_4: null,
            cultural_values_5: null,
            cultural_values_6: null,
            fake_news_1: '',
            fake_news_2: '',
            fake_news_3: '',
            fake_news_4: '',
            fake_news_5: '',
            fake_news_6: '',
            feedback: [],
            news: {}
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onNextModal = this.onNextModal.bind(this)
        this.onShare = this.onShare.bind(this)
        this.onShare2 = this.onShare2.bind(this)
    }

    componentDidMount(){
        this.check()
    }

    async check() {
        var token = await AsyncStorage.getItem('token')
        if (token == null)
            this.props.navigation.replace('Login')
        else {
            this.setState({token : token})
        }
    }

    onCloseModal() {
        this.props.navigation.replace('Home')
    }

    onShare() {
        var title = this.state.news.title
        var shared_news = this.state.shared
        shared_news.push(title)
        this.setState({ shared: shared_news })
        this.onNextModal()
    }


    onShare2() {
        var title = this.state.news.title
        var shared_news = this.state.shared_with_media
        shared_news.push(title)
        this.setState({ shared_with_media: shared_news })
        this.onNextModal()
    }

    onNextModal() {
        if (this.state.show === 0) {
            this.setState({ show_headlines: true })
            fetch_news({ category: 'sports', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = {
                        title: res.title,
                        description: res.description,
                        urlToImage: res.urlToImage,
                        category: 'Sports',
                        index: '1'
                    }
                    this.setState({ news: content })
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ feedback: temp })
                }
            })
        }
        if (this.state.show === 1) {
            fetch_news({ category: 'entertainment', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = {
                        title: res.title,
                        description: res.description,
                        urlToImage: res.urlToImage,
                        category: 'Entertainment',
                        index: '2'
                    }
                    this.setState({ news: content })
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ feedback: temp })
                }
            })
        }
        if (this.state.show === 2) {
            fetch_news({ category: 'science', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = {
                        title: res.title,
                        description: res.description,
                        urlToImage: res.urlToImage,
                        category: 'Science',
                        index: '3'
                    }
                    this.setState({ news: content })
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ feedback: temp })
                }
            })
        }
        if (this.state.show === 3) {
            fetch_news({ category: 'technology', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = {
                        title: res.title,
                        description: res.description,
                        urlToImage: res.urlToImage,
                        category: 'Technology',
                        index: '4'
                    }
                    this.setState({ news: content })
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ feedback: temp })
                }
            })
        }
        if (this.state.show === 4) {
            fetch_news({ category: 'politics', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = {
                        title: res.title,
                        description: res.description,
                        urlToImage: res.urlToImage,
                        category: 'Politics',
                        index: '5'
                    }
                    this.setState({ news: content })
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ feedback: temp })
                }
            })
        }
        if (this.state.show === 5) {
            fetch_news({ category: 'health', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = {
                        title: res.title,
                        description: res.description,
                        urlToImage: res.urlToImage,
                        category: 'Health',
                        index: '6'
                    }
                    this.setState({ news: content })
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ feedback: temp })
                }
            })
        }

        if (this.state.show === 6) {
            this.setState({ show_headlines: false })
            this.setState({ show_chart: true })
        }
        if (this.state.show === 7) {
            this.setState({ show_chart: false })
        }
        if (this.state.show === 8) {
            this.setState({ show_headlines2: true })
            this.setState({ news: this.state.feedback[0] })
        }
        if (this.state.show === 9) {
            this.setState({ news: this.state.feedback[1] })
        }
        if (this.state.show === 10) {
            this.setState({ news: this.state.feedback[2] })
        }
        if (this.state.show === 11) {
            this.setState({ news: this.state.feedback[3] })
        }
        if (this.state.show === 12) {
            this.setState({ news: this.state.feedback[4] })
        }
        if (this.state.show === 13) {
            this.setState({ news: this.state.feedback[5] })
        }
        if (this.state.show === 14) {
            this.setState({ show_headlines2: false })
            this.setState({ show_chart2: true })
        }
        if (this.state.show === 15) {
            this.setState({ show_chart2: false })
            this.setState({ show_feadback: true })
        }
        this.setState({ show: this.state.show + 1 })
    }

    render() {

        const ConsentModal = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show === 0}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style ={{alignItems : "center"}}>
                            <Text style={{ fontWeight: "bold", fontSize: 28}}>
                                Phase 1
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,                             
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ paddingHorizontal: 15, fontFamily: "Lato"}}>
                            <Text style={{ fontSize: 14 }}>
                                News headlines are being pulled from the most popular stations.
                            </Text>
                            <Text style={{fontSize: 14}}>
                                Click on the button "<Text style={{ fontWeight: "bold" }}>Don't Share</Text>" if you would not share the news headline to your social media community, else click on the button "<Text style={{ fontWeight: "bold" }}>Share</Text>"".
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical : 15
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent : "space-around"}}>
                            <View >
                                <Button
                                    title="  Exit  "
                                    color="black"
                                    onPress = {this.onCloseModal}
                                />
                            </View>
                            <View >
                                <Button
                                    title="Enter"
                                    onPress={this.onNextModal}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )

        const ConsentModal2 = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show === 8}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                Phase 2
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ paddingHorizontal: 15, fontFamily: "Lato" }}>
                            <Text style={{ fontSize: 14 }}>
                                News headlines with media are being pulled from the most popular stations.
                            </Text>
                            <Text style={{ fontSize: 14 }}>
                                Click on the button "<Text style={{ fontWeight: "bold" }}>Don't Share</Text>" if you would not share the news headline to your social media community, else click on the button "<Text style={{ fontWeight: "bold" }}>Share</Text>"".
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                            <View >
                                <Button
                                    title="  Exit  "
                                    color="black"
                                    onPress={this.onCloseModal}
                                />
                            </View>
                            <View >
                                <Button
                                    title="Enter"
                                    onPress={this.onNextModal}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )


        const headline = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show_headlines}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                {this.state.news.category}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ paddingHorizontal: 15 }}>

                            {this.state.news ?
                                (
                                    <View>                              
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Title</Text>
                                        <Text style={{ fontSize: 14, textAlign: "justify" }}>{this.state.news.title}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>Description</Text>
                                        <Text style={{ fontSize: 14, textAlign: "justify" }}>{this.state.news.description}</Text>
                                    </View>
                                ) : <View/>}
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                            <View >
                                <Button
                                    title="Don't Share"
                                    color="black"
                                    onPress={this.onNextModal}
                                />
                            </View>
                            <View >
                                <Button
                                    title=" Share "
                                    color="black"
                                    onPress={this.onShare}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )

        const headline2 = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show_headlines2}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                {this.state.news.category}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ paddingHorizontal: 15 }}>

                            {this.state.news ?
                                (
                                    <View>
                                        <Image source={{ uri: this.state.news.urlToImage }} style={{ height: 250, width: "100%", justifyContent: "center" }} />
                                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Title</Text>
                                        <Text style={{ fontSize: 14, textAlign: "justify" }}>{this.state.news.title}</Text>
                                        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>Description</Text>
                                        <Text style={{ fontSize: 14, textAlign: "justify" }}>{this.state.news.description}</Text>
                                    </View>
                                ) : ''}
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                            <View >
                                <Button
                                    title="Don't Share"
                                    color="black"
                                    onPress={this.onNextModal}
                                />
                            </View>
                            <View >
                                <Button
                                    title=" Share "
                                    color="black"
                                    onPress={this.onShare2}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        )

        const pieChart = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show_chart}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                Chart (Phase 1)
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 14 }}>
                                {this.state.shared.length}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <Button
                            title="Move to phase 2"
                            onPress={this.onNextModal}
                        />
                    </View>
                </View>
            </Modal>
        )

        const pieChart2 = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show_chart2}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                Chart (Phase 2)
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ paddingHorizontal: 15 }}>
                            <Text style={{ fontSize: 14 }}>
                                {this.state.shared_with_media.length}
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <Button
                            title="Done"
                            onPress={this.onNextModal}
                        />
                    </View>
                </View>
            </Modal>
        )

        const feedback = (
            <Modal
                animationType="none"
                transparent={true}
                visible={this.state.show_feadback}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
                                Feedback
                            </Text>
                        </View>
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        {
                            this.state.feedback ? (
                                this.state.feedback.map((data,index)=>(
                                   <View key={index}> 
                                       <Text>{data.category}</Text>
                                    </View>
                                ))
                            ):<View/>
                        }
                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <Button
                            title="Submit"
                            onPress={this.onCloseModal}
                        />
                    </View>
                </View>
            </Modal>
        )

        return (
            <View style={styles.container}>
                {ConsentModal}
                {headline}
                {pieChart}
                {ConsentModal2}
                {pieChart2}
                {headline2}
                {feedback}
            </View>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#e9eef0"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalView: {
        marginHorizontal: 10,
        backgroundColor: "white",
        paddingVertical: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    }

})

export default Game