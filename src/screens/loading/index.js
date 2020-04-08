import React, { useState, useEffect } from 'react'
import { View, Text, AsyncStorage, Image } from 'react-native'
import { Button, Container, Spinner } from 'native-base'
import { useColorScheme } from 'react-native-appearance';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../../styles'
import { FACEBOOK, PRIMARY_COLOR } from "../../const";

import Logo from "../../../assets/whiteBurger.png"

import _Icon from "../../components/_Icon";

function Main(props) {
    const { toHome } = props;
    const [loading, setLoading] = useState(false);

    async function isLogged() {
        setTimeout(() => toHome(), 1000);
    }

    useEffect(function () {
        isLogged();
    }, [])
    let colorScheme = useColorScheme();

    let colorsGradient = colorScheme === 'dark'? ["#961c13", "#000000"]: ['#DA291C', '#ad2116', '#ad2116', '#961c13']
    return (
        <LinearGradient
            colors={colorsGradient}
            style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                <View style={styles.loginViewLogo}>
                    <Image source={Logo} style={{ height: 100, marginVertical: 20 }} resizeMode="contain" />
                </View>
                <View>
                    <Spinner color="white" />
                </View>         
        </LinearGradient>
    )
}


export default Main;
