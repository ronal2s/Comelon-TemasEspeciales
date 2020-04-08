import React from "react";
import { Text } from "react-native";
import { useColorScheme } from 'react-native-appearance';
import { PRIMARY_COLOR } from "../../const";

function Item(props) {
    const { children, center } = props;
    let colorScheme = useColorScheme();
    let darkThemeTitleCenter = {fontWeight: "bold", textAlign:"center", fontSize: 24, color: colorScheme == "dark"? "white": PRIMARY_COLOR, textAlign: "center" }
    let darkThemeTitleElse = {fontWeight: "bold", textAlign:"center",fontSize: 24, color: colorScheme == "dark"? "white": PRIMARY_COLOR}
    if (center)
        return (
            <Text style={darkThemeTitleCenter} >
                {children}
            </Text>
        )
    return (
        <Text style={darkThemeTitleElse} >
            {children}
        </Text>
    )
}

export default Item;