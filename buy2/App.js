import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";

//Redux
import { Provider } from "react-redux";
import store from "./Redux/store";

//Navigatiors
import Main from "./Navigators/Main";

//Screens
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Screens/Shared/Header";
import { NativeBaseProvider } from "native-base";

LogBox.ignoreAllLogs(true);

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Header />
        <Main />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
