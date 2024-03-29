import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
} from "react-native";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import { Container, Icon, Input } from "native-base";
import Banner from "../Shared/Banner";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
    };
  }, []);

  const SearchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <Container>
      <Icon name="search" />
      <Input
        placeholder="Search"
        onFocus={openList}
        onChangeText={(text) => SearchProduct(text)}
      />
      {focus == true ? <Icon onPress={onBlur} name="close" /> : null}
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={styles.container}>
          <View>
            <Banner />
          </View>

          <View style={styles.listContainer}>
            <FlatList
              numColumns={2}
              //horizontal
              data={products}
              renderItem={({ item }) => (
                <ProductList key={item.id} item={item} />
              )}
              keyExtractor={(item) => item.name}
            />
          </View>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    marginTop: 200,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductContainer;
