import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { Badge } from "native-base";

const CategoryFilter = (props) => {
  return (
    <ScrollView
      horizontal={true}
      bounces={true}
      style={{ backgroundColor: "#f2f2f2" }}
      margin={10}
    >
      <TouchableOpacity
        key={1}
        onPress={() => {
          props.categoryFilter("all"), props.setActive(-1);
        }}
      >
        <Badge
          style={[
            styles.center,
            { margin: 5 },
            props.active == -1 ? styles.active : styles.inactive,
          ]}
        >
          <Text style={styles.badgeText}>All</Text>
        </Badge>
      </TouchableOpacity>
      {props.categories.map((item) => (
        <TouchableOpacity
          key={item._id.$oid}
          onPress={() => {
            props.categoryFilter(item._id.$oid),
              props.setActive(props.categories.indexOf(item));
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              props.active == props.categories.indexOf(item)
                ? styles.active
                : styles.inactive,
            ]}
          >
            <Text style={styles.badgeText}>{item.name}</Text>
          </Badge>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    marginTop: 15,
  },
  badgeContainer: {
    backgroundColor: "red",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 5,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 24,
    height: 38,
    borderWidth: 1,
    borderColor: "white",
  },
  badgeText: {
    color: "white",
    fontSize: 20,
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
  scrollView: {},
});

export default CategoryFilter;
