
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    View,
    StyleSheet,
    Text,
    Button,
    Modal,
    Image,
    ScrollView
} from 'react-native';
import { fetch_news } from './ConnectServer'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';

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
            errors: {},
            show_headlines: false,
            show_headlines2: false,
            show_chart: false,
            show_chart2: false,
            show_feadback: false,
            shared: [],
            shared_with_media: [],
            cultural_values_1: [],
            cultural_values_2: [],
            cultural_values_3: [],
            cultural_values_4: [],
            cultural_values_5: [],
            cultural_values_6: [],
            fake_news_1: '',
            fake_news_2: '',
            fake_news_3: '',
            fake_news_4: '',
            fake_news_5: '',
            fake_news_6: '',
            feedback: [],
            selectedItems: [],
            news: {}
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
        var title = this.state.news.title
        if(this.state.show < 7){
            var shared_news = this.state.shared
            shared_news.push(title)
            this.setState({ shared: shared_news })
            this.onNextModal()
        }
        else{
            var shared_news = this.state.shared_with_media
            shared_news.push(title)
            this.setState({ shared_with_media: shared_news })
            this.onNextModal()
        }

    }

    onNextModal() {
        if (this.state.show === 0) {
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
                    this.setState({ show_headlines: true })
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
                animationType="fade"
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
                    </View>
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
                    </View>
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
                                    <View style={{ justifyContent:"center", alignItems : "center" }}>
                                            <Text style={{ fontSize: 15, color: "#01402b"}}>
                                            Not shared
                                        </Text>
                                        <Text style={{ fontSize: 30, color : "white"}}>
                                                {6 - this.state.shared.length}
                                        </Text>                            
                                    </View>
                                }

                            </View>
                            <View style={{ flex: this.state.shared.length, height: 200, backgroundColor: "green", alignItems: "center", justifyContent : "center" }}>
                                {
                                    this.state.shared.length === 0 ? <Text></Text> :
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                            <Text style={{ fontSize: 15, color: "brown" }}>
                                                Shared
                                        </Text>
                                            <Text style={{ fontSize: 30, color: "white" }}>
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
                                            <Text style={{ fontSize: 15, color: "#01402b" }}>
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
                                            <Text style={{ fontSize: 15, color: "brown" }}>
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
                            this.state.feedback ? (
                                this.state.feedback.map((data,index)=>(
                                   <View key={index} style = {styles.feedback}> 
                                       <Text style = {{fontSize : 25, marginTop : 15, marginBottom : 20}}>{data.category}</Text>
                                        <Text style = {{fontSize : 16}}>News Title</Text>
                                        <Text style={{ fontSize: 16, color: "grey", fontWeight : "500" }}>{data.title}</Text>

                                        <Text style={{ fontSize: 16, marginTop: 15 }}>
                                            Involved Cultural values
                                        </Text>
                                        <View style={{ marginTop: 5, padding: 5, borderWidth: 1, borderColor : '#e8e8e8' }}>
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

                                        <Text style = {{fontSize : 16, marginTop : 15}}>
                                            Will you mark this news fake?
                                        </Text>
                                        <View
                                            style={styles.pickerInput}
                                        >
                                            <RNPickerSelect
                                                onValueChange={(value) => this.setState({ ['fake_news_' + data.index]: value })}
                                                items={[
                                                    { label: 'Select..', value: '', color: "#dedede" },
                                                    { label: 'Yes', value: 'yes', color: "grey" },
                                                    { label: 'No', value: 'no', color: "grey" }
                                                ]}
                                                placeholder={{}}
                                                value={this.state["fake_news_" + data.index]} 
                                            />
                                        </View>
 
                                    </View>
                                ))
                            ):<View/>
                        }
                        <View style={{ alignItems: "flex-start", marginVertical: 20, paddingHorizontal: 20 }}>
                            <Button
                                title="   Submit   "
                                onPress={this.onCloseModal}
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
    pickerInput: {
        borderWidth: 1,
        height: 45,
        marginTop: 5,
        marginBottom : 20,
        borderColor: '#e8e8e8'
    },
    feedback : {
        paddingHorizontal : 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,  
    }

})

export default Game