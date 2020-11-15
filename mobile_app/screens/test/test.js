import React, { Component } from "react";
import {View,ScrollView, StyleSheet} from "react-native";
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

class Test extends Component {

    state = {
        selectedItems: [],
        cultural_values_1: [],
    };

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        console.log(this.state.selectedItems)
    };

    render() {

        return (
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled = {true}>
                <MultiSelect
                    items={cultural_values_options}
                    uniqueKey="value"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={(items)=>this.setState({cultural_values_1 : items})}
                    selectedItems={this.state.cultural_values_1}
                    selectText="Cultural values"
                    searchInputPlaceholderText="Search Values..."
                    altFontFamily="ProximaNova-Light"
                    selectedItemTextColor="green"
                    selectedItemIconColor="green"
                    itemTextColor="grey"
                    displayKey="label"
                    hideTags = {true}
                    submitButtonColor="#1f5c99"
                    submitButtonText="Submit"
                />
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
});
export default Test;

