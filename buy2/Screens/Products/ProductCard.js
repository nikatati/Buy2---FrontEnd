import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://www.ormistonhospital.co.nz/wp-content/uploads/2016/05/No-Image.jpg",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}> ${price}</Text>

      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button
            title={"Add"}
            color={"green"}
            onPress={() => {
              props.addItemToCart(props.id),
                Toast.show({
                  topOffset: 60,
                  type: "success",
                  text1: `${name} added to cart`,
                  text2: "Go to your cart to complite order",
                });
            }}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}> Currntly Unavailable</Text>
      )}
    </View>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  };
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 20,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alginItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 90,
    marginBottom: 10,
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
    textAlign: "center",
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
