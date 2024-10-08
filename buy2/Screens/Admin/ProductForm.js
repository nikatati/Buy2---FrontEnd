import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Button,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import FormContainer from "../Shared/Form/FormContainer";
import Error from "../Shared/Error";
import Icon from "react-native-vector-icons/FontAwesome";
//import { Icon } from "native-base";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-community/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";

const ProductForm = (props) => {
  const [pickerValue, setPickerValue] = useState();
  const [brand, setBrand] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
  const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
  const [richDescription, setRichDescription] = useState();
  const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setBrand(props.route.params.item.brand);
      setName(props.route.params.item.name);
      setPrice(props.route.params.item.price.toString());
      setDescription(props.route.params.item.description);
      setMainImage(props.route.params.item.image);
      setImage(props.route.params.item.image);
      setCategory(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock.toString());
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    // Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();

    return () => {
      setCategories([]);
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const uri = result.uri || (result.assets && result.assets[0].uri); // Check both possibilities
      if (uri) {
        setMainImage(uri);
        setImage(uri);
      }
    }
  };

  const addProduct = () => {
    console.log("Confirm button clicked!");

    if (
      name == "" ||
      brand == "" ||
      price == "" ||
      description == "" ||
      category == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
      console.log("Form validation failed: some fields are empty.");
      return;
    }

    // Ensure `image` is not undefined
    if (!image) {
      setError("Please pick an image");
      console.log("No image selected.");
      return;
    }

    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");

    console.log("New Image URI:", newImageUri);

    formData.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });

    console.log("Image Object in FormData:", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: newImageUri.split("/").pop(),
    });
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("richDescription", richDescription);
    formData.append("rating", rating);
    formData.append("numReviews", numReviews);
    formData.append("isFeatured", isFeatured);

    console.log("Form Data to be submitted:", formData);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("Authorization Token:", token);

    if (item !== null) {
      console.log("Updating an existing product...");
      axios
        .put(`${baseURL}products/${item.id}`, formData, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            console.log("New product added successfully:", res.data);
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "product sussesfuly changed",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          // Log error response for debugging
          if (error.response) {
            console.log("Server responded with:", error.response.data);
          } else if (error.request) {
            console.log("No response received:", error.request);
          } else {
            console.log("Error creating request:", error.message);
          }
        });
    } else {
      console.log("Adding a new product...");
      axios
        .post(`${baseURL}products`, formData, config)
        .then((res) => {
          console.log("Response:", res.status, res.data);
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          if (error.response) {
            console.log(
              "Server responded with:",
              error.response.status,
              error.response.data
            );
          } else if (error.request) {
            console.log("No response received from server:", error.request);
          } else {
            console.log("Error during setup request:", error.message);
          }
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  return (
    <FormContainer title="Add Product">
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: mainImage }} />
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Brand</Text>
      </View>
      <TextInput
        placeholder="Brand"
        value={brand}
        onChangeText={(text) => setBrand(text)}
        style={styles.input}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Name</Text>
      </View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        style={styles.input}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Price</Text>
      </View>
      <TextInput
        placeholder="Price"
        value={price}
        keyboardType={"numeric"}
        onChangeText={(text) => setPrice(text)}
        style={styles.input}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Count in Stock</Text>
      </View>
      <TextInput
        placeholder="Stock"
        value={countInStock}
        keyboardType={"numeric"}
        onChangeText={(text) => setCountInStock(text)}
        style={styles.input}
      />
      <View style={styles.label}>
        <Text style={{ textDecorationLine: "underline" }}>Description</Text>
      </View>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={styles.input}
      />
      <Picker
        selectedValue={pickerValue}
        onValueChange={(e) => {
          setPickerValue(e);
          setCategory(e);
        }}
        style={styles.picker}
      >
        {categories.map((c) => {
          return <Picker.Item key={c.id} label={c.name} value={c.id} />;
        })}
      </Picker>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <Button title="Confirm" onPress={addProduct} />
      </View>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
  },
  buttonContainer: {
    width: "80%",
    marginBottom: 80,
    marginTop: 20,
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    padding: 5,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: "solid",
    borderWidth: 8,
    padding: 0,
    justifyContent: "center",
    borderRadius: 100,
    borderColor: "#E0E0E0",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  imagePicker: {
    position: "absolute",
    right: 5,
    bottom: 5,
    backgroundColor: "grey",
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
  picker: {
    width: "80%",
    height: 50,
    marginBottom: 10,
  },
});

export default ProductForm;
