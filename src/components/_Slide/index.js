import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

function Slide(props) {
    const [x, setX] = useState(new Animated.Value(-500));

    useEffect(function () {
        Start();
    }, [])

    function Start() {
        Animated.spring(x, { toValue: 0, delay: 200, speed: 1 }).start();        
    }

    return (
        <Animated.View style={{ transform: [{ translateX: x }] }}>
            {props.children}
        </Animated.View>
    )
}

export default Slide;