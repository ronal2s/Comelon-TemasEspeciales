import React from 'react';
import { Input, Item, Label, DatePicker } from 'native-base'


function MyItem(props) {
    const { rounded, name, required, value, onChange, label, numeric, width } = props;
    const _value = value ? value : ""
    const _onChange = onChange ? onChange : Default;
    Default = () => { }

    return (
        <Item inlineLabel rounded={rounded} style={{ width }} >

            <Label >{`${required ? '*' : ''}${label}`}:</Label>
            <DatePicker placeHolderText="Seleccionar" onDateChange={(date) => _onChange(date)} />
        </Item>
    )

}

export default MyItem;