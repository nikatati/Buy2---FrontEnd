import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { List } from "native-base";
import { Icon } from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {props.cartItems.length ? (
          <View>
            <Text style={styles.h1}>Cart</Text>
            {props.cartItems.map((data) => {
              return (
                <List.Item key={Math.random()} style={styles.listitem}>
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
                    <Text style={styles.TextProductName}>
                      {data.product.name}
                    </Text>
                  </View>
                  <View style={styles.right}>
                    <Text style={styles.TextProductPrice}>
                      $ {data.product.price}
                    </Text>
                  </View>
                </List.Item>
              );
            })}
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Looks like your cart is empty
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Add products to your cart to get started
            </Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.left}>
          <Text style={styles.priceTotal}>${total}</Text>
        </View>
        <View style={styles.right}>
          <Button title="Clear" onPress={() => props.clearCart()} />
        </View>
        <View style={styles.right}>
          <Button
            title="Checkout"
            onPress={() => props.navigation.navigate("Checkout")}
          />
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
