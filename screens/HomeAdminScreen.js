import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native'

export default function HomeAdminScreen() {
  const [stationName, setStationName] = useState('');
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

  async function createStation() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ARRAffinity=6507bdc255f23a4f1ad4b5182514791bd1126448d921d867fd42e77489564d58");

    var raw = JSON.stringify({
      "station_name": stationName,
      "station_lat": 1,
      "station_lon": 1
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
        setStationName('');
        getAllStation()
      })
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    getAllStation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          placeholder='New Station Name'
          style={styles.input}
          value={stationName}
          onChangeText={text => {
            setStationName(text)
          }} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => createStation()}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerList}>
        {stations &&
          <FlatList
            style={{ flex: 1 }}
            data={stations}
            renderItem={(item) => {
              return (
                <TouchableOpacity style={styles.item}>
                  <Text style={{ fontSize: 16, }}>{item.item.name}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={item => item.id}
          />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerInput: {
    flex: 2,
    margin: 15,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerList: {
    flex: 8,
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#FFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  input: {
    backgroundColor: 'white',
    width: "80%",
    height: 50,
    borderRadius: 10,
    textAlign: "center"
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: "center"
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 24,
  },
})