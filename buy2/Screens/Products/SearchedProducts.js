import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { HStack, Avatar, VStack, Text } from "native-base";

const SearchProducts = (props) => {
  const { productsFiltered } = props;
  return (
    <ScrollView>
      {productsFiltered.length ? (
        productsFiltered.map((item) => (
          <HStack
            key={item._id.$oid}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
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
  },
});
export default SearchProducts;

//קורס כאשר מכניסים ערך שגוי בתא חיפוש. צריך לתקן!!1
