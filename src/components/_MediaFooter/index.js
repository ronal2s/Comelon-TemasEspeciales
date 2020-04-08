import React, { useState, useEffect } from "react";
import {  Button, Spinner, View } from "native-base";


//My components
import _Icon from "../_Icon";
//Aux
import { PRIMARY_COLOR } from "../../const"
function Item(props) {
    const { radio1, radio2, play, backButton, forwardButton, bigger } = props;
    console.warn(radio1)
    console.warn(radio2)
    const sizeIcon = bigger ? 60 : 35;
    return (
        // <Footer style={{ backgroundColor: PRIMARY_COLOR }} >
        //     <FooterTab style={{ backgroundColor: PRIMARY_COLOR }} >
        <View  >
            {/* <View style={{paddingBottom: 50}} > */}
            <View style={{ flexDirection: "row", justifyContent: "space-around", }} >
                <View  >
                    <Button transparent onPress={backButton} style={{width: bigger? 100: null, height: bigger? 100: null}} >
                        <_Icon name="skip-previous" color="white" size={sizeIcon} />
                    </Button>
                </View>
                <View>
                    <Button transparent onPress={play} style={{ width: bigger ? "100%" : null, height: bigger? 100: null }} >
                        {(radio1 == "playing" || radio2 == "playing") && <_Icon name="pause-circle" color="white" size={sizeIcon} />}
                        {((radio1 == "donepause" || radio1 == "nosound") && (radio2 == "donepause" || radio2 == "nosound")) && <_Icon name="play-circle" color="white" size={sizeIcon} />}
                        {(radio1 == 'loading' || radio2 == 'loading') && <Spinner color="white" />}
                        {/* <_Icon name="play-circle" color="white" size={40} /> */}
                    </Button>
                </View>
                <View>
                    <Button transparent onPress={forwardButton} style={{width: bigger? 100: null, height: bigger? 100: null}}>
                        <_Icon name="skip-next" color="white" size={sizeIcon} />
                    </Button>
                </View>
            </View>
        </View>
        //     </FooterTab>
        // </Footer>
    )
}

export default Item;