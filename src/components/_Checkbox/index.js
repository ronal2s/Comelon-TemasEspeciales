import React from 'react';

import { ListItem, CheckBox, Body, Text } from 'native-base'

function MyItem(props) {
    const { value, label, onPress } = props;
    const _onPress = onPress ? onPress : Default;

    Default = () => { }

    return (
        <ListItem button onPress={_onPress} noBorder >
            <CheckBox checked={value} color="green" />
            <Body>
                <Text>
                    {label}
                </Text>
            </Body>
        </ListItem>
    )
}
export default MyItem;