import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

const ListItem = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <View style={styles.itemContent}>{children}</View>
    </TouchableOpacity>
  );
};

const RadioButton = ({ selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View
        style={[styles.radioCircle, selected && styles.radioCircleSelected]}
      />
    </TouchableOpacity>
  );
};

const Payment = (props) => {
  const order = props.route.params;

  const [selected, setSelected] = useState();
  const [card, setCard] = useState();

  return (
    <View style={styles.container}>
      <View style={styles.h1}>
        <View style={styles.body}>
          <Text style={styles.title}>Choose your Payment method</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        {methods.map((item) => (
          <ListItem key={item.name} onPress={() => setSelected(item.value)}>
            <View>
              <View style={styles.right}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
              <RadioButton
                selected={selected === item.value}
                onPress={() => setSelected(item.value)}
              />
            </View>
          </ListItem>
        ))}
        {selected == 3 ? (
          <Picker
            mode="deopdown"
            selectedValue={card}
            onValueChange={(x) => setCard(x)}
          >
            {paymentCards.map((c, index) => {
              return <Picker.Item key={c.name} label={c.name} value={c.name} />;
            })}
          </Picker>
        ) : null}
        <View style={{ marginTop: 60, alignSelf: "center" }}>
          <Button
            title={"Confirm"}
            onPress={() => props.navigation.navigate("Confirm", { order })}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
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
});

export default Payment;
