import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView, Alert
} from 'react-native'

export default function HomeAdminScreen() {
  const [stationName, setStationName] = useState('');
  const [stationLat, setStationLat] = useState('');
  const [stationLon, setStationLon] = useState('');
  const [stations, setStations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  async function getAllStation() {
    var myHeaders = new Headers();
    myHeaders.append("Cookie", "ARRAffinity=6507bdc255f23a4f1ad4b5182514791bd1126448d921d867fd42e77489564d58");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    await fetch("http://route-planning-backend.azurewebsites.net/station/list", requestOptions)
      .then(response => response.json())
      .then(result => {
        setStations(result.station_list);
      })
      .catch(error => console.log('error', error));
  }

  async function createStation() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ARRAffinity=6507bdc255f23a4f1ad4b5182514791bd1126448d921d867fd42e77489564d58");

    var raw = JSON.stringify({
      "station_name": stationName,
      "station_lat": stationLat,
      "station_lon": stationLon
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("http://route-planning-backend.azurewebsites.net/station/add", requestOptions)
      .then(response => response.json())
      .then(result => {
        modalToggle();
        Alert.alert("Route Planing", result.msg);
        getAllStation()
      })
      .catch(error => console.log('error', error));
  }

  const modalToggle = () => {
    setStationName('');
    setStationLat('');
    setStationLon('');
    setModalVisible(!modalVisible);
  }

  useEffect(() => {
    getAllStation();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.containerList}>
        {stations &&
          <FlatList
            style={{ flex: 1 }}
            data={stations}
            renderItem={(item) => {
              return (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    Alert.alert(item.item.name,
                      "Latitude: " + item.item.lat + "\nLongitude: " + item.item.lon)}
                >
                  <Text style={{ fontSize: 16, }}>{item.item.name}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.id}
          />}
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={modalToggle}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={modalToggle}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                placeholder='Station Name'
                style={styles.modalInput}
                value={stationName}
                onChangeText={text => {
                  setStationName(text)
                }}
              />
              <TextInput
                placeholder='Station Latitude'
                style={styles.modalInput}
                value={stationLat}
                onChangeText={text => {
                  setStationLat(text)
                }}
              />
              <TextInput
                placeholder='Station Longitude'
                style={styles.modalInput}
                value={stationLon}
                onChangeText={text => {
                  setStationLon(text)
                }}
              />
              <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#C70D3A" }]}
                  onPress={modalToggle}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#019267" }]}
                  onPress={createStation}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  containerList: {
    flex: 1,
    margin: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButton: {
    position: 'absolute',
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    backgroundColor: "#000",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  floatingButtonText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 26
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: "#202020" + "AA",
  },
  modalView: {
    width: "90%",
    height: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    backgroundColor: '#DFDFDF',
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
    justifyContent: "center"
  },
  modalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700"
  }
})