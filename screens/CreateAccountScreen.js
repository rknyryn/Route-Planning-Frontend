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
import { Picker } from "@react-native-picker/picker";

export default function CreateAccountScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedData, setSelectedData] = useState();

  async function createAccount() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
      user_type: selectedData,
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
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedData}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedData(itemValue);
            }}
          >
            <Picker.Item label={"Admin"} value={1} key={1} />
            <Picker.Item label={"User"} value={0} key={0} />
          </Picker>
        </View>
      </View>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={createAccount}>
          <Text style={styles.buttonText}>Create Account</Text>
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
  picker: {
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: "#DFDFDF"
  }
});
