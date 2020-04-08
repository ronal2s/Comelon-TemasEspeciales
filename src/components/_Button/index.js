import React from 'react';
import { Button, Icon, Text } from 'native-base'
import { PRIMARY_COLOR } from '../../const';

function MyItem(props) {
    const { width, marginTop, paddingRight, iconName, text, full, block, iconLeft, info, danger, warning, color, onPress, textColor, noRadius } = props;
    function Default() { }
    const _onPress = onPress ? onPress : Default;
    return (
        <Button onPress={_onPress} iconLeft={iconLeft} block={block} full={full} info={info} danger={danger} warning={warning}
            style={{ backgroundColor: color ? color : PRIMARY_COLOR, marginTop, width, paddingRight, borderRadius: noRadius ? 0 : 0 }} >
            {iconName && <Icon name={iconName} type="MaterialCommunityIcons" />}
            <Text style={{ color: textColor ? textColor : "white", fontWeight: "100", textAlign: "center" }} >{text}</Text>
        </Button>
    )

}


export default MyItem;