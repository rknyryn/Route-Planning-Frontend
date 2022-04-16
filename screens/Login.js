import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
const { apiBaseUrl } = require("../config.json");

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginRequest() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return await fetch(apiBaseUrl + "/account/auth", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        return result;
      })
      .catch((error) => console.log("error", error));
  }

  async function loginControl() {
    await loginRequest().then((response) => {
      if (response.status_code == 200) {
        if (response.user_type == 0) {
          navigation.navigate("HomeUser", { user: response });
        } else {
          navigation.navigate("HomeAdmin", { user: response });
        }
      } else {
        alert(response.msg);
      }
    });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Image
        style={styles.image}
        resizeMode="cover"
        source={require("../assets/route-icon.png")}
      />
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
        <TouchableOpacity style={styles.buttonLogin} onPress={loginControl}>
          <Text style={styles.buttonLoginText}>Login</Text>
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
  buttonLogin: {
    backgroundColor: "#000",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonLoginText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonRegister: {
    backgroundColor: "#FFF",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonRegisterText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 40,
    borderRadius: 20,
  },
});
