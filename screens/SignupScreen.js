import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function createAccount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
      user_type: 0,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "http://route-planning-backend.azurewebsites.net/account/register",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Route Planning", result.msg);
        navigation.goBack();
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={(text) => {
            setUsername(text);
          }}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
          secureTextEntry
        />
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  containerInput: {
    width: "80%",
  },
  input: {
    backgroundColor: "#DFDFDF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  containerButton: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#000",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
