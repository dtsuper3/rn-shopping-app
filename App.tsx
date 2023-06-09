import React, { useState } from 'react';
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Provider } from "react-redux"
import store from "./store";
import { NavigationContainer } from './navigation/NavigationContainer';

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  })
}
export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
