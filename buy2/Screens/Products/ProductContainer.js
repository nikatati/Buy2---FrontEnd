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
import { Icon, Input } from "native-base";
import Banner from "../Shared/Banner";
import CategoryFilter from "./CategoreyFilter";

const data = require("../../assets/data/products.json");
const productscCtegories = require("../../assets/data/categories.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState([]);
  const [categories, setCatecories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initailState, setInitailState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCatecories(productscCtegories);
    setActive(-1);
    setInitailState(data);
    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setCatecories([]);
      setActive();
      setInitailState();
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

  //Categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initailState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category.$oid === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <Input
        placeholder="Search"
        onFocus={openList}
        onChangeText={(text) => SearchProduct(text)}
        marginBottom={7}
        marginTop={12}
        backgroundColor={"blue.100"}
      />
      {focus == true ? <Icon onPress={onBlur} name="close" /> : null}
      {focus == true ? (
        <SearchedProduct productsFiltered={productsFiltered} />
      ) : (
        <View style={styles.container}>
          <Banner />

          <CategoryFilter
            categories={categories}
            categoryFilter={changeCtg}
            productsCtg={productsCtg}
            active={active}
            setActive={setActive}
          />

          <FlatList
            numColumns={2}
            //horizontal
            data={products}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "gainsboro",
    width: "100%",
  },
  listContainer: {
    marginTop: 15,
  },
});

export default ProductContainer;
