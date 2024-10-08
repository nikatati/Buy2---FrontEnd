import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SwipeListView } from "react-native-swipe-list-view";
import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

//import { Icon } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome5";

import CartItem from "./CartItem";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import AuthGlobal from "../../Context/store/AuthGlobal";
var { width } = Dimensions.get("window");

const Cart = (props) => {
  const context = useContext(AuthGlobal);
  const [swipedRows, setSwipedRows] = useState([]);
  const [productUpdate, setProductUpdate] = useState();
  const [totalPrice, setTotalPrice] = useState();
  useEffect(() => {
    getProducts();
    return () => {
      setProductUpdate();
      setTotalPrice();
    };
  }, [props]);

  const getProducts = () => {
    var products = [];
    props.cartItems.forEach((cart) => {
      axios
        .get(`${baseURL}products/${cart.product}`)
        .then((data) => {
          products.push(data.data);
          setProductUpdate(products);
          var total = 0;
          products.forEach((product) => {
            const price = (total += product.price);
            setTotalPrice(price);
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  var total = 0;
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price);
  });

  const handleSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;
    if (value < -90 && !swipedRows.includes(key)) {
      setSwipedRows([...swipedRows, key]);
    } else if (value > -75 && swipedRows.includes(key)) {
      setSwipedRows(swipedRows.filter((rowKey) => rowKey !== key));
    }
  };

  return (
    <>
      {productUpdate ? (
        <View>
          <Text style={{ alignSelf: "center" }}>Cart</Text>
          <SwipeListView
            data={productUpdate}
            renderItem={(data) => <CartItem item={data} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity
                  style={styles.hiddenButton}
                  onPress={() => {
                    props.removeFromCart(data.item);
                  }}
                >
                  <Icon name="trash" color={"red"} size={20} />
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
          <View style={styles.bottomContainer}>
            <View style={styles.left}>
              <Text style={styles.price}>$ {totalPrice}</Text>
            </View>
            <View style={styles.right}>
              <Button title="Clear" onPress={() => props.clearCart()} />
            </View>
            <View style={styles.right}>
              {context.stateUser.isAuthenticated ? (
                <Button
                  title="Checkout"
                  onPress={() => props.navigation.navigate("Checkout")}
                />
              ) : (
                <Button
                  title="Login"
                  onPress={() => props.navigation.navigate("Login")}
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </View>
      )}
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
