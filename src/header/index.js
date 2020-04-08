import React from 'react'
import { Header, Left, Right, Body, Button, Icon, Title } from 'native-base'
import { TouchableOpacity, Platform } from "react-native";
import { Appearance } from 'react-native-appearance';

import _Slide from "../components/_Slide";
import styles from '../styles'
import { DARK_COLOR } from '../const';


function HeaderContainer(props) {
    const { open, headerTitle } = props;

    let colorScheme = Appearance.getColorScheme();
    let darkTheme = { ...styles.header }
    darkTheme.backgroundColor = colorScheme == "dark" ? DARK_COLOR : styles.backgroundPrimary.backgroundColor
    return (
        <Header style={darkTheme} noShadow>
            <Left>
                {!Platform.isPad && <Button transparent onPress={open} >
                    <Icon style={styles.textSecondary} type="MaterialCommunityIcons" name="menu" />
                </Button>}
                {Platform.isPad &&
                    <_Slide>
                        <Title style={[styles.textSecondary, { fontSize: 24 }]}>{headerTitle}</Title>
                    </_Slide>
                }

            </Left>
            <Body style={{ flex: 1,  }} >
                {!Platform.isPad &&
                    <_Slide>
                        <Title style={[styles.textSecondary, { fontSize: 24, width: "100%" }]}>{headerTitle}</Title>
                    </_Slide>
                }
            </Body>
            <Right  >
            </Right>
        </Header>
    )
}

export default HeaderContainer;