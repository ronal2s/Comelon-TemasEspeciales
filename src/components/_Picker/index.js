import React from 'react';
import { Item, Label, Icon, Picker, View } from 'native-base'

function MyItem() {
    const { rounded, name, onChange, label, list, placeholder, width, value, paddingHorizontal } = props;
    _onChange = onChange != undefined ? onChange : Default;
    const _list = list ? list : ["Opción #1", "Opción #2", "Opción #3"]

    Default = () => { }

    if (paddingHorizontal) {
        return (
            <View style={{ paddingHorizontal: 10 }}>
                <Item picker style={{ width }} >
                    <Label>{label}</Label>
                    <Picker
                        mode="dialog"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder={placeholder}
                        selectedValue={value}
                        onValueChange={(item) => _onChange(name, item)}
                    >
                        {_list.map((v, i) => {
                            return <Picker.Item label={v} value={v} key={i} />
                        })}
                    </Picker>
                </Item>
            </View>
        )
    }
    return <Item picker style={{ width }} >
        <Picker
            mode="dialog"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder={placeholder}
            selectedValue={value}
            onValueChange={(item) => _onChange(name, item)}
        >
            {_list.map((v, i) => {
                return <Picker.Item label={v} value={v} key={i} />
            })}
        </Picker>
    </Item>
}


export default MyItem;