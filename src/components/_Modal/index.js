//Libraries
import React from 'react';
import {
    TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import { Header, Left, View, Icon, Title, Body } from "native-base";
import { useColorScheme } from 'react-native-appearance';
//Styles
import styles from "../../styles"
import { DARK_COLOR } from '../../const';


function _Header(props) {
    const { onClose, title, textColor } = props;
    let colorScheme = useColorScheme();
    let darkTheme = {...styles.header}
    darkTheme.backgroundColor = colorScheme == "dark"? DARK_COLOR: styles.backgroundPrimary.backgroundColor
    return (
        <Header style={darkTheme} noShadow>
            <Left style={{ flexDirection: "row" }}>
                <View>
                    <TouchableOpacity onPress={onClose}>
                        <Icon name="arrow-left" type="MaterialCommunityIcons" style={{ color: "white" }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10, }} >
                    <Title style={[styles.headerTitle, {color: textColor?textColor: "white"}]}>
                        {title}
                    </Title>
                </View>
            </Left>
            <Body />
        </Header>
    )
}

function _Modal(props) {
    const { open, title, textColor, onClose, onShow, onHide, height, children, fullscreen } = props;
    const _onModalShow = onShow ? onShow : Default;
    const _onClose = onClose ? onClose : Default;
    const _onHide = onHide ? onHide : Default;
    let colorScheme = useColorScheme();
    let darkThemeFullView = {backgroundColor: colorScheme == "dark"? "black": "white", flex: 1}
    let darkThemeMidView = {backgroundColor: colorScheme == "dark"? DARK_COLOR: "white", height, borderRadius: 10, padding: 10 }
    function Default() { }

    if (!fullscreen) {
        return (
            <Modal isVisible={open} onModalShow={_onModalShow} animationIn="slideInUp" animationOut="slideOutDown"
                onModalHide={_onHide} onSwipeComplete={_onClose} swipeDirection="right"
                onBackButtonPress={_onClose} onBackdropPress={_onClose}  >
                <View style={darkThemeMidView}>
                    {children}
                </View>
            </Modal>
        )
    }
    return (

        <Modal isVisible={open} onModalShow={_onModalShow} animationIn="slideInUp" animationOut="slideOutDown"
            presentationStyle="overFullScreen" onModalHide={_onHide} backdropOpacity={1} backdropColor="white"
            onBackButtonPress={onClose} onBackdropPress={onClose} style={{ backgroundColor: "white", margin: 0,}}>
            <_Header onClose={onClose} title={title} textColor={textColor} />
            <View style={darkThemeFullView} >
                {children}
            </View>
        </Modal>
    )
}
export default _Modal;
