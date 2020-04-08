import React from 'react';
import { Text } from 'react-native';
import { ListItem, Icon, Left, Right, Body } from 'native-base'
import { useColorScheme } from 'react-native-appearance';
import styles from "../../styles"

function MyItem(props) {
    const { handlePages, actualScreen, itemName, icon, iconName } = props;
    let colorScheme = useColorScheme();

    if (!icon) {
        return (
            <ListItem button noIndent itemDivider={false} style={actualScreen == itemName ? styles.listItemSelected : styles.listItemUnselected} onPress={() => handlePages(itemName)}>
                <Left>
                    {colorScheme == "dark" && <Text style={actualScreen == itemName ? styles.listTextSelectedDark : styles.listTextUnselected} >{itemName}</Text>}
                    {colorScheme != "dark" && <Text style={actualScreen == itemName ? styles.listTextSelected : styles.listTextUnselected} >{itemName}</Text>}
                </Left>
                <Right>
                {colorScheme != "dark" && <Icon name="chevron-right" type="MaterialCommunityIcons" style={actualScreen == itemName ? styles.icon : { color: "white" }} />}
                {colorScheme == "dark" && <Icon name="chevron-right" type="MaterialCommunityIcons" style={actualScreen == itemName ? {color: "black"} : { color: "white" }} />}
                    
                </Right>
            </ListItem>
        )
    }

    return (
        <ListItem button icon onPress={() => handlePages("login")}>
            <Left>
                <Icon style={styles.icon} name={iconName} type="MaterialIcons" />
            </Left>
            <Body>
                <Text >{itemName}</Text>
            </Body>
        </ListItem>
    )

}
export default MyItem;