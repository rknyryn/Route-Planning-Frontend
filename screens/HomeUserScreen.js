import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Map from "../components/Map";

export default function HomeUser({ route, navigation }) {
  const { user } = route.params;
  var today = new Date();
  const [selectedData, setSelectedData] = useState();
  const [stations, setStations] = useState([]);
  const date =
    today.getDate() +
    1 +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear();

  async function getAllStation() {
    var myHeaders = new Headers();
    myHeaders.append(
      "Cookie",
      "ARRAffinity=6507bdc255f23a4f1ad4b5182514791bd1126448d921d867fd42e77489564d58"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      "http://route-planning-backend.azurewebsites.net/station/list",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setStations(result.station_list);
      })
      .catch((error) => console.log("error", error));
  }

  async function chooseStation() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user.user_id,
      user_station_id: selectedData.id,
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://route-planning-backend.azurewebsites.net/route/chose-station/",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => Alert.alert("Route Planning", result.msg))
      .catch((error) => console.log("error", error));
  }

  async function getServiceRoute() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      user_id: user.user_id,
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      "http://route-planning-backend.azurewebsites.net/algorithm/limited-car/route",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code == 403) {
          Alert.alert("Route Plannig", result.msg);
        } else {
          navigation.navigate("Map", { data: result });
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getAllStation();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={getAllStation}>
          <Icon name="reload" size={26} color={"#000"} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderStationList = () => {
    return stations.map((station) => {
      return (
        <Picker.Item label={station.name} value={station} key={station.id} />
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerMap}>
        <Map stations={stations} />
      </View>
      <View style={styles.containerBody}>
        <Text style={{ fontSize: 16, marginLeft: 10, marginRight: 10, marginBottom: 5 }}>
          The date on which the service will be requested: {date}
        </Text>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedData}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedData(itemValue);
            }}
          >
            {stations && renderStationList()}
          </Picker>
        </View>
        <TouchableOpacity style={styles.button} onPress={chooseStation}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={getServiceRoute}>
          <Text style={styles.buttonText}>Route</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerMap: {
    backgroundColor: "green",
    flex: 6,
  },
  containerBody: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
    backgroundColor: "#000",
    width: "80%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  picker: {
    margin: 5,
    width: "80%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
  },
});
