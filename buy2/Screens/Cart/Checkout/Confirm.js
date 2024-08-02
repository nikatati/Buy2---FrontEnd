import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../../Redux/Actions/cartActions";

var { height } = Dimensions.get("window");

const Confirm = (props) => {
  const confrim = props.route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 2, borderColor: "orange" }}>
            <Text style={styles.shipping}>Shipping To</Text>
            <View style={{ padding: 22 }}>
              <Text style={{ fontSize: 16 }}>
                Address:{confrim.order.order.shippingAddress1}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Address2:{confrim.order.order.shippingAddress2}
              </Text>
              <Text style={{ fontSize: 16 }}>
                City:{confrim.order.order.city}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Zip Code:{confrim.order.order.zip}
              </Text>
              <Text style={{ fontSize: 16 }}>
                Country:{confrim.order.order.country}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
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
  shipping: {
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
    flex: 1,
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 30,
  },
  content: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff", // תוכל לשנות את צבע הרקע לפי הצורך שלך
  },
  listItem: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemContent: {
    // עיצוב נוסף לפי הצורך
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
    backgroundColor: "#007bff", // צבע של הבחירה (כחול לדוגמה)
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
});

export default Confirm;
