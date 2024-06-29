import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";

const Header = () => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Image
          source={require("../../assets/Logo.png")}
          resizeMode="stretch"
          style={styles.ImageLocation}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  ImageLocation: {
    height: 100,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -25, // Adjust this value to move the image down
  },
});

export default Header;
