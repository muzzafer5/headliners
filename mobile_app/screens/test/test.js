import React, { Component } from "react";
import {View, StyleSheet} from "react-native";
import MultiSelect from 'react-native-multiple-select';
import { ThemeConsumer } from 'react-native-elements'

const items = [{
    id: '92iijs7yta',
    name: 'Ondo'
}, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun'
}, {
    id: '16hbajsabsd',
    name: 'Calabar'
}, {
    id: 'nahs75a5sg',
    name: 'Lagos'
}, {
    id: '667atsas',
    name: 'Maiduguri'
}, {
    id: 'hsyasajs',
    name: 'Anambra'
}, {
    id: 'djsjudksjd',
    name: 'Benue'
}, {
    id: 'sdhyaysdj',
    name: 'Kaduna'
}, {
    id: 'suudydjsjd',
    name: 'Abuja'
}
];

class Test extends Component {

    state = {
        selectedItems: []
    };

    onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems });
        console.log(this.state.selectedItems)
    };

    render() {

        const { selectedItems } = this.state

        return (
            <View style={{ flex: 1 }}>
                <MultiSelect
                    items={items}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="Cultural values"
                    searchInputPlaceholderText="Search Values..."
                    altFontFamily="ProximaNova-Light"
                    tagRemoveIconColor="blue"
                    tagBorderColor="red"
                    tagTextColor="black"
                    selectedItemTextColor="blue"
                    selectedItemIconColor="green"
                    itemTextColor="brown"
                    displayKey="name"
                    searchInputStyle={{ color: 'green' }}
                    submitButtonColor="yellow"
                    submitButtonText="Submit"
                />
            </View>
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
