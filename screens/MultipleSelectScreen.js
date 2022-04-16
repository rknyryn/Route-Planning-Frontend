import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
  const {apiBaseUrl} = require("../config.json")
  
export default function MultipleSelectScreen({ navigation }) {

  var today = new Date();
  const date =
    today.getDate() +
    1 +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear();

  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState({
    stationId: "",
    passengerCount: 0,
  });

  async function getAllStation() {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      apiBaseUrl + "/station/list",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setStations(result.station_list);
      })
      .catch((error) => console.log("error", error));
  }

  async function chooseMultipleStation() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      station_id: selectedStation.stationId,
      passenger_count: selectedStation.passengerCount,
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      apiBaseUrl + "/route/multiple-station-chose",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => Alert.alert("Route Planning", result.msg))
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getAllStation();
  }, []);

  const renderStationList = () => {
    return stations.map((station) => {
      return (
        <Picker.Item label={station.name} value={station.id} key={station.id} />
      );
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.picker}>
        <Picker
          selectedValue={selectedStation.stationId}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedStation({ ...selectedStation, stationId: itemValue });
          }}
        >
          {stations && renderStationList()}
        </Picker>
      </View>
      <TextInput
        placeholder="Passenger Count"
        keyboardType="numeric"
        style={styles.input}
        value={selectedStation.passengerCount}
        onChangeText={(text) => {
          setSelectedStation({ ...selectedStation, passengerCount: text });
        }}
      />
      <TouchableOpacity style={styles.button} onPress={chooseMultipleStation}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
  },
  picker: {
    margin: 5,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
  },
  input: {
    backgroundColor: "#DFDFDF",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: "80%",
  },
  button: {
    height: 50,
    width: "80%",
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
