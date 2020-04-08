import React, { useState, useEffect } from 'react'
import { Text, View, Alert, Linking, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { Container, Content, List, Thumbnail, Footer, ListItem, Spinner, FooterTab, Icon } from 'native-base'
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native-appearance';

import styles from '../styles'
import { PRIMARY_COLOR, URL_SERVICE, DARK_COLOR } from "../const"
import _ListItem from '../components/listItem'
import _Button from "../components/_Button";
import _Slide from "../components/_Slide";
import _Icon from "../components/_Icon";
import _ModalUbicaciones from "../modals/ubicaciones";
import _ModalContacto from "../modals/contact";

import _UserNormal from "../../assets/user_.png";
import _UserDark from "../../assets/userDark.png";
import _IconSandwich from "../../assets/icons/sandwich.png";

import Axios from 'axios';

function ListRestaurants(props) {
    const { screen, handlePages, loadingTitles, data, themeColor } = props;
    if (!loadingTitles) {
        return data.map((item, i) => {
            return (
                <_Slide key={i} >
                    <_ListItem actualScreen={screen} itemName={item.nombre} handlePages={handlePages} />
                </_Slide>
            )
        })
    }

    return <Spinner color={themeColor} />

}

function FoodIcon(props) {
    const { name, type, size, iconSelected, setIconSelected, colorScheme } = props;
    let backgroundIcon = "";
    let colorIcon = "";
    if (colorScheme == "dark") {
        backgroundIcon = name == iconSelected ? "white" : "black"
        colorIcon = name == iconSelected ? "black" : "white"
    } else {
        backgroundIcon = name == iconSelected ? "white" : PRIMARY_COLOR
        colorIcon = name == iconSelected ? PRIMARY_COLOR : "white"
    }
    return (
        <_Slide>
            <TouchableOpacity onPress={() => setIconSelected(name)} >
                <View style={{ backgroundColor: backgroundIcon, borderWidth: 1, borderColor: "white", height: 40, width: 40, borderRadius: 40 / 2, justifyContent: "center", alignItems: "center", marginHorizontal: 2, marginVertical: 5 }} >
                    <Icon name={name} type={type} style={{ color: colorIcon, fontSize: size }} />
                </View>
            </TouchableOpacity>
        </_Slide>
    )
}

function SideBar(props) {
    const { handlePages, screen, onLogout, filterRestaurants } = props;
    const [restaurants, setRestaurants] = useState([]);
    const [backupRestaurants, setBackupRestaurants] = useState([]);
    const [loadingTitles, setLoading] = useState(true);
    const [iconSelected, setIconSelected] = useState("");
    const [modalUbicaciones, setModalUbicaciones] = useState(false);
    const [modalContacto, setModalContacto] = useState(false);



    useEffect(() => {
        onGetSantiagoTitles();
        console.log("Ejecutando request titles")
    }, [])

    async function onGetSantiagoTitles() {
        await Axios.get(`${URL_SERVICE}/rd/santiagotitles`)
            .then(result => {
                result.data.map((v, i) => {
                    switch (v.tipo) {
                        case "Pizza": v.iconName = "pizza"; v.iconType = "MaterialCommunityIcons"; break;
                        case "Sandwich": v.iconName = "hamburger"; v.iconType = "MaterialCommunityIcons"; break;
                        case "Pollo": v.iconName = "drumstick-bite"; v.iconType = "FontAwesome5"; break;
                        case "Mexicano": v.iconName = "taco"; v.iconType = "MaterialCommunityIcons"; break;
                        case "Varios": v.iconName = "silverware-fork-knife"; v.iconType = "MaterialCommunityIcons"; break;
                        case "Asiatica": v.iconName = "torii-gate"; v.iconType = "FontAwesome5"; break;
                    }
                })

                setRestaurants(result.data);
                setBackupRestaurants(result.data);
                setLoading(false);
            })
            .catch(err => {
                Alert.alert("Ha ocurrido un error obteniendo los restaurantes");
                console.warn(err);
                // setLoading(false);
            })
    }

    function onIconSelected(name) {
        // alert(name)
        if (iconSelected == name) {
            setIconSelected("");
            setRestaurants([...backupRestaurants])
        } else {
            setIconSelected(name);
            setRestaurants(backupRestaurants.filter((item) => item.iconName == name))
            
        }
    }

    let colorScheme = useColorScheme();
    let themeTop = colorScheme == "dark" ? [DARK_COLOR, "black"] : ["#DA291C", "#ad2116"]
    let themeBottom = colorScheme == "dark" ? ["black", DARK_COLOR] : ["#ad2116", "#961c13"]
    let themeSpinner = colorScheme == "dark" ? "white" : PRIMARY_COLOR;
    let themeProfile = colorScheme == "dark" ? _UserDark : _UserNormal;

    return <Container style={[styles.sideBar, { flex: 1, backgroundColor: "#153A8B" }]} >
        <LinearGradient colors={themeTop} style={[styles.sidebarProfileView]}>

            <View >
                <Thumbnail style={[styles.sidebarProfileThumbnail]} source={themeProfile} circular />
                <Text style={[styles.textSecondary, { textAlign: "center", fontWeight: "100", fontSize: 22 }]}>Comelón</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }} >                
            <TouchableOpacity onPress={() => alert("Proyecto final de Temas Especiales, posteriormente quizás sea publicado en alguna tienda")}>
                <Text style={{color: "white"}} >Temas Especiales</Text>
            </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", width: "50%" }} >
                <FoodIcon name="pizza" type="MaterialCommunityIcons" setIconSelected={onIconSelected} iconSelected={iconSelected} colorScheme={colorScheme} />
                <FoodIcon name="hamburger" type="MaterialCommunityIcons" setIconSelected={onIconSelected} iconSelected={iconSelected} colorScheme={colorScheme} />
                <FoodIcon name="drumstick-bite" type="FontAwesome5" setIconSelected={onIconSelected} iconSelected={iconSelected} colorScheme={colorScheme} />
                <FoodIcon name="taco" type="MaterialCommunityIcons" setIconSelected={onIconSelected} iconSelected={iconSelected} colorScheme={colorScheme} />
                <FoodIcon name="silverware-fork-knife" type="MaterialCommunityIcons" setIconSelected={onIconSelected} iconSelected={iconSelected} colorScheme={colorScheme} />
                <FoodIcon name="torii-gate" type="FontAwesome5" size={20} setIconSelected={onIconSelected} iconSelected={iconSelected} colorScheme={colorScheme} />

            </View>
        </LinearGradient>
        <LinearGradient colors={themeBottom} style={{ flex: 0.6 }} >
            <ScrollView>
                <ListRestaurants screen={screen} handlePages={handlePages} loadingTitles={loadingTitles} data={restaurants} themeColor={themeSpinner} />
            </ScrollView>
        </LinearGradient>
        <Footer style={{ backgroundColor: colorScheme == "dark" ? DARK_COLOR : "#961c13", borderWidth: 0, borderTopWidth: 0 }} >
            <FooterTab>
                <_Button text="Contacto" textColor="white" color={colorScheme == "dark" ? DARK_COLOR : "#961c13"} onPress={() => setModalContacto(true)} />
            </FooterTab>
        </Footer>

        <_ModalContacto colorScheme={colorScheme} open={modalContacto} onClose={() => setModalContacto(false)} title={"Contacto"} />
        {restaurants.length > 0 && <_ModalUbicaciones colorScheme={colorScheme} open={modalUbicaciones} onClose={() => setModalUbicaciones(false)} title={"Mapa"} data={restaurants} />}
    </Container>

}

export default SideBar;