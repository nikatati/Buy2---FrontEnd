import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import { Icon, Input } from "native-base";
import Banner from "../Shared/Banner";
import CategoryFilter from "./CategoreyFilter";

//const data = require("../../assets/data/products.json");
const productscCtegories = require("../../assets/data/categories.json");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState([]);
  const [categories, setCatecories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initailState, setInitailState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);
      //setCatecories(productscCtegories);

      //Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          //console.log("Response from server:", res.data);
          setProducts(res.data);
          setProductsFiltered(res.data);
          setProductsCtg(res.data);
          setInitailState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error fetching products:", error);
        });

      //Categoties
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCatecories(res.data);
        })
        .catch((error) => {
          console.log("Api call error:", error);
        });

      return () => {
        setProducts([]);
        setProductsFiltered([]);
        setFocus();
        setCatecories([]);
        setActive();
        setInitailState();
      };
    }, [])
  );

  // useEffect(() => {
  //   setFocus(false);
  //   setCatecories(productscCtegories);
  //   setActive(-1);

  //   // שימוש ב-fetch במקום axios
  //   fetch(`http://10.100.102.8:3000/api/v1/products`)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }
  //       console.log(response.json());
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setProducts(data);
  //       setProductsFiltered(data);
  //       setProductsCtg(data);
  //       setInitailState(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching products:", error);
  //     });

  //   return () => {
  //     setProducts([]);
  //     setProductsFiltered([]);
  //     setFocus();
  //     setCatecories([]);
  //     setActive();
  //     setInitailState();
  //   };
  // }, []);

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
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <>
      {loading == false ? (
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Search"
            onFocus={openList}
            onChangeText={(text) => SearchProduct(text)}
            marginBottom={1}
            marginTop={12}
            backgroundColor={"blue.100"}
          />
          {focus == true ? <Icon onPress={onBlur} name="close" /> : null}
          {focus == true ? (
            <SearchedProduct
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View style={styles.container}>
                <Banner />

                <CategoryFilter
                  categories={categories}
                  categoryFilter={changeCtg}
                  productsCtg={productsCtg}
                  active={active}
                  setActive={setActive}
                />

                {productsCtg.length > 0 ? (
                  <View style={styles.productCardContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.navigation}
                          key={item._id}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={styles.center}>
                    <Text>No Products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </View>
      ) : (
        //Loading
        <View
          style={{
            flex: 1,
            backgroundColor: "#f2f2f2",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      )}
    </>
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
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  productCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around", // אפשרות למרווח בין המוצרים
  },
  item: {
    width: "48%", // הגדרת הרוחב של כל פריט כ-50% פחות המרווח
    margin: "1%", // מרווח בין הפריטים
  },
});

export default ProductContainer;
