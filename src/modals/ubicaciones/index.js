//SCRIPT NO LISTO
import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Animated,
    Image,
    Dimensions,
    TouchableOpacity,
    Linking
} from "react-native";
import _Modal from "../../components/_Modal";
import _Icon from "../../components/_Icon";
import DefaultImage from "../../../assets/default.jpg";
import MapView from "react-native-maps";
import { PRIMARY_COLOR } from "../../const";


const Images = [
    { uri: "https://cdn.images.dailystar.co.uk/dynamic/1/photos/519000/620x/Best-One-corner-shop-729053.jpg" },
    { uri: "https://media.moominproducts.com/moominshop_hel.jpg" },
    { uri: "https://blog.roomgo.co.uk/wp-content/uploads/2015/11/flat-above-commercial-property.jpg" },
    { uri: "https://upload.wikimedia.org/wikipedia/commons/d/d8/Charity_shop_in_West_Street_%286%29_-_geograph.org.uk_-_1504815.jpg" }
]

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 4;
const CARD_WIDTH = CARD_HEIGHT - 50;

export default class screens extends Component {
    state = {
        markers: [
            {
                coordinate: {
                    latitude: 19.450113,
                    longitude: -70.691196,
                },
                title: "Comercial #1",
                description: "Dirección #1",
                image: Images[0],
            },
            {
                coordinate: {
                    latitude: 19.452674,
                    longitude: -70.693497,
                },
                title: "Comercial #2",
                description: "Dirección #2",
                image: Images[1],
            },
            {
                coordinate: {
                    latitude: 19.453028,
                    longitude: -70.696421,
                },
                title: "Comercial #3",
                description: "Dirección #3",
                image: Images[2],
            },
            {
                coordinate: {
                    latitude: 19.451940,
                    longitude: -70.697950,
                },
                title: "Comercial #4",
                description: "Dirección #4",
                image: Images[3],
            },
        ],
        region: {

            latitude: 19.450285,
            longitude: -70.690531,
            latitudeDelta: 0.04864195044303443,
            longitudeDelta: 0.040142817690068,
        },
    };

    componentWillMount() {
        this.index = 0; //Place index
        this.animation = new Animated.Value(0);

    }
    //Es aqui el bug de los restaurantes
    componentDidUpdate() {
        let { data } = this.props;
        this.animation.addListener(({ value }) => {
            let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            if (index >= data.length) {
                index = data.length - 1;
            }
            if (index <= 0) {
                index = 0;
            }

            clearTimeout(this.regionTimeout);
            this.regionTimeout = setTimeout(() => {
                if (this.index !== index) {
                    this.index = index;
                    const { coordinate } = data[index].ubicacion;
                    this.map.animateToRegion(
                        {
                            ...data[index].ubicacion,
                        },
                        350
                    );
                }
            }, 10);
        });
    }

    render() {
        const { open, title, onClose, data, colorScheme } = this.props;
        const interpolations = data.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                ((index + 1) * CARD_WIDTH),
            ];
            const scale = this.animation.interpolate({
                inputRange,
                outputRange: [1, 2.5, 1],
                extrapolate: "clamp",
            });
            const opacity = this.animation.interpolate({
                inputRange,
                outputRange: [0.35, 1, 0.35],
                extrapolate: "clamp",
            });
            return { scale, opacity };
        });

        // alert(data.length)
        console.warn(data)

        return (
            <_Modal fullscreen title={title} open={open} onClose={onClose} >

                <View style={styles.container}>
                    <MapView
                        ref={map => this.map = map}
                        initialRegion={this.state.region}
                        style={styles.container}
                    >
                        {data.map((marker, index) => {
                            const scaleStyle = {
                                transform: [
                                    {
                                        scale: interpolations[index].scale,
                                    },
                                ],
                            };
                            const opacityStyle = {
                                opacity: interpolations[index].opacity,
                            };
                            return (
                                <MapView.Marker key={index} coordinate={marker.ubicacion}>
                                    <Animated.View style={[styles.markerWrap, opacityStyle]}>
                                        <Animated.View style={[scaleStyle]} />
                                        <_Icon name={marker.iconName} type={marker.iconType} color={PRIMARY_COLOR} />
                                        {/* <View style={styles.marker} /> */}
                                        <Text style={{ color: colorScheme == "dark" ? "white" : "black", fontSize: 12, fontWeight: "200" }} >{`${marker.nombre}`}</Text>
                                        {/* <Image source={IconShop} style={{width: 40, height: 50}} resizeMode="contain" /> */}
                                        {/* </View> */}
                                    </Animated.View>
                                </MapView.Marker>
                            );
                        })}
                    </MapView>
                    <Animated.ScrollView
                        horizontal
                        scrollEventThrottle={1}
                        showsHorizontalScrollIndicator={false}
                        snapToInterval={CARD_WIDTH}
                        onScroll={Animated.event(
                            [
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.animation,
                                        },
                                    },
                                },
                            ],
                            { useNativeDriver: true }
                        )}
                        style={styles.scrollView}
                        contentContainerStyle={styles.endPadding}
                    >
                        {data.map((marker, index) => (
                            // <TouchableOpacity key={index} onPress={() => Linking.openURL(`google.navigation:q=${marker.ubicacion.latitude}+${marker.ubicacion.longitude}`)} >
                            <TouchableOpacity key={index} onPress={() => this.map.animateToRegion(
                                {
                                    ...data[index].ubicacion,
                                },
                                350
                            )} >
                                <View style={styles.card} key={index} >
                                    <Image
                                        source={{ uri: marker.img }}
                                        // style={{width: 100, height: 100}}
                                        defaultSource={DefaultImage}
                                        style={styles.cardImage}
                                        resizeMode="cover"
                                    />
                                    <View style={styles.textContent}>
                                        <Text numberOfLines={1} style={styles.cardtitle}>{marker.nombre}</Text>
                                        <Text numberOfLines={1} style={styles.cardDescription}>
                                            {`Especialidad: ${marker.tipo}`}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </Animated.ScrollView>
                </View>
            </_Modal >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 150
    },
    scrollView: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: width - CARD_WIDTH,
    },
    card: {
        padding: 10,
        elevation: 2,
        backgroundColor: "#FFF",
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    textContent: {
        flex: 1,
    },
    cardtitle: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
    },
    marker: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        // backgroundColor: "rgba(130,4,150, 0.9)",
        backgroundColor: PRIMARY_COLOR,
    },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        // backgroundColor: "rgba(130,4,150, 0.3)",
        // backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        // borderColor: "rgba(130,4,150, 0.5)",
    },
});

AppRegistry.registerComponent("mapfocus", () => screens);