import React from "react";
import { Icon } from "native-base";

function MyItem(props) {
    const { paddingRight, paddingLeft, name, color, size, type } = props;
    function Default() { }
    if (size) {
        return (
            <Icon type={type?type:"MaterialCommunityIcons"} name={name} style={{ color, paddingRight, paddingLeft, fontSize: size }} />
        )

    }
    return (
        <Icon type={type?type:"MaterialCommunityIcons"} name={name} style={{ color, paddingRight, paddingLeft }} />
    )
}

export default MyItem;