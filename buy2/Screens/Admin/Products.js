import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ListItem from "./ListItem";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-community/async-storage";

var { height, width } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "700" }}>Price</Text>
      </View>
    </View>
  );
};

const Products = (props) => {
  const [productList, setProductList] = useState();
  const [productFilter, setProductFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      //Get TOKEN
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));
      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data);
        setProductFilter(res.data);
        setLoading(false);
      });
      return () => {
        setProductList();
        setProductFilter();
        setLoading(true);
      };
    }, [])
  );

  const searchProduct = (text) => {
    if (text == "") {
      setProductFilter(productList);
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteProduct = (id) => {
    console.log("Token:", token);
    console.log("Delete URL:", `${baseURL}products/${id}`);
    console.log("ID to delete:", id);

    axios
      .delete(`${baseURL}product/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        //console.log("Product deleted successfully:", res.data);
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
        //setProductList(products);
      })
      .catch((error) => {
        console.log("Delete error:", error.response?.data || error.message);
      });
  };

  return (
    <View>
      <View style={styles.buttonWrapper}>
        <Button
          title="Orders"
          color="#4682B4"
          onPress={() => props.navigation.navigate("Orders")}
        ></Button>
        <Button
          title="Products"
          color="#4682B4"
          onPress={() => props.navigation.navigate("ProductForm")}
        ></Button>
        <Button
          title="Categories"
          color="#4682B4"
          onPress={() => props.navigation.navigate("Categories")}
        ></Button>
      </View>
      {/* Search bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          onChangeText={(text) => searchProduct(text)}
        />
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteProduct}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    margin: 10,
  },
  searchInput: {
    height: 40,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWrapper: {
    flexDirection: "row", // Arrange buttons horizontally
    marginHorizontal: 10, // Horizontal spacing between buttons
    borderRadius: 10, // Rounded corners for button container
    //overflow: "hidden", // Ensure border radius applies to Button
    justifyContent: "center", // Center the buttons horizontally
    alignItems: "center", // Center the buttons vertically
  },
});

export default Products;
