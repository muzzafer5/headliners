import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, Button, Alert, TextInput, TouchableOpacity, SafeAreaView} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select';
import CheckBox from '@react-native-community/checkbox';
import { signup } from './ConnectServer';
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

class Signup extends Component {

    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            country: '',
            profession: '',
            gender: '',
            age: '',
            cultural_values: [],
            agree : false,
            empty: ''
        }
    }

    async onSubmit() {
        if(this.state.username === ''){
            this.setState({empty : 'username'})
            return ;
        }
        if (this.state.password === '') {
            this.setState({ empty: 'password' })
            return;
        }
        if (this.state.age === '') {
            this.setState({ empty: 'age' })
            return;
        }
        if (this.state.gender === '') {
            this.setState({ empty: 'gender' })
            return;
        }
        if (this.state.country === '') {
            this.setState({ empty: 'country' })
            return;
        }
        if (this.state.profession === '') {
            this.setState({ empty: 'profession' })
            return;
        }
        if (this.state.cultural_values.length === 0){
            this.setState({ empty: 'cultural_values' })
            return;
        }
        if(this.state.agree == false){
            this.setState({ empty: 'agree' })
            return;         
        }
        const newUser = {
            username: this.state.username,
            password: this.state.password,
            country: this.state.country,
            profession : this.state.profession,
            gender : this.state.gender,
            age : this.state.age,
            cultural_values : this.state.cultural_values
        }
        console.log(newUser)

        signup(newUser).then(async (data) => {
            try {
                if (data.error){
                    console.log(data.error)
                    Alert.alert(
                        "Headliners:",
                        "Username already exist",
                        [
                            {
                                text: "Cancel",
                                style: "cancel"
                            }
                        ],
                        { cancelable: false }
                    );
                }
                else {
                    this.props.navigation.replace('Login')
                }
            } catch (e) {
                console.log("error", e)
                Alert.alert(
                    "Headliners:",
                    "Username already exist",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        }
                    ],
                    { cancelable: false }
                );
            }
        }).catch(err => {
            console.log("error", err)
        }) 
    }

    render() {
        return (
            <KeyboardAwareScrollView style = {styles.container}>
                <StatusBar backgroundColor="black" barStyle="light-content" />

                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Landing')}
                    >
                        <Text style={{ fontSize: 22, color: "white" }}>Headliners</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.body} >

                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 30, paddingVertical: 30 }} >Signup</Text>

                    <View style={styles.signupBox}>
                        <Text style={styles.textLabel}>Username <Text style = {{color : "grey"}}>*</Text></Text>
                        <TextInput
                            label='Username'
                            mode="outlined"
                            value={this.state.username}
                            style={[styles.textInput, {borderColor: this.state.empty === 'username'? 'red' : '#e8e8e8'}]}
                            onChangeText={(text) => this.setState({ username: text },this.setState({empty : ''}))}
                        />
                        <Text style={styles.textLabel} >Password <Text style={{ color: "grey" }}>*</Text></Text>
                        <TextInput
                            label='Password'
                            mode="outlined"
                            value={this.state.password}
                            style={[styles.textInput, { borderColor: this.state.empty === 'password' ? 'red' : '#e8e8e8' }]}
                            onChangeText={(text) => this.setState({ password: text }, this.setState({ empty: '' }))}
                        />
                        <Text style={styles.textLabel}>Age <Text style={{ color: "grey" }}>*</Text></Text>
                        <TextInput
                            label='Age'
                            mode="outlined"
                            keyboardType='numeric'
                            value={this.state.age}
                            style={[styles.textInput, { borderColor: this.state.empty === 'age' ? 'red' : '#e8e8e8' }]}
                            onChangeText={(text) => this.setState({ age: text }, this.setState({ empty: '' }))}
                        />
                        <Text 
                            style={styles.textLabel}
                        >
                            Gender <Text style={{ color: "grey" }}>*</Text>
                        </Text>
                        <View 
                            style={[styles.pickerInput, { borderColor: this.state.empty === 'gender' ? 'red' : '#e8e8e8' }]}
                        >
                            <RNPickerSelect
                                onValueChange={(value) => this.setState({ gender: value }, this.setState({ empty: '' }))}
                                items={[
                                    { label: 'Select..', value: '', color: "#dedede" },
                                    { label: 'Male', value: 'male', color: "grey" },
                                    { label: 'Female', value: 'female', color: "grey" }
                                ]}
                                placeholder={{}}
                                value={this.state.gender}
                            />
                        </View>
                        <Text 
                            style={styles.textLabel}
                        >
                            Country <Text style={{ color: "grey" }}>*</Text>
                        </Text>
                        <View
                            style={[styles.pickerInput, { borderColor: this.state.empty === 'country' ? 'red' : '#e8e8e8' }]}
                        >
                            <RNPickerSelect
                                onValueChange={(value) => this.setState({ country: value }, this.setState({ empty: '' }))}
                                items={[
                                    { label: 'Select..', value: '', color: "#dedede" },
                                    { label: 'Afghanistan', value: 'Afghanistan', color: 'grey' },
                                    { label: 'Aland Islands', value: 'Aland Islands', color: 'grey' },
                                    { label: 'Albania', value: 'Albania', color: 'grey' },
                                    { label: 'Algeria', value: 'Algeria', color: 'grey' },
                                    { label: 'American Samoa', value: 'American Samoa', color: 'grey' },
                                    { label: 'Andorra', value: 'Andorra', color: 'grey' },
                                    { label: 'Angola', value: 'Angola', color: 'grey' },
                                    { label: 'Anguilla', value: 'Anguilla', color: 'grey' },
                                    { label: 'Antarctica', value: 'Antarctica', color: 'grey' },
                                    { label: 'Antigua and Barbuda', value: 'Antigua and Barbuda', color: 'grey' },
                                    { label: 'Argentina', value: 'Argentina', color: 'grey' },
                                    { label: 'Armenia', value: 'Armenia', color: 'grey' },
                                    { label: 'Aruba', value: 'Aruba', color: 'grey' },
                                    { label: 'Australia', value: 'Australia', color: 'grey' },
                                    { label: 'Austria', value: 'Austria', color: 'grey' },
                                    { label: 'Azerbaijan', value: 'Azerbaijan', color: 'grey' },
                                    { label: 'Bahamas', value: 'Bahamas', color: 'grey' },
                                    { label: 'Bahrain', value: 'Bahrain', color: 'grey' },
                                    { label: 'Bangladesh', value: 'Bangladesh', color: 'grey' },
                                    { label: 'Barbados', value: 'Barbados', color: 'grey' },
                                    { label: 'Belarus', value: 'Belarus', color: 'grey' },
                                    { label: 'Belgium', value: 'Belgium', color: 'grey' },
                                    { label: 'Belize', value: 'Belize', color: 'grey' },
                                    { label: 'Benin', value: 'Benin', color: 'grey' },
                                    { label: 'Bermuda', value: 'Bermuda', color: 'grey' },
                                    { label: 'Bhutan', value: 'Bhutan', color: 'grey' },
                                    { label: 'Bolivia', value: 'Bolivia', color: 'grey' },
                                    { label: 'Bosnia and Herzegovina', value: 'Bosnia and Herzegovina', color: 'grey' },
                                    { label: 'Botswana', value: 'Botswana', color: 'grey' },
                                    { label: 'Bouvet Island', value: 'Bouvet Island', color: 'grey' },
                                    { label: 'Brazil', value: 'Brazil', color: 'grey' },
                                    { label: 'British Indian Ocean Territory', value: 'British Indian Ocean Territory', color: 'grey' },
                                    { label: 'Brunei Darussalam', value: 'Brunei Darussalam', color: 'grey' },
                                    { label: 'Bulgaria', value: 'Bulgaria', color: 'grey' },
                                    { label: 'Burkina Faso', value: 'Burkina Faso', color: 'grey' },
                                    { label: 'Burundi', value: 'Burundi', color: 'grey' },
                                    { label: 'Cambodia', value: 'Cambodia', color: 'grey' },
                                    { label: 'Cameroon', value: 'Cameroon', color: 'grey' },
                                    { label: 'Canada', value: 'Canada', color: 'grey' },
                                    { label: 'Cape Verde', value: 'Cape Verde', color: 'grey' },
                                    { label: 'Cayman Islands', value: 'Cayman Islands', color: 'grey' },
                                    { label: 'Central African Republic', value: 'Central African Republic', color: 'grey' },
                                    { label: 'Chad', value: 'Chad', color: 'grey' },
                                    { label: 'Chile', value: 'Chile', color: 'grey' },
                                    { label: 'China', value: 'China', color: 'grey' },
                                    { label: 'Christmas Island', value: 'Christmas Island', color: 'grey' },
                                    { label: 'Cocos (Keeling) Islands', value: 'Cocos (Keeling) Islands', color: 'grey' },
                                    { label: 'Colombia', value: 'Colombia', color: 'grey' },
                                    { label: 'Comoros', value: 'Comoros', color: 'grey' },
                                    { label: 'Congo', value: 'Congo', color: 'grey' },
                                    { label: 'Congo, The Democratic Republic of The', value: 'Congo, The Democratic Republic of The', color: 'grey' },
                                    { label: 'Cook Islands', value: 'Cook Islands', color: 'grey' },
                                    { label: 'Costa Rica', value: 'Costa Rica', color: 'grey' },
                                    { label: 'Cote D\'ivoire', value : 'Cote D\'ivoire', color: 'grey' },
                                    { label: 'Croatia', value: 'Croatia', color: 'grey' },
                                    { label: 'Cuba', value: 'Cuba', color: 'grey' },
                                    { label: 'Cyprus', value: 'Cyprus', color: 'grey' },
                                    { label: 'Czech Republic', value: 'Czech Republic', color: 'grey' },
                                    { label: 'Denmark', value: 'Denmark', color: 'grey' },
                                    { label: 'Djibouti', value: 'Djibouti', color: 'grey' },
                                    { label: 'Dominica', value: 'Dominica', color: 'grey' },
                                    { label: 'Dominican Republic', value: 'Dominican Republic', color: 'grey' },
                                    { label: 'Ecuador', value: 'Ecuador', color: 'grey' },
                                    { label: 'Egypt', value: 'Egypt', color: 'grey' },
                                    { label: 'El Salvador', value: 'El Salvador', color: 'grey' },
                                    { label: 'Equatorial Guinea', value: 'Equatorial Guinea', color: 'grey' },
                                    { label: 'Eritrea', value: 'Eritrea', color: 'grey' },
                                    { label: 'Estonia', value: 'Estonia', color: 'grey' },
                                    { label: 'Ethiopia', value: 'Ethiopia', color: 'grey' },
                                    { label: 'Falkland Islands (Malvinas)', value: 'Falkland Islands (Malvinas)', color: 'grey' },
                                    { label: 'Faroe Islands', value: 'Faroe Islands', color: 'grey' },
                                    { label: 'Fiji', value: 'Fiji', color: 'grey' },
                                    { label: 'Finland', value: 'Finland', color: 'grey' },
                                    { label: 'France', value: 'France', color: 'grey' },
                                    { label: 'French Guiana', value: 'French Guiana', color: 'grey' },
                                    { label: 'French Polynesia', value: 'French Polynesia', color: 'grey' },
                                    { label: 'French Southern Territories', value: 'French Southern Territories', color: 'grey' },
                                    { label: 'Gabon', value: 'Gabon', color: 'grey' },
                                    { label: 'Gambia', value: 'Gambia', color: 'grey' },
                                    { label: 'Georgia', value: 'Georgia', color: 'grey' },
                                    { label: 'Germany', value: 'Germany', color: 'grey' },
                                    { label: 'Ghana', value: 'Ghana', color: 'grey' },
                                    { label: 'Gibraltar', value: 'Gibraltar', color: 'grey' },
                                    { label: 'Greece', value: 'Greece', color: 'grey' },
                                    { label: 'Greenland', value: 'Greenland', color: 'grey' },
                                    { label: 'Grenada', value: 'Grenada', color: 'grey' },
                                    { label: 'Guadeloupe', value: 'Guadeloupe', color: 'grey' },
                                    { label: 'Guam', value: 'Guam', color: 'grey' },
                                    { label: 'Guatemala', value: 'Guatemala', color: 'grey' },
                                    { label: 'Guernsey', value: 'Guernsey', color: 'grey' },
                                    { label: 'Guinea', value: 'Guinea', color: 'grey' },
                                    { label: 'Guinea-bissau', value: 'Guinea-bissau', color: 'grey' },
                                    { label: 'Guyana', value: 'Guyana', color: 'grey' },
                                    { label: 'Haiti', value: 'Haiti', color: 'grey' },
                                    { label: 'Heard Island and Mcdonald Islands', value: 'Heard Island and Mcdonald Islands', color: 'grey' },
                                    { label: 'Holy See (Vatican City State)', value: 'Holy See (Vatican City State)', color: 'grey' },
                                    { label: 'Honduras', value: 'Honduras', color: 'grey' },
                                    { label: 'Hong Kong', value: 'Hong Kong', color: 'grey' },
                                    { label: 'Hungary', value: 'Hungary', color: 'grey' },
                                    { label: 'Iceland', value: 'Iceland', color: 'grey' },
                                    { label: 'India', value: 'India', color: 'grey' },
                                    { label: 'Indonesia', value: 'Indonesia', color: 'grey' },
                                    { label: 'Iran, Islamic Republic of', value: 'Iran, Islamic Republic of', color: 'grey' },
                                    { label: 'Iraq', value: 'Iraq', color: 'grey' },
                                    { label: 'Ireland', value: 'Ireland', color: 'grey' },
                                    { label: 'Isle of Man', value: 'Isle of Man', color: 'grey' },
                                    { label: 'Israel', value: 'Israel', color: 'grey' },
                                    { label: 'Italy', value: 'Italy', color: 'grey' },
                                    { label: 'Jamaica', value: 'Jamaica', color: 'grey' },
                                    { label: 'Japan', value: 'Japan', color: 'grey' },
                                    { label: 'Jersey', value: 'Jersey', color: 'grey' },
                                    { label: 'Jordan', value: 'Jordan', color: 'grey' },
                                    { label: 'Kazakhstan', value: 'Kazakhstan', color: 'grey' },
                                    { label: 'Kenya', value: 'Kenya', color: 'grey' },
                                    { label: 'Kiribati', value: 'Kiribati', color: 'grey' },
                                    { label: 'Korea, Democratic People\'s Republic of', value : 'Korea, Democratic People\'s Republic of', color: 'grey' },
                                    { label: 'Korea, Republic of', value: 'Korea, Republic of', color: 'grey' },
                                    { label: 'Kuwait', value: 'Kuwait', color: 'grey' },
                                    { label: 'Kyrgyzstan', value: 'Kyrgyzstan', color: 'grey' },
                                    { label: 'Lao People\'s Democratic Republic', value : 'Lao People\'s Democratic Republic', color: 'grey' },
                                    { label: 'Latvia', value: 'Latvia', color: 'grey' },
                                    { label: 'Lebanon', value: 'Lebanon', color: 'grey' },
                                    { label: 'Lesotho', value: 'Lesotho', color: 'grey' },
                                    { label: 'Liberia', value: 'Liberia', color: 'grey' },
                                    { label: 'Libyan Arab Jamahiriya', value: 'Libyan Arab Jamahiriya', color: 'grey' },
                                    { label: 'Liechtenstein', value: 'Liechtenstein', color: 'grey' },
                                    { label: 'Lithuania', value: 'Lithuania', color: 'grey' },
                                    { label: 'Luxembourg', value: 'Luxembourg', color: 'grey' },
                                    { label: 'Macao', value: 'Macao', color: 'grey' },
                                    { label: 'Macedonia, The Former Yugoslav Republic of', value: 'Macedonia, The Former Yugoslav Republic of', color: 'grey' },
                                    { label: 'Madagascar', value: 'Madagascar', color: 'grey' },
                                    { label: 'Malawi', value: 'Malawi', color: 'grey' },
                                    { label: 'Malaysia', value: 'Malaysia', color: 'grey' },
                                    { label: 'Maldives', value: 'Maldives', color: 'grey' },
                                    { label: 'Mali', value: 'Mali', color: 'grey' },
                                    { label: 'Malta', value: 'Malta', color: 'grey' },
                                    { label: 'Marshall Islands', value: 'Marshall Islands', color: 'grey' },
                                    { label: 'Martinique', value: 'Martinique', color: 'grey' },
                                    { label: 'Mauritania', value: 'Mauritania', color: 'grey' },
                                    { label: 'Mauritius', value: 'Mauritius', color: 'grey' },
                                    { label: 'Mayotte', value: 'Mayotte', color: 'grey' },
                                    { label: 'Mexico', value: 'Mexico', color: 'grey' },
                                    { label: 'Micronesia, Federated States of', value: 'Micronesia, Federated States of', color: 'grey' },
                                    { label: 'Moldova, Republic of', value: 'Moldova, Republic of', color: 'grey' },
                                    { label: 'Monaco', value: 'Monaco', color: 'grey' },
                                    { label: 'Mongolia', value: 'Mongolia', color: 'grey' },
                                    { label: 'Montenegro', value: 'Montenegro', color: 'grey' },
                                    { label: 'Montserrat', value: 'Montserrat', color: 'grey' },
                                    { label: 'Morocco', value: 'Morocco', color: 'grey' },
                                    { label: 'Mozambique', value: 'Mozambique', color: 'grey' },
                                    { label: 'Myanmar', value: 'Myanmar', color: 'grey' },
                                    { label: 'Namibia', value: 'Namibia', color: 'grey' },
                                    { label: 'Nauru', value: 'Nauru', color: 'grey' },
                                    { label: 'Nepal', value: 'Nepal', color: 'grey' },
                                    { label: 'Netherlands', value: 'Netherlands', color: 'grey' },
                                    { label: 'Netherlands Antilles', value: 'Netherlands Antilles', color: 'grey' },
                                    { label: 'New Caledonia', value: 'New Caledonia', color: 'grey' },
                                    { label: 'New Zealand', value: 'New Zealand', color: 'grey' },
                                    { label: 'Nicaragua', value: 'Nicaragua', color: 'grey' },
                                    { label: 'Niger', value: 'Niger', color: 'grey' },
                                    { label: 'Nigeria', value: 'Nigeria', color: 'grey' },
                                    { label: 'Niue', value: 'Niue', color: 'grey' },
                                    { label: 'Norfolk Island', value: 'Norfolk Island', color: 'grey' },
                                    { label: 'Northern Mariana Islands', value: 'Northern Mariana Islands', color: 'grey' },
                                    { label: 'Norway', value: 'Norway', color: 'grey' },
                                    { label: 'Oman', value: 'Oman', color: 'grey' },
                                    { label: 'Pakistan', value: 'Pakistan', color: 'grey' },
                                    { label: 'Palau', value: 'Palau', color: 'grey' },
                                    { label: 'Palestinian Territory, Occupied', value: 'Palestinian Territory, Occupied', color: 'grey' },
                                    { label: 'Panama', value: 'Panama', color: 'grey' },
                                    { label: 'Papua New Guinea', value: 'Papua New Guinea', color: 'grey' },
                                    { label: 'Paraguay', value: 'Paraguay', color: 'grey' },
                                    { label: 'Peru', value: 'Peru', color: 'grey' },
                                    { label: 'Philippines', value: 'Philippines', color: 'grey' },
                                    { label: 'Pitcairn', value: 'Pitcairn', color: 'grey' },
                                    { label: 'Poland', value: 'Poland', color: 'grey' },
                                    { label: 'Portugal', value: 'Portugal', color: 'grey' },
                                    { label: 'Puerto Rico', value: 'Puerto Rico', color: 'grey' },
                                    { label: 'Qatar', value: 'Qatar', color: 'grey' },
                                    { label: 'Reunion', value: 'Reunion', color: 'grey' },
                                    { label: 'Romania', value: 'Romania', color: 'grey' },
                                    { label: 'Russian Federation', value: 'Russian Federation', color: 'grey' },
                                    { label: 'Rwanda', value: 'Rwanda', color: 'grey' },
                                    { label: 'Saint Helena', value: 'Saint Helena', color: 'grey' },
                                    { label: 'Saint Kitts and Nevis', value: 'Saint Kitts and Nevis', color: 'grey' },
                                    { label: 'Saint Lucia', value: 'Saint Lucia', color: 'grey' },
                                    { label: 'Saint Pierre and Miquelon', value: 'Saint Pierre and Miquelon', color: 'grey' },
                                    { label: 'Saint Vincent and The Grenadines', value: 'Saint Vincent and The Grenadines', color: 'grey' },
                                    { label: 'Samoa', value: 'Samoa', color: 'grey' },
                                    { label: 'San Marino', value: 'San Marino', color: 'grey' },
                                    { label: 'Sao Tome and Principe', value: 'Sao Tome and Principe', color: 'grey' },
                                    { label: 'Saudi Arabia', value: 'Saudi Arabia', color: 'grey' },
                                    { label: 'Senegal', value: 'Senegal', color: 'grey' },
                                    { label: 'Serbia', value: 'Serbia', color: 'grey' },
                                    { label: 'Seychelles', value: 'Seychelles', color: 'grey' },
                                    { label: 'Sierra Leone', value: 'Sierra Leone', color: 'grey' },
                                    { label: 'Singapore', value: 'Singapore', color: 'grey' },
                                    { label: 'Slovakia', value: 'Slovakia', color: 'grey' },
                                    { label: 'Slovenia', value: 'Slovenia', color: 'grey' },
                                    { label: 'Solomon Islands', value: 'Solomon Islands', color: 'grey' },
                                    { label: 'Somalia', value: 'Somalia', color: 'grey' },
                                    { label: 'South Africa', value: 'South Africa', color: 'grey' },
                                    { label: 'South Georgia and The South Sandwich Islands', value: 'South Georgia and The South Sandwich Islands', color: 'grey' },
                                    { label: 'Spain', value: 'Spain', color: 'grey' },
                                    { label: 'Sri Lanka', value: 'Sri Lanka', color: 'grey' },
                                    { label: 'Sudan', value: 'Sudan', color: 'grey' },
                                    { label: 'Suriname', value: 'Suriname', color: 'grey' },
                                    { label: 'Svalbard and Jan Mayen', value: 'Svalbard and Jan Mayen', color: 'grey' },
                                    { label: 'Swaziland', value: 'Swaziland', color: 'grey' },
                                    { label: 'Sweden', value: 'Sweden', color: 'grey' },
                                    { label: 'Switzerland', value: 'Switzerland', color: 'grey' },
                                    { label: 'Syrian Arab Republic', value: 'Syrian Arab Republic', color: 'grey' },
                                    { label: 'Taiwan, Province of China', value: 'Taiwan, Province of China', color: 'grey' },
                                    { label: 'Tajikistan', value: 'Tajikistan', color: 'grey' },
                                    { label: 'Tanzania, United Republic of', value: 'Tanzania, United Republic of', color: 'grey' },
                                    { label: 'Thailand', value: 'Thailand', color: 'grey' },
                                    { label: 'Timor-leste', value: 'Timor-leste', color: 'grey' },
                                    { label: 'Togo', value: 'Togo', color: 'grey' },
                                    { label: 'Tokelau', value: 'Tokelau', color: 'grey' },
                                    { label: 'Tonga', value: 'Tonga', color: 'grey' },
                                    { label: 'Trinidad and Tobago', value: 'Trinidad and Tobago', color: 'grey' },
                                    { label: 'Tunisia', value: 'Tunisia', color: 'grey' },
                                    { label: 'Turkey', value: 'Turkey', color: 'grey' },
                                    { label: 'Turkmenistan', value: 'Turkmenistan', color: 'grey' },
                                    { label: 'Turks and Caicos Islands', value: 'Turks and Caicos Islands', color: 'grey' },
                                    { label: 'Tuvalu', value: 'Tuvalu', color: 'grey' },
                                    { label: 'Uganda', value: 'Uganda', color: 'grey' },
                                    { label: 'Ukraine', value: 'Ukraine', color: 'grey' },
                                    { label: 'United Arab Emirates', value: 'United Arab Emirates', color: 'grey' },
                                    { label: 'United Kingdom', value: 'United Kingdom', color: 'grey' },
                                    { label: 'United States', value: 'United States', color: 'grey' },
                                    { label: 'United States Minor Outlying Islands', value: 'United States Minor Outlying Islands', color: 'grey' },
                                    { label: 'Uruguay', value: 'Uruguay', color: 'grey' },
                                    { label: 'Uzbekistan', value: 'Uzbekistan', color: 'grey' },
                                    { label: 'Vanuatu', value: 'Vanuatu', color: 'grey' },
                                    { label: 'Venezuela', value: 'Venezuela', color: 'grey' },
                                    { label: 'Viet Nam', value: 'Viet Nam', color: 'grey' },
                                    { label: 'Virgin Islands, British', value: 'Virgin Islands, British', color: 'grey' },
                                    { label: 'Virgin Islands, U.S.', value: 'Virgin Islands, U.S.', color: 'grey' },
                                    { label: 'Wallis and Futuna', value: 'Wallis and Futuna', color: 'grey' },
                                    { label: 'Western Sahara', value: 'Western Sahara', color: 'grey' },
                                    { label: 'Yemen', value: 'Yemen', color: 'grey' },
                                    { label: 'Zambia', value: 'Zambia', color: 'grey' },
                                    { label: 'Zimbabwe', value: 'Zimbabwe', color: 'grey' }
                                ]}
                                placeholder={{}}
                                value={this.state.country}
                            />
                        </View>
                        <Text 
                            style={styles.textLabel}
                        >
                            Profession <Text style={{ color: "grey" }}>*</Text>
                        </Text>
                        <View
                            style={[styles.pickerInput, { borderColor: this.state.empty === 'profession' ? 'red' : '#e8e8e8' }]}
                        >
                            <RNPickerSelect
                                onValueChange={ (value) => this.setState({profession : value},this.setState({ empty: '' }))}
                                items={[
                                    { label: 'Select..', value: '', color: "#dedede"},
                                    { label: 'Student – pre-college', value : 'Student – pre-college', color: "grey"},
                                    { label: 'Student – undergraduate', value: 'Student – undergraduate', color: "grey" },
                                    { label: 'Student – graduate/doctorate', value: 'Student – graduate/doctorate', color: "grey" },
                                    { label: 'Working in Customer Service', value: 'Working in Customer Service', color: "grey" },
                                    { label: 'Working in Technology', value: 'Working in Technology', color: "grey" },
                                    { label: 'Working in Medical or Healthcare', value: 'Working in Medical or Healthcare', color: "grey" },
                                    { label: 'Working in Retail, Sales, Marketing, Manufacturing', value: 'Working in Retail, Sales, Marketing, Manufacturing', color: "grey" },
                                    { label: 'Working in Education or Publishing', value: 'Working in Education or Publishing', color: "grey" },
                                    { label: 'None of the above', value: 'None of the above', color: "grey" }
                                ]}
                                placeholder = {{}}
                                value={this.state.profession}
                            />
                        </View>
                        <Text
                            style={styles.textLabel}
                        >
                            Cultural values <Text style={{ color: "grey" }}>*</Text>
                        </Text>
                        <View style={{ marginTop: 5, padding: 5, borderWidth: 1, borderRadius: 10, borderColor: this.state.empty === 'cultural_values' ? 'red' : '#e8e8e8'}}>
                            <MultiSelect
                                items={cultural_values_options}
                                uniqueKey="value"
                                ref={(component) => { this.multiSelect = component }}
                                onSelectedItemsChange={(items) => this.setState({ cultural_values: items }, this.setState({ empty: '' }))}
                                selectedItems={this.state.cultural_values}
                                selectText="Select..."
                                searchInputPlaceholderText="Search Values..."
                                altFontFamily="ProximaNova-Light"
                                selectedItemTextColor="green"
                                selectedItemIconColor="green"
                                itemTextColor="grey"
                                displayKey="label"
                                hideTags={true} 
                                hideSubmitButton = {true}
                            />
                        </View>
                        <View style = {{
                            borderColor: '#e8e8e8',
                            borderWidth: 1,
                            borderRadius: 10,
                            marginTop : 15,
                            padding : 15,
                        }}>
                                <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                                    Term {'\u0026'} Conditions
                                </Text>

                                <View style = {{flexDirection : "row", paddingLeft : 10}}>
                                    <Text style = {{fontWeight : "bold", paddingRight : 5}}>
                                        {'\u2022'} 
                                    </Text>
                                    <Text style={{ fontSize: 13, color: "#636363"}}>
                                        You are voluntarily participating in this game.
                                    </Text>
                                </View>

                                <View style = {{flexDirection : "row", paddingLeft : 10}}>
                                    <Text style = {{fontWeight : "bold", paddingRight : 5}}>
                                        {'\u2022'} 
                                    </Text>
                                    <Text style = {{fontSize : 13,color: "#636363"}}>
                                    You are also aware and authorizing that data gathered from this app will be analyzed for research purposes to understand more about human processes with social media and news headlines.
                                    </Text>
                                </View>

                                <View style = {{flexDirection : "row", paddingLeft : 10}}>
                                    <Text style = {{fontWeight : "bold", paddingRight : 5}}>
                                        {'\u2022'} 
                                    </Text>
                                    <Text style = {{fontSize : 13,color: "#636363"}}>
                                        Review your cellular data usage to manage any related fees related to this app.
                                    </Text>
                                </View>
                        </View>

                        <View style={{ flexDirection: "row", marginTop: 15 }}>
                            <CheckBox
                                disabled={false}
                                value={this.state.agree}
                                onValueChange={(newValue) => this.setState({ agree: newValue }, this.setState({empty : ''}))}
                            />
                            <Text style={{ fontSize: 16, marginTop: 5, color : this.state.empty === 'agree' ? 'red' : 'black'}}>Agree</Text>
                        </View>

                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                backgroundColor: "#1290ff",
                                paddingVertical: 8,
                                marginTop: 25,
                                elevation: 3
                            }}
                            onPress={() => this.onSubmit()}
                        >
                            <Text style={{ fontSize: 18, color: "white" }}>Signup</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: 15, marginVertical: 20, color: "#1f5c99"
                                }}
                                onPress={() => this.props.navigation.replace("Login")}
                            >* Already have an account ?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
    },
    signupBox: {
        borderColor: "#ffffff",
        flex: 1,
        paddingHorizontal: 20,
    },
    textLabel: {
        fontSize: 16,
        marginTop: 15
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 15,
        color: "grey",
        height: 40,
        marginTop: 5,
        paddingHorizontal: 10
    },
    pickerInput: {
        borderWidth: 1,
        borderRadius: 10,
        height: 45,
        marginTop: 5
    }
})
export default Signup