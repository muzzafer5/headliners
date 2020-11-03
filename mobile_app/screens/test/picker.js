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