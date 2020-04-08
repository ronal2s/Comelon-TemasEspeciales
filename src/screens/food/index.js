//Libraries
import React, { useState, useEffect } from 'react'
import { Animated, Platform, ScrollView, ListView, FlatList, View, TouchableOpacity, Share, Dimensions, Linking, Alert, ImageBackground } from 'react-native';
import { Card, CardItem, Text, List, Spinner, Content, ListItem, Grid, Row, Col } from "native-base";
import axios from "axios";
import MapView from 'react-native-maps';
import { useColorScheme } from 'react-native-appearance';
import {
    AdMobBanner,
    AdMobInterstitial,
} from 'expo-ads-admob';

//Style
import styles from "../../styles";
//Constants
import { PRIMARY_COLOR, DARK_COLOR } from "../../const"
//Components
import _Title from "../../components/_Title";
import _Icon from "../../components/_Icon";
import _Slide from "../../components/_Slide";
import _Button from "../../components/_Button";
//Constants
import { URL_SERVICE, Truncate, dimensions, imageHeight, imageWidth } from "../../const";
import DefaultImage from "../../../assets/default.jpg";
import { LinearGradient } from 'expo-linear-gradient';


function isRestaurantOpened(info) {
    const dateNow = new Date().getHours();
    if (info) {
        return dateNow >= info.startHour && dateNow < info.finalHour
    }
}

function FooterFood(props) {
    const { loading, info, restaurantOpened, disableAd } = props;
    if (!loading && info) {
        const titleOpened = isRestaurantOpened(info) ? "Abierto" : "Cerrado";
        const colorOpened = isRestaurantOpened(info) ? DARK_COLOR : "#c0392b";
        return (
            <View>
                {/* <TouchableOpacity onPress={() => Linking.openURL(`http://maps.apple.com/?ll=${info.location.latitude},${info.location.longitude}`)} > */}

                    {/* <MapView style={{
                <TouchableOpacity onPress={() => Linking.openURL(`google.navigation:q=${info.location.latitude}+${info.location.longitude}`)} >
                        width: Platform.isPad ? Dimensions.get('window').width * 0.7 : Dimensions.get('window').width,
                        height: 300,
                    }}
                        region={info.location}
                        scrollEnabled={false}
                </TouchableOpacity>
                    /> */}
                <View style={{ width: Platform.isPad ? "70%" : "100%" }} >
                    <_Button text={titleOpened} block color={colorOpened} onPress={() => Alert.alert("AVISO", "Intenta llamar, quizás nos equivocamos")} />
                    <_Button text={`Llamar`} block color="#3CB371" onPress={() => {
                        Linking.openURL("tel: + 1" + info.telephone)
                    }} />
                </View>
                {
                    !Platform.isPad && <View>
                        <InstagramButton onPress={() => {
                            Linking.openURL(info.officialPage)
                        }} />
                    </View>
                }
            </View>
        )
    }

    return <Text />
}

function InstagramButton(props) {
    const { onPress } = props;
    return (
        <LinearGradient colors={["#8a3ab9", "#e95950", "#bc2a8d", "#fccc63", "#fbad50", "#cd486b",]} start={[0.1, 0.1]} end={[1, 1]} >
            <TouchableOpacity onPress={onPress}>

                <View style={{ width: "100%", height: 50, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "white", fontWeight: "200" }}> Instagram</Text>
                </View>
            </TouchableOpacity>
        </LinearGradient>
    )
}

function FoodView(props) {
    const [x, setX] = useState(new Animated.Value(-100));

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modal, setModal] = useState({ news: false });
    const [news_selected, setActualNew] = useState({ title: "", data: {}, image: "" })
    const [restaurantNameFixed, setRestaurantName] = useState("");
    const [restaurantOpened, setIsRestaurantOpened] = useState(false);
    const { restaurant, restaurantInfo } = props;


    useEffect(function () {
        
        // setLoading(true);
        setData([])
        slide();
        getFoodPhotos(restaurant);
        setIsRestaurantOpened(isRestaurantOpened(restaurantInfo));
    }, [restaurant])

    function getFoodPhotos(restaurant: string) {
        setLoading(true);
        const fixedName = restaurant.replace(/\s+/g, '');
        setRestaurantName(fixedName);
        axios.get(`${URL_SERVICE}/rd/${fixedName}`)
            .then(result => {
                // alert("cargado")
                // console.warn("Resultado: ", result.data)
                setData([...result.data.data])
                // console.warn(restaurantInfo[restaurantFixed.toLocaleLowerCase()])
                setLoading(false);
            })
            .catch(err => {
                // console.error(err)
                alert(err)
                setLoading(false);
            })
    }

    function slide() {
        Animated.spring(x, {
            toValue: 0,
        }).start();
    };

    let colorScheme = useColorScheme();
    let darkThemeView = { backgroundColor: colorScheme == "dark" ? "black" : "white", paddingHorizontal: 0, flex: 1 }
    let info = restaurantInfo[restaurantNameFixed.toLocaleLowerCase()];
    let regexp = new RegExp('#([^\\s]*)', 'g');//Function to delete hashtags
    let regexp2 = new RegExp('@([^\\s]*)', 'g');//Function to delete mentions
    let textClear = "";
    let imageSize = Platform.isPad ? { height: 300, width: imageWidth * 0.47 } : { height: 500, width: imageWidth }
    // alert(colorScheme)
    return (
        <View style={darkThemeView}  >
            <FlatList
                data={data}
                keyExtractor={item => item.img}
                // numColumns={2}
                initialNumToRender={15}
                ListEmptyComponent={loading ? <Spinner color={colorScheme == "dark" ? "white" : PRIMARY_COLOR} /> : <Text style={{ fontWeight: "100", color: colorScheme == "dark" ? "white" : "black", textAlign: "center" }} > Oh no!, no hay comida </Text>}
                renderItem={({ item, index }) => {
                    textClear = item.text.replace(regexp, '');
                    textClear = item.text.replace(regexp2, '');
                    textClear = textClear.replace(/\---/g, '')
                    textClear = textClear.replace(/\~~~/g, '')
                    textClear = textClear.replace(/\n/g, '.')
                    return (
                        <_Slide>
                            <View key={index}  >
                                <TouchableOpacity >
                                    <View  >
                                        <View >
                                            {/* <Image
                                                source={{ uri: item.img }}
                                                style={{ height: 500, width: imageWidth }}
                                                defaultSource={DefaultImage} /> */}
                                            <ImageBackground
                                                source={{ uri: item.img }}
                                                style={imageSize}
                                                defaultSource={DefaultImage}>
                                                <View style={{ justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: "rgba(0,0,0,0.0)" }}>
                                                </View>
                                            {/* <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "rgba(218, 41, 28,0.5)" }} > */}
                                            <View style={{ paddingVertical: 10, paddingHorizontal: 20, backgroundColor: "rgba(0,0,0,0.7)" }} >
                                                <View style={{flexDirection: "row", alignItems: "center"}} >
                                                    <_Icon name="heart" color={PRIMARY_COLOR} size={18} />
                                                    <Text style={{ color: "white", fontWeight: "100" }} >{` ${item.likes} Me gusta`}</Text>
                                                </View>
                                                <View >
                                                    <Text style={{ color: "white", fontWeight: "100", fontSize: 14, textAlign: "left", padding: 5 }} >
                                                        {`${textClear.substr(0, 150)}...`}
                                                    </Text>
                                                </View>
                                            </View>
                                            </ImageBackground>

                                        </View>
                                        {/* <View style={{  width: "95%",  }} >
                                                <HTML html={card_title} baseFontStyle={{ color: colorScheme == "dark"?"white":PRIMARY_COLOR, fontWeight: "bold", fontSize: 20, }} containerStyle={{marginBottom: -10}} />                                                
                                            </View> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </_Slide>
                    )


                }}
                ListFooterComponent={<FooterFood info={info} loading={loading} />}
            />


        </View>
    )

}

export default FoodView;
