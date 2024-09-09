import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FromContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";
import Error from "../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill the form correctly");
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FromContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"password"}
          id={"password"}
          secureTextEmtry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <Button title={"Register"} onPress={() => register()} />
        </View>
        <View style={styles.BackToLoginBtn}>
          <Button
            title={"Back to login"}
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </FromContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
    margin: 10,
  },
  text: {
    color: "red",
  },
  BackToLoginBtn: {
    marginTop: 15,
  },
});

export default Register;
