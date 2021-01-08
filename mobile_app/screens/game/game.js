
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {
    View,
    StyleSheet,
    Text,
    Button,
    Modal,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator
} from 'react-native';

import { fetch_news, save_game } from './ConnectServer'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import MultiSelect from 'react-native-multiple-select';
import CheckBox from '@react-native-community/checkbox';

const cultural_values_options = [
    { value: 'Importance of Individual Goals', label: 'Importance of Individual Goals' },
    { value: 'Importance of Group Goals', label: 'Importance of Group Goals' },
    { value: 'Hierarchical Decision Making', label: 'Hierarchical Decision Making' },
    { value: 'Collaborative Decision Making', label: 'Collaborative Decision Making' },
    { value: 'Structured Rules', label: 'Structured Rules' },
    { value: 'Being Flexible in situations', label: 'Being Flexible in situations' },
    { value: 'Focus on Task Completion', label: 'Focus on Task Completion' },
    { value: 'Focus on Relationships', label: 'Focus on Relationships' },
    { value: 'Place focus on long-term benefits', label: 'Place focus on long-term benefits' },
    { value: 'Being quick in planning', label: 'Being quick in planning' },
    { value: 'Indirect Communication', label: 'Indirect Communication' },
    { value: 'Explicit communication', label: 'Explicit communication' },
    { value: 'Separate work and personal activities', label: 'Separate work and personal activities' },
    { value: 'A blending of work life and personal life', label: 'A blending of work life and personal life' },
    { value: 'Cultivate nurturing behaviors', label: 'Cultivate nurturing behaviors' },
    { value: 'Seek achievement behaviors', label: 'Seek achievement behaviors' }
];

class Game extends Component {
    constructor() {
        super()
        this.state = {
            show: 0,
            token : '',
            errors: {},
            show_headlines: false,
            show_headlines2: false,
            show_chart: false,
            show_chart2: false,
            show_feadback: false,
            loading: true,
            shared: [],
            shared_with_media: [],
            time: [],
            time_with_media: [],
            shared_with_media: [],
            cultural_values_1: [],
            cultural_values_2: [],
            cultural_values_3: [],
            cultural_values_4: [],
            cultural_values_5: [],
            cultural_values_6: [],
            fake_news_1: false,
            fake_news_2: false,
            fake_news_3: false,
            fake_news_4: false,
            fake_news_5: false,
            fake_news_6: false,
            current_date: '',
            feedback: [],
            selectedItems: [],
            news: null
        }
        this.onCloseModal = this.onCloseModal.bind(this)
        this.onNextModal = this.onNextModal.bind(this)
        this.onShare = this.onShare.bind(this)
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

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        console.log(this.state.selectedItems)
    };

    onCloseModal() {
        this.setState({
            show : -1,
            show_headlines: false,
            show_headlines2: false,
            show_chart: false,
            show_chart2: false,
            show_feadback: false
        }, this.props.navigation.replace('Home'))
    }

    onShare() {
        if(this.state.show < 7){
            var shared_news = this.state.shared
            shared_news.push(this.state.news.index)
            this.setState({ shared: shared_news })
            this.onNextModal()
        }
        else{
            var shared_news = this.state.shared_with_media
            shared_news.push(this.state.news.index)
            this.setState({ shared_with_media: shared_news })
            this.onNextModal()
        }

    }

    async onSubmit() {
        var game_data = {}
        for (var i = 1; i <= 6; i++) {
            if (this.state["cultural_values_" + i.toString()] === null || this.state["cultural_values_" + i.toString()].length === 0) {
                Alert.alert(
                    "Headliners:",
                    "Choose at least one cultural values for news article of " + this.state.feedback[i - 1].category
                );
                return;
            }
        }
        for (var i = 0; i < 6; i++) {
            var ind = this.state.feedback[i].index
            var cult = this.state["cultural_values_" + ind]
            var sr = this.state.shared.includes(ind)
            var srm = this.state.shared_with_media.includes(ind)
            var obj = {
                news_id: this.state.feedback[i].id,
                time_without_media: this.state.time[i],
                time_with_media: this.state.time_with_media[i],
                share_without_media: sr,
                share_with_media: srm,
                fake_news: this.state["fake_news_" + ind],
                cultural_values: cult
            }
            game_data[this.state.feedback[i].category] = obj
        }
        var detail = {
            news: game_data,
            token: this.state.token
        }
        this.onCloseModal()
        save_game(detail).then(res => {
            
        })
    }

    onNextModal() {
        if (this.state.show === 0) {
            this.setState({ current_date: new Date(), show_headlines: true })
            fetch_news({ category: 'sports', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = res
                    content.index = '1'
                    content.category = 'Sports'
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ news: content, feedback: temp })
                }
            })
        }
        if (this.state.show === 1) {
            var time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'entertainment', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = res
                    content.index = '2'
                    content.category = 'Entertainment'
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ news: content, feedback: temp })    
                }
            })
        }
        if (this.state.show === 2) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'science', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = res
                    content.index = '3'
                    content.category = 'Education'
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ news: content, feedback: temp })
                }
            })
        }
        if (this.state.show === 3) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'technology', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = res
                    content.index = '4'
                    content.category = 'Technology'
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ news: content, feedback: temp })
                }
            })
        }
        if (this.state.show === 4) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'politics', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                var content = res
                content.index = '5'
                content.category = 'Politics'
                var temp = this.state.feedback
                temp.push(content)
                this.setState({ news: content, feedback: temp })
            })
        }
        if (this.state.show === 5) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            fetch_news({ category: 'health', token: this.state.token }).then(res => {
                if (res.error) {
                    console.log("error")
                }
                else {
                    var content = res
                    content.index = '6'
                    content.category = 'Health'
                    var temp = this.state.feedback
                    temp.push(content)
                    this.setState({ news: content, feedback: temp })
                }
            })
        }

        if (this.state.show === 6) {
            time_arr = this.state.time
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time: time_arr })
            this.setState({ show_headlines: false })
            this.setState({ show_chart: true })
        }
        if (this.state.show === 7) {
            this.setState({ show_chart: false })
        }
        if (this.state.show === 8) {
            this.setState({ current_date: new Date(), show_headlines2: true })
            this.setState({ news: this.state.feedback[0] })
        }
        if (this.state.show === 9) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[1] })
        }
        if (this.state.show === 10) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[2] })
        }
        if (this.state.show === 11) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[3] })
        }
        if (this.state.show === 12) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[4] })
        }
        if (this.state.show === 13) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
            this.setState({ news: this.state.feedback[5] })
        }
        if (this.state.show === 14) {
            time_arr = this.state.time_with_media
            time_arr.push((new Date() - this.state.current_date) / 1000)
            this.setState({ current_date: new Date(), time_with_media: time_arr })
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
                animationType="fade"
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
                                <Text style={{ fontWeight: "bold" }}>Left swipe</Text> if you would not share the news headline to your social media community, else <Text style={{ fontWeight: "bold" }}>Right swipe</Text> to share the news.
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
                animationType="fade"
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
                                News headlines with <Text style={{ fontWeight: "bold" }}>media</Text> are being pulled from the most popular stations.
                            </Text>
                            <Text style={{ fontSize: 14 }}>
                                <Text style={{ fontWeight: "bold" }}>Left swipe</Text> if you would not share the news headline to your social media community, else <Text style={{ fontWeight: "bold" }}>Right swipe</Text> to share the news.
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
                animationType="fade"
                transparent={true}
                visible={this.state.show_headlines}
                onRequestClose={this.onCloseModal}
            >

                <View style={styles.centeredView}>
                    {this.state.news ? (
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
                                        ) : <View />}
                                </View>
                            </View>
                    ) : (<ActivityIndicator size="large" color="blue" />)}
                </View>
               
            </Modal>
        )

        const headline2 = (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.show_headlines2}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                {this.state.news ? 
                    (
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
                                            <Image source={{ uri: this.state.news.image }} style={{ height: 250, width: "100%", justifyContent: "center" }} />
                                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Title</Text>
                                            <Text style={{ fontSize: 14, textAlign: "justify" }}>{this.state.news.title}</Text>
                                            <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>Description</Text>
                                            <Text style={{ fontSize: 14, textAlign: "justify" }}>{this.state.news.description}</Text>
                                        </View>
                                    ) : ''}
                            </View>
                        </View>
                    ) : (
                    <ActivityIndicator size="large" color="blue" />)
                }
                </View>
            </Modal>
        )

        const pieChart = (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.show_chart}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28 }}>
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
                        <View style = {{flexDirection : "row", justifyContent : "center", paddingHorizontal : 10}}>
                            <View style={{flex : 6 - this.state.shared.length, height: 200, backgroundColor : "red", alignItems: "center",justifyContent : "center" }}>
                                {
                                    this.state.shared.length === 6 ? <Text></Text> :  
                                        <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 5 }}>
                                        <Text style={{ fontSize: 15, color: "white"}}>
                                            Not shared
                                        </Text>
                                            <Text style={{ fontSize: 30, color: "white", paddingHorizontal : 5}}>
                                                {6 - this.state.shared.length}
                                        </Text>                            
                                    </View>
                                }

                            </View>
                            <View style={{ flex: this.state.shared.length, height: 200, backgroundColor: "green", alignItems: "center", justifyContent : "center" }}>
                                {
                                    this.state.shared.length === 0 ? <Text></Text> :
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 15, color: "white", paddingHorizontal: 5  }}>
                                                Shared
                                        </Text>
                                            <Text style={{ fontSize: 30, color: "white", paddingHorizontal: 5  }}>
                                                {this.state.shared.length}
                                            </Text>
                                        </View>
                                }
                            </View>                     
                        </View>

                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style = {{alignItems : "center"}}>
                            <Button
                                title="Move to phase 2"
                                onPress={this.onNextModal}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )

        const pieChart2 = (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.show_chart2}
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
                        <View style={{ flexDirection: "row", justifyContent: "center", paddingHorizontal: 10 }}>
                            <View style={{ flex: 6 - this.state.shared_with_media.length, height: 200, backgroundColor: "red", alignItems: "center", justifyContent: "center" }}>
                                {
                                    this.state.shared_with_media.length === 6 ? <Text></Text> :
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 15, color: "white" }}>
                                                Not shared
                                        </Text>
                                            <Text style={{ fontSize: 30, color: "white" }}>
                                                {6 - this.state.shared_with_media.length}
                                            </Text>
                                        </View>
                                }

                            </View>
                            <View style={{ flex: this.state.shared_with_media.length, height: 200, backgroundColor: "green", alignItems: "center", justifyContent: "center" }}>
                                {
                                    this.state.shared_with_media.length === 0 ? <Text></Text> :
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 15, color: "white" }}>
                                                Shared
                                        </Text>
                                            <Text style={{ fontSize: 30, color: "white" }}>
                                                {this.state.shared_with_media.length}
                                            </Text>
                                        </View>
                                }
                            </View>
                        </View>

                        <View
                            style={{
                                borderBottomColor: "#f2f2f2",
                                borderBottomWidth: 1,
                                alignSelf: 'stretch',
                                marginVertical: 15
                            }}
                        />
                        <View style={{ alignItems: "center" }}>
                            <Button
                                title="Done"
                                onPress={this.onNextModal}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        )

        const feedback = (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.show_feadback}
                onRequestClose={this.onCloseModal}
            >
                <View style={styles.centeredView}>
                    <View style={{
                        backgroundColor: "white",
                        width: "100%",
                    }}>
                        <ScrollView>
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontWeight: "bold", fontSize: 28, marginTop : 15 }}>
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
                                this.state.feedback.map((data,index)=>(
                                   <View key={index} style = {styles.feedback}> 
                                       <Text style = {{fontSize : 21, marginTop : 15, marginBottom : 20}}>{data.category}</Text>
                                        <Text style = {{fontSize : 15, fontWeight : "bold", fontFamily : "serif"}}>News Title</Text>
                                        <Text style={{ fontSize: 14, color: "grey", fontWeight: "500", paddingVertical : 5 }}>{data.title}</Text>

                                        <View style = {{fontSize : 13, fontFamily : "serif"}}>
                                            {this.state.shared.includes(data.index) ? (
                                                <Text>
                                                    ~ Shared without media
                                                </Text>) : (
                                                <Text>
                                                        ~ Not shared without media
                                                </Text>)
                                            }
                                            {this.state.shared_with_media.includes(data.index) ? (
                                                <Text>
                                                    ~ Shared with media
                                                </Text>) : (
                                                <Text>
                                                    ~ Not shared with media
                                                </Text>)
                                            }
                                        </View>

                                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                                            <CheckBox
                                                disabled={false}
                                                value={this.state["fake_news_" + data.index]}
                                                onValueChange={(newValue) => this.setState({ ['fake_news_' + data.index]: newValue })}
                                            />
                                            <Text style={{ fontSize: 15, fontFamily : "serif", marginTop : 5 }}>
                                                Will you mark this news fake?
                                            </Text>
                                        </View>

                                        <Text style={{ fontSize: 15, marginTop: 10, fontFamily: "serif", }}>
                                            Involved Cultural values
                                        </Text>
                                        <View style={{ marginTop: 5,marginBottom : 15,  paddingHorizontal: 5, borderWidth: 1, borderColor : '#e8e8e8', borderRadius : 2 }}>
                                            <MultiSelect
                                                items={cultural_values_options}
                                                uniqueKey="value"
                                                ref={(component) => { this.multiSelect = component }}
                                                onSelectedItemsChange={(items) => this.setState({ ["cultural_values_" + data.index]: items })}
                                                selectedItems={this.state["cultural_values_" + data.index]}
                                                selectText="Select..."
                                                searchInputPlaceholderText="Search Values..."
                                                altFontFamily="ProximaNova-Light"
                                                selectedItemTextColor="green"
                                                selectedItemIconColor="green"
                                                itemTextColor="grey"
                                                displayKey="label"
                                                hideTags={true}
                                                hideSubmitButton={true}
                                            />
                                        </View>
                                    </View>
                                ))
                        }
                        <View style={{ alignItems: "flex-start", marginVertical: 20, paddingHorizontal: 20 }}>
                            <Button
                                title="   Submit   "
                                onPress={()=>this.onSubmit()}
                            />
                        </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        )

        const config = {
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80
        };

        return (
            <View style={styles.container}>
                <GestureRecognizer
                    onSwipeLeft={this.onNextModal}
                    onSwipeRight={this.onShare}
                    config={config}
                >   
                    {headline}
                    {headline2}
                </GestureRecognizer>
                {ConsentModal}
                {pieChart}
                {ConsentModal2}
                {pieChart2}
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
        backgroundColor: "white",
        paddingTop: 15,
        paddingBottom : 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        width : "95%",
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    feedback : {
        paddingHorizontal : 20,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
    }

})

export default Game