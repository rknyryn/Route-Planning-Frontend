import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const {apiBaseUrl} = require("../config.json")

export default function CarsScreen({ navigation }) {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState();
  const [updatedCar, setUpdatedCar] = useState({
    id: 0,
    capacity: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const modalToggle = () => {
    setModalVisible(!modalVisible);
    setUpdatedCar({ id: 0, capacity: 0 });
  };

  async function getAllCar() {
    var myHeaders = new Headers();

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    await fetch(
      apiBaseUrl + "/car/list",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCars(result.car_list);
      })
      .catch((error) => console.log("error", error));
  }

  async function createCar() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      car_capacity: newCar,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      apiBaseUrl + "/car/add",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Route Planning", result.msg);
        setNewCar("");
        getAllCar();
      })
      .catch((error) => console.log("error", error));
  }

  async function updateCar() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      car_id: updatedCar.id,
      car_capacity: updatedCar.capacity,
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      apiBaseUrl + "/car/update-capacity",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Route Planning", result.msg);
        getAllCar();
        modalToggle();
      })
      .catch((error) => console.log("error", error));
  }

  async function deleteCar() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      car_id: updatedCar.id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      apiBaseUrl + "/car/delete-car",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Route Planning", result.msg);
        modalToggle();
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getAllCar();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={getAllCar}>
            <Icon name="reload" size={26} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.containerInput}>
        <TextInput
          placeholder="Capacity"
          keyboardType="numeric"
          style={styles.input}
          value={newCar}
          onChangeText={(text) => {
            setNewCar(text);
          }}
        />
        <TouchableOpacity onPress={createCar} style={styles.button}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        {cars && (
          <FlatList
            style={{ flex: 1 }}
            data={cars}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.listItem}
                  key={item.item.id}
                  onPress={() => {
                    modalToggle();
                    setUpdatedCar({
                      id: item.item.car_id,
                      capacity: item.item.car_capacity,
                    });
                  }}
                >
                  <Text>
                    Car ID: {item.item.car_id} | Capacity:{" "}
                    {item.item.car_capacity} | Fuel Consume:{" "}
                    {item.item.car_fuel_consume}
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={modalToggle}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              Car ID: {updatedCar.id}
            </Text>
            <TextInput
              placeholder="Capacity"
              keyboardType="numeric"
              style={styles.modalInput}
              value={updatedCar.capacity}
              onChangeText={(text) => {
                setUpdatedCar({ ...updatedCar, capacity: text });
              }}
            />
            <TouchableOpacity
              onPress={updateCar}
              style={[
                styles.modalButton,
                { backgroundColor: "#019267", marginTop: 10, width: "90%" },
              ]}
            >
              <Text style={styles.modalButtonText}>Update</Text>
            </TouchableOpacity>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#C70D3A" }]}
                onPress={modalToggle}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={deleteCar}
                style={[styles.modalButton, { backgroundColor: "#C70D3A" }]}
              >
                <Text style={styles.modalButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerList: {
    flex: 2,
    marginBottom: 20,
  },
  containerInput: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    backgroundColor: "#000",
    width: "80%",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#202020" + "AA",
  },
  modalView: {
    width: "90%",
    height: 250,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    backgroundColor: "#DFDFDF",
    width: "90%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  modalButton: {
    height: 50,
    width: 100,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
