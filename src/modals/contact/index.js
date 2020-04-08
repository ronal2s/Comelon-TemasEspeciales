//Libraries
import React, { useState } from "react";
import { useColorScheme } from 'react-native-appearance';
import { Spinner } from "native-base";
import Axios from "axios";
//Components
import _Modal from "../../components/_Modal";
import _Title from "../../components/_Title";
import _Input from "../../components/_Input";
import _Button from "../../components/_Button";
import { Text } from "native-base";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { PRIMARY_COLOR, URL_SERVICE } from "../../const"

function Item(props) {
    let { open, title, onClose } = props;
    const [msj, setMsj] = useState("");
    const [loading, setLoading] = useState(false);
    let colorScheme = useColorScheme();
    let darkThemeTitle = { color: colorScheme == "dark" ? "white" : "black" }


    function onSendMessage() {
        setLoading(true);
        Axios.get(`${URL_SERVICE}/contacto?body=${msj}`)
            .then(res => {
                setLoading(false);
                if (!res.data.error) {
                    alert("Mensaje enviado");
                } else {
                    alert("Ha ocurrido un error");
                }
            })
            .catch(err => {
                console.error("Error obteniendo la informacion", err);
                setLoading(false);
            })
    }


    const handleInput = (name, text) => {
        setMsj(text);
    }

    return (
        <_Modal title={title} open={open} onClose={onClose} height={200} >
            <_Title >{title}</_Title>
            <_Input label="Mensaje" name="msj" value={msj} onChange={handleInput} />
            <TouchableOpacity onPress={onSendMessage} >
                {loading && <Spinner color={PRIMARY_COLOR} />}
                {!loading &&
                    <Text style={{ textAlign: "center", marginTop: 10, color: PRIMARY_COLOR }} >
                        Enviar
                </Text>
                }
            </TouchableOpacity>
        </_Modal>
    )
}


export default Item;