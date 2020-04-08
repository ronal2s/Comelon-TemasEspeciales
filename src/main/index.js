import React, { useState, useEffect, useRef } from 'react'
import { StatusBar, StyleSheet, Platform } from 'react-native'
import { Drawer, Container, Spinner, Text, Tabs, Tab, ScrollableTab, TabHeading } from 'native-base'
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
// console.disableYellowBox = true
//Styles
import styles from '../styles'
//Containers
import Header from '../header'
import SideBar from '../sidebar'
//Screens
// import HomePresentation from "../screens/presentation";
import HomeFood from "../screens/food";
import Loading from "../screens/loading";
//Components
import _Tab from "../components/_Tab";
import _Icon from "../components/_Icon";
import _Slide from "../components/_Slide";
import _MediaFooter from "../components/_MediaFooter";
//Helpers
import { PRIMARY_COLOR, Encode, URL_SERVICE } from "../const"
import Axios from 'axios';


function MyHeader(props) {
    const { open, screen, radioActive, headerTitle } = props;
    if (screen != "login") {
        return <Header open={open} headerTitle={headerTitle} />
    }
    return <Text />
}


//Hay un error  con el drawer, se necesita poner mainOverlay: 0, si no aparece super oscuro. O type = displace
function Main() {
    const [screen, setScreen] = useState("Loading");
    const [currentTab, setTab] = useState(0)
    const [loading, setLoading] = useState(false);
    const [drawer, setDrawer] = useState();
    const [sawAds, setSawAds] = useState(false);
    const [restaurantInfo, setRestaurantInfo] = useState({});
    let colorScheme = useColorScheme();
    const swipeRef = useRef(null)

    useEffect(() => {
        onGetInfo();
    }, [])

    function handlePages(page) {
            setSawAds(false);
            if (screen != "login") {
                if (drawer && !Platform.isPad) {
                    drawer._root.close()
                }
            }
            setTimeout(() => { setScreen(page); setLoading(false); }, 300);
        
        setLoading(true);
    }

    function onGetInfo() {
        Axios.get(`${URL_SERVICE}/rd/santiagoRestaurantsInfo`)
            .then(res => setRestaurantInfo({ ...res.data }))
            .catch(err => {
                console.log("Error obteniendo la informacion", err);
                alert(err)
            })
    }

  
    if (screen == "Loading") {
        return (
            <AppearanceProvider>
                <Loading toHome={() => setScreen("Square one")} />
            </AppearanceProvider >
        )
    }

    let darkThemeContainer = { ...styles.main, backgroundColor: colorScheme == "dark" ? "black" : "white" }
    

    return (
        <AppearanceProvider>
            <Drawer disabled={Platform.isPad} captureGestures={!Platform.isPad} tapToClose={!Platform.isPad} styles={{ main: { backgroundColor: "white" } }} openDrawerOffset={Platform.isPad ? 0.7 : 0.2} type={Platform.isPad ? "static" : "displace"} ref={(ref) => setDrawer(ref)} onClose={() => drawer._root.close()} open={Platform.isPad}

                content={<SideBar screen={screen} handlePages={handlePages} />} >
                <Container style={darkThemeContainer} >
                    <MyHeader screen={screen} open={() => { drawer._root.open() }} headerTitle={screen} />
                    <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
                    <HomeFood restaurant={screen} restaurantInfo={restaurantInfo} />
                </Container>
            </Drawer>
        </AppearanceProvider>
    )
}


export default Main;