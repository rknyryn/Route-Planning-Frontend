import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import React, { useState, useEffect } from "react";
const { apiBaseUrl } = require("../config.json");

export default function DailyVoteScreen({ navigation }) {
  const today = new Date();
  const date =
    today.getDate() +
    1 +
    "/" +
    (today.getMonth() + 1) +
    "/" +
    today.getFullYear();
  const [dailyList, setDailyList] = useState([]);
  const [carStats, setCatStats] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function getDailyList() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(apiBaseUrl + "/route/daily-vote/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 403) {
          Alert.alert("Route Planning", result.msg);
        } else {
          setDailyList(result.daily_vote_list);
        }
      })
      .catch((error) => console.log("error", error));
  }

  async function saveRoute() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(
      apiBaseUrl + "/algorithm/limited-car/route-save",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Route Planning", result.msg);
      })
      .catch((error) => console.log("error", error));
  }

  async function getRouteList() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(apiBaseUrl + "/algorithm/limited-car/route-list", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 403) {
          Alert.alert("Route Planning", result.msg);
        } else {
          navigation.navigate("MapAdmin", { routeList: result.route_list });
        }
      })
      .catch((error) => console.log("error", error));
  }

  async function routeClear() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      route_date: date,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(apiBaseUrl + "/route/clear-route", requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));

    await fetch(
      "http://route-planning-backend.azurewebsites.net/algorithm/clear-car-stats",
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => console.log("error", error));

    await fetch(
      "http://route-planning-backend.azurewebsites.net/route/clear-daily-vote",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        Alert.alert("Route Planning", result.msg);
        setDailyList([]);
      })
      .catch((error) => console.log("error", error));
  }

  async function getCarStats() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      route_date: date,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    await fetch(apiBaseUrl + "/algorithm/car-stats", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status_code === 401) {
          Alert.alert("Route Planning", result.msg);
        } else {
          setCatStats(result.car_stats);
          setShowModal(true);
        }
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    getDailyList();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={{ marginRight: 10 }} onPress={getDailyList}>
            <Icon name="reload" size={26} color={"#000"} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.containerList}>
        {dailyList && (
          <FlatList
            style={{ flex: 1 }}
            data={dailyList}
            renderItem={(item) => {
              return (
                <View style={styles.item}>
                  <Text>{item.item.name}</Text>
                  <Text>
                    {item.item.passenger_count}{" "}
                    <Icon name="account" size={12} color={"#000"} />
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <View style={styles.containerButton}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("MultipleSelect")}
            style={[styles.button, { backgroundColor: "#2E86C1" }]}
          >
            <Text style={styles.buttonText}>Multiple Select</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#2E86C1" }]}
            onPress={routeClear}
          >
            <Text style={styles.buttonText}>Route Clear</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF5733" }]}
            onPress={getCarStats}
          >
            <Text style={styles.buttonText}>Car Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#FF5733" }]}
            onPress={getRouteList}
          >
            <Text style={styles.buttonText}>Show Routes</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.button, { width: "90%", backgroundColor: "#019267" }]}
          onPress={saveRoute}
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: "80%",
                width: "100%",
                backgroundColor: "pruple",
              }}
            >
              {carStats && (
                <FlatList
                  style={{ flex: 1 }}
                  data={carStats}
                  renderItem={(item, index) => {
                    return (
                      <View style={styles.item} key={index}>
                        <Text>
                          Car ID: {item.item.car_id} | Capacity:{" "}
                          {item.item.capacity} | Load: {item.item.load} | Total
                          Distance: {item.item.total_distance}
                        </Text>
                      </View>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>
            <View
              style={{
                height: "20%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false);
                }}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  containerList: {
    flex: 7,
    margin: 20,
  },
  containerButton: {
    flex: 3,
    marginLeft: 15,
    marginRight: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  item: {
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
  button: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
    margin: 1,
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
    height: 450,
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
  modalButton: {
    height: 50,
    width: "90%",
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#C70D3A",
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
