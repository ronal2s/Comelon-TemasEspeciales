//Libraries
import React, { useState, useEffect } from 'react'
import { Animated, Image, ScrollView, ListView, FlatList, View, TouchableOpacity, Share } from 'react-native';
import { Card, CardItem, Text, List, Spinner, Content, ListItem, Grid, Row, Col } from "native-base";
import axios from "axios";
import HTML from 'react-native-render-html';
import { useColorScheme } from 'react-native-appearance';

//Style
import styles from "../../styles";
//Constants
import { PRIMARY_COLOR } from "../../const"
//Components
import _Title from "../../components/_Title";
import _Icon from "../../components/_Icon";
import _Slide from "../../components/_Slide";
//Modals
import Modal_News from "../../modals/news"
//Constants
import { URL_SERVICE, Truncate, dimensions, imageHeight, imageWidth } from "../../const";
import DefaultImage from "../../../assets/default.jpg";

function _Cards(props) {
    const { data, loading, onOpenModal } = props;
    let card_title = null;
    let card_image = null;
    let card_new = {};
    // console.warn(data)
    // return null;
    if (data.length > 0) {
        return <ScrollView>
            {data.map((v, i) => {
                card_title = v.title.rendered;
                card_image = "https://radioven.com/wp-content/uploads/" + v["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"];
                card_new = { title: card_title, content: v.content.rendered, image: card_image };
                return <Card key={i} >
                    <CardItem button onPress={() => onOpenModal("news", { title: v.title.rendered, image: "https://radioven.com/wp-content/uploads/" + v["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"], content: v.content.rendered })} >
                        <Image source={{ uri: card_image }}
                            style={{ height: 200, flex: 1 }} resizeMode="contain" />
                    </CardItem>
                    <CardItem button onPress={() => onOpenModal("news", { title: v.title.rendered, image: "https://radioven.com/wp-content/uploads/" + v["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"], content: v.content.rendered })}>
                        <_Title>{card_title}</_Title>
                    </CardItem  >
                    <CardItem style={{ flexDirection: "row-reverse", marginTop: -15 }} >
                        <Text style={{ color: PRIMARY_COLOR, }} >{new Date(v.date).toLocaleDateString()}</Text>
                        <_Icon name="calendar" color={PRIMARY_COLOR} />
                    </CardItem>
                </Card>
            })}
        </ScrollView>
    }

    if (!loading && !data.length > 0) {
        return <Text>Sin datos</Text>
    }

    return <Text />

}

function Employees() {
    const [x, setX] = useState(new Animated.Value(-100));
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingNews, setLoadingNews] = useState([]);
    const [modal, setModal] = useState({ news: false });
    const [news_selected, setActualNew] = useState({ title: "", data: {}, image: "" })
    

    useEffect(function () {
        slide();
        getNews(page);
    }, [page])

    function getNews(page) {
        setLoading(true);
        axios.get(`${URL_SERVICE}/posts?page=${page}&_embed`)
            .then(result => {
                setData([...data, ...result.data])
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            })
    }

    function slide() {
        Animated.spring(x, {
            toValue: 0,
        }).start();
    };

    function onOpenModal(name, obj) {
        setActualNew(obj);
        setModal({ [name]: true });
    }

    function onCloseModal(name) {
        setModal({ [name]: false });
    }


    function updateNews() {
        setPage(page + 1);
        // getNews(page)
    }

    async function onShare(title, link) {
        try {
            const result = await Share.share({
                message: `${title} - ${link}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    }
    let card_title = ""
    let card_content = ""
    let card_image = ""
    let colorScheme = useColorScheme();
    let darkThemeView = {backgroundColor: colorScheme == "dark"? "black":"white", paddingHorizontal: 5, flex: 1}
    // alert(colorScheme)
    return (
        <View style={darkThemeView} >

            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                onEndReached={updateNews}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                ListEmptyComponent={loading ? <Text /> : <_Title style={{ textAlign: "center" }} >No hay datos</_Title>}
                ListFooterComponent={loading ? <Spinner color={colorScheme == "dark"?"white": PRIMARY_COLOR} /> : <Text />}
                renderItem={({ item, index }) => {
                    card_title = item.title.rendered;
                    card_image = "https://radioven.com/wp-content/uploads/" + item["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"];
                    card_content = item.content.rendered;
                    return (
                        <_Slide>
                            <View key={index}>
                                <ListItem style={{ marginLeft: 0, borderBottomWidth: 0 }} >
                                    <TouchableOpacity onLongPress={() => onShare(item.title.rendered, item["_embedded"]["wp:featuredmedia"][0]["link"])} onPress={() => onOpenModal("news", { title: item.title.rendered, image: "https://radioven.com/wp-content/uploads/" + item["_embedded"]["wp:featuredmedia"][0]["media_details"]["file"], content: item.content.rendered })}>
                                        <View  >
                                            <View >
                                                <Image
                                                    source={{ uri: card_image }}
                                                    style={{ height: imageHeight, width: imageWidth }}                                                    
                                                    // resizeMode="contain"
                                                    defaultSource={DefaultImage} />
                                            </View>                                            
                                            <View style={{  width: "95%",  }} >
                                                <HTML html={card_title} baseFontStyle={{ color: colorScheme == "dark"?"white":PRIMARY_COLOR, fontWeight: "bold", fontSize: 20, }} containerStyle={{marginBottom: -10}} />                                                
                                            </View>

                                        </View>
                                    </TouchableOpacity>
                                </ListItem>

                            </View>
                        </_Slide>
                    )
                }}
            />
            {/* {loading && <Spinner color={PRIMARY_COLOR} />} */}
            <Modal_News open={modal.news} data={news_selected} title="Prueba" onClose={() => onCloseModal("news")} />
        </View>
    )
    return (
        <Content onScroll={onScroll} scrollEventThrottle={200}>
            <List>
                <_Cards data={data} loading={loading} onOpenModal={onOpenModal} />
                {loading && <Spinner color={PRIMARY_COLOR} />}
            </List>
            <Modal_News open={modal.news} data={news_selected} title="Prueba" onClose={() => onCloseModal("news")} />

        </Content>
    )


}

export default Employees;
