import React from 'react';
import { Input, Item, Label } from 'native-base'
import { useColorScheme } from 'react-native-appearance';

function MyItem(props) {
    const { rounded, name, multiline, placeholder, required, value, onChange, label, numeric, width } = props;
    const Default = () => { }
    const _value = value ? value : ""
    const _onChange = onChange ? onChange : Default;
    let colorScheme = useColorScheme();
    let darkThemeText = {color: colorScheme == "dark"? "white": "gray"}
    let darkThemeTextInput = {color: colorScheme == "dark"? "white": "black"}
    return (
        <Item stackedLabel rounded={rounded} style={{ width }} >

            {label && <Label style={darkThemeText} >{`${required ? '*' : ''}${label}`}:</Label>}
            <Input style={darkThemeTextInput}  multiline={multiline} placeholder={placeholder} value={_value} onChangeText={(text) => _onChange(name, text)} keyboardType={numeric ? "numeric" : "default"} />

        </Item>
    )

}
export default MyItem;