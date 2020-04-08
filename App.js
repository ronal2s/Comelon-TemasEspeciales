import React, { useEffect, useState } from 'react';
import { AppLoading, ScreenOrientation } from "expo";
import * as Font from 'expo-font';
import Main from './src/main'
import { PRIMARY_COLOR} from "./src/const"
import { Platform } from 'react-native';

// console.disableYellowBox = true
export default function App() {
  const [loading, setLoading] = React.useState(true)

  async function loadFont() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    })
    setLoading(false)
  }

  useEffect(function () {
    // StatusBar.setTranslucent(true);
    // StatusBar.setBackgroundColor(PRIMARY_COLOR)
    
    if (Platform.isPad) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }
    loadFont();
  })

  if (!loading) {
    return (
      <Main />
    );
  }
  return <AppLoading />
}
