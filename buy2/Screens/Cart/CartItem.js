import React, { useState } from "react";
import { Text, View, Dimensions, StyleSheet, Image } from "react-native";
import { List } from "native-base";
import Cart from "./Cart";
var { height, width } = Dimensions.get("window");

const CartItem = (props) => {
  const data = props.item;
  const [quatity, setQuantity] = useState(data.product.quantity);
  console.log(data);

  return (
    <List key={Math.random()} style={styles.listitem}>
      <View style={styles.left}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{
            uri: data.product.image
              ? data.product.image
              : "https://www.ormistonhospital.co.nz/wp-content/uploads/2016/05/No-Image.jpg",
          }}
        />
      </View>
      <View style={styles.left}>
        <Text style={styles.TextProductName}>{data.product.name}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.TextProductPrice}>$ {data.product.price}</Text>
      </View>
    </List>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // ensures content doesn't overlap with bottom container
  },
  image: {
    width: width / 2 - 20 - 70,
    height: width / 2 - 40 - 50,
    backgroundColor: "transparent",
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    alignSelf: "center",
  },
  TextProductName: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  TextProductPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    color: "red",
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "white",
  },
  left: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  listitem: {
    alignItems: "center",
    justifyContent: "center",
  },
  priceTotal: {
    fontSize: 18,
    margin: 20,
    color: "red",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export default CartItem;
