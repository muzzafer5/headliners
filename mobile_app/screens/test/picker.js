import RNPickerSelect from 'react-native-picker-select';
import { ThemeConsumer } from 'react-native-elements';

                    <View style = {{backgroundColor : "blue", color : "black", marginHorizontal : 50}}>
                    <RNPickerSelect
                        onValueChange={(value) => this.setState({cult : value})}
                        items={[
                            { label: 'Football', value: 'football', color :"green" },
                            { label: 'Baseball', value: 'baseball' },
                            { label: 'Hockey', value: 'hockey' },
                        ]}
                        value = {cult}
                    />
                    </View>




render(){
    return (
        <KeyboardAvoidingView behavior="position" style={styles.container}>

            <StatusBar backgroundColor="black" barStyle="light-content" />

            <View style={styles.header}>
                <Text style={{ fontSize: 22, color: "white" }}>Headliners</Text>
            </View>

            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: 500
                }
                }>

            </View>

            <View style={styles.footer}>
                <Text style={{ color: "white" }}>
                    © 2020 Headliners. All rights reserved
                    </Text>
            </View>
        </KeyboardAvoidingView>
    )
}
                        // <View
                        //     style={{
                        //         borderBottomColor: "#f2f2f2",
                        //         borderBottomWidth: 1,
                        //         alignSelf: 'stretch',
                        //         marginVertical: 15
                        //     }}
                        // />
                        // <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
                        //     <View >
                        //         <Button
                        //             title="Don't Share"
                        //             color="black"
                        //             onPress={this.onNextModal}
                        //         />
                        //     </View>
                        //     <View >
                        //         <Button
                        //             title=" Share "
                        //             color="black"
                        //             onPress={this.onShare2}
                        //         />
                        //     </View>
                        // </View>

import React, { Component } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import MultiSelect from 'react-native-multiple-select';

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
            <ScrollView style={{ flex: 1 }}>
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

