import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FromContainer from "../Shared/Form/FormContainer";
import Input from "../Shared/Form/Input";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <FromContainer title={"Login"}>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Password"}
        name={"Password"}
        id={"Password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setEmail(text)}
      />
      <View style={styles.buttonGroup}>
        <Button title="Login" />
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <Button
          title="Register"
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </FromContainer>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 20,
    alignSelf: "center",
  },
});

export default Login;
