import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { HStack, Avatar, VStack, Text } from "native-base";

const SearchProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <ScrollView>
      {productsFiltered.length ? (
        productsFiltered.map((item) => (
          <Pressable
            key={item._id}
            onPress={() => {
              props.navigation.navigate("Product Detail", { item: item });
            }}
          >
            <HStack justifyContent="flex-start" alignItems="flex-start">
              <Avatar
                size="60px"
                source={{
                  uri: item.image
                    ? item.image
                    : "https://www.ormistonhospital.co.nz/wp-content/uploads/2016/05/No-Image.jpg",
                }}
              />
              <VStack ml={2}>
                <Text>{item.name}</Text>
                <Text note>{item.desription}</Text>
              </VStack>
            </HStack>
          </Pressable>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No Products match the selected criteria
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
  },
});

export default SearchProducts;
