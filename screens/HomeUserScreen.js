import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker';

export default function HomeUser({ navigation }) {
  const [selectedData, setSelectedData] = useState();
  const [stations, setStations] = useState([]);

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

  useEffect(() => {
    getAllStation();
  }, []);

  const renderStationList = () => {
    return stations.map((station) => {
      return <Picker.Item label={station.name} value={station} key={station.id} />
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ margin: 5, width: "80%", backgroundColor: "white", borderRadius: 10 }}>
        <Picker
          selectedValue={selectedData}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedData(itemValue)
          }
          }>
          {stations && renderStationList()}
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Map")}
      >
        <Text style={styles.buttonText}>Route</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    backgroundColor: '#000',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})