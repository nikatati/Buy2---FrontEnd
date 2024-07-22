import React from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { Icon } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";

import CartItem from "./CartItem";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
var { width } = Dimensions.get("window");

const Cart = (props) => {
  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  //console.log(props.cartItems); // הוסף את זה כדי לבדוק מהו התוכן של cartItems

  return (
    <>
      {props.cartItems.length ? (
        <View>
          <Text style={styles.h1}>Cart</Text>
          <SwipeListView
            data={props.cartItems}
            renderItem={({ item }) => <CartItem item={item} />}
            renderHiddenItem={({ item }) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => props.removeFromCart(item)}
                >
                  <AntDesign name="delete" size={30} color="black" />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
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
    </>
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
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 100, // ensures content doesn't overlap with bottom container
    //backgroundColor: "red",
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
    //backgroundColor: "red",
  },
  hiddenContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
    //backgroundColor: "red",
  },
  hiddenButton: {
    //backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
    height: 70,
    width: width / 1.2,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
