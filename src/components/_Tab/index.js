import React from "react";
import { Tab } from "native-base";

import { PRIMARY_COLOR } from "../../const"

function MyItem() {
    const { heading, children } = props;

    return (
        <Tab heading={heading} tabStyle={{ backgroundColor: PRIMARY_COLOR }} activeTabStyle={{ backgroundColor: PRIMARY_COLOR }}>
            {children}
        </Tab>
    )
}

export default MyItem;