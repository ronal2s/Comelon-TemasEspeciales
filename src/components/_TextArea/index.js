import React from 'react';
import { Textarea, View, Label, Text } from 'native-base'
import { useColorScheme } from 'react-native-appearance';

function MyItem(props) {
    const { rounded, name, value, onChange, label, placeholder, width } = props;
    let colorScheme = useColorScheme();
    let darkThemeText = {color: colorScheme == "dark"? "white": "gray", fontSize: 15, marginLeft: -10}
    let darkThemeTextInput = {color: colorScheme == "dark"? "white": "black"}
    return (
        <View style={{ borderBottomColor: "#D3D3D3", borderBottomWidth: 1, marginTop: 10 }}>
            {/* {label && <Label>{label}</Label>} */}
            {label && <Text style={darkThemeText} >{`   ${label}:`}</Text>}
            <Textarea style={darkThemeTextInput} rowSpan={5} placeholder={placeholder} value={value} onChangeText={(text) => onChange(name, text)} />
        </View>
    )
}

export default MyItem;