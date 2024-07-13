import React from "react";
import { Text, View } from "react-native";

import { connect } from "react-redux";

const Cart = (props) => {
  return (
    <View style={{ flex: 1 }}>
      {props.cartItems.map((x) => (
        <Text key={x.product._id.$oid}>
          {x.product.name} -ID: {x.product._id.$oid}
        </Text>
      ))}
    </View>
  );
};

const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

export default connect(mapStateToProps, null)(Cart);
