import React from 'react';
import { DatePicker, Item, Label } from 'native-base'

function MyItem(props) {
    const { rounded, name, value, onChange, label, numeric, width } = props;

    return (
        <Item inlineLabel rounded={rounded} style={{ width }} >
            <Label>{label}:</Label>
            <DatePicker locale={"en"} placeHolderText="" />
        </Item>
    )

}

export default MyItem;