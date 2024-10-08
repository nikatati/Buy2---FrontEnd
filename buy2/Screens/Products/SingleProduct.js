import React, { useState, useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Button,
} from "react-native";
import { Container } from "native-base";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item);
  const [availability, setAvailability] = useState("");

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://www.ormistonhospital.co.nz/wp-content/uploads/2016/05/No-Image.jpg",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.h1}>{item.name}</Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>
        <View>
          <Text>{item.description}</Text>
        </View>
        {/*TODO: Description*/}
      </ScrollView>

      <View style={styles.bottomContainer}>
        <View style={styles.left}>
          <Text style={styles.price}> $ {item.price}</Text>
        </View>
        <View style={styles.right}>
          <Button
            title="Add"
            onPress={() => {
              props.addItemToCart(item.id),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${item.name} added to cart`,
                  text2: "Go to cart to comlete order",
                });
            }}
          />
        </View>
      </View>
    </View>
  );
};

const mapToDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  h1: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 22,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    //backgroundColor: "white",
  },
  left: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  right: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
});

export default connect(null, mapToDispatchToProps)(SingleProduct);
