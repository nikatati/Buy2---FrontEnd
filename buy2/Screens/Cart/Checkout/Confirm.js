import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const ListItem = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.itemContent}>{children}</View>
    </TouchableOpacity>
  );
};

const Confirm = (props) => {
  const finalOrder = props.route.params;

  const [productUpdate, setProductUpdate] = useState();
  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }
    return () => {
      setProductUpdate();
    };
  }, [props]);

  // Add this
  const getProducts = (x) => {
    const order = x.order.order;
    var products = [];
    if (order) {
      order.orderItems.forEach((cart) => {
        axios
          .get(`${baseURL}products/${cart.product}`)
          .then((data) => {
            products.push(data.data);
            setProductUpdate(products);
          })
          .catch((e) => {
            console.log(e);
          });
      });
    }
  };

  const confirmOrder = () => {
    const order = finalOrder.order.order;

    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order comlited",
            text2: "",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 2, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping To</Text>
            <View style={{ padding: 22 }}>
              <Text style={{ fontSize: 16 }}>
                Address: {finalOrder.order.order.shippingAddress1}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Address2: {finalOrder.order.order.shippingAddress2}
              </Text>
              <Text style={{ fontSize: 16 }}>
                City: {finalOrder.order.order.city}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Zip Code: {finalOrder.order.order.zip}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Country: {finalOrder.order.order.country}
              </Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {finalOrder.order.order.orderItems.map((x) => {
              return (
                <ListItem key={x.product.name}>
                  <View style={styles.thumbnailContainer}>
                    <Image
                      source={{ uri: x.product.image }}
                      style={styles.thumbnail}
                    />
                  </View>
                  <View style={styles.body}>
                    <View style={styles.left}>
                      <Text>{x.product.name}</Text>
                    </View>
                    <View style={styles.right}>
                      <Text> ${x.product.price}</Text>
                    </View>
                  </View>
                </ListItem>
              );
            })}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    height: height,
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 20,
    fontWeight: "bold",
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
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  listItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: width / 1.2,
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  itemText: {
    fontSize: 18,
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  radioCircleSelected: {
    backgroundColor: "#007bff",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  thumbnailContainer: {
    marginRight: 10,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});

export default connect(null, mapDispatchToProps)(Confirm);
