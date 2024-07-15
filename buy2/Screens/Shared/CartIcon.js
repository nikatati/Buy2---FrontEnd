import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Badge } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <View>
      {props.cartItems.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 15,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -35,
    right: -11,
    backgroundColor: "#ff6b6b",
    borderRadius: 12.5, // גבולות מעוגלים כדי ליצור צורת עיגול
    shadowColor: "#000",
    padding: 2, // מרווח פנימי כדי שהטקסט לא ייגע בקצוות
    elevation: 3,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: "bold",
    color: "white",
    right: 5,
  },
});

export default connect(mapStateToProps)(CartIcon);
