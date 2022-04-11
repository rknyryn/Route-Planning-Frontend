import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';

const randomColor = () => {
  return ("#" + Math.floor(Math.random() * 16777215).toString(16));
}

export default function AdminMapScreen({ route }) {

  const { routeList } = route.params;
  const [list, setList] = useState([...routeList.map(m => ({ data: m, color: randomColor() }))]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}>
        {
          list.map(route => {
            return (
              <>
                {
                  route.data.map((data, index) => {
                    return (
                      <Marker
                        key={index}
                        coordinate={{ latitude: data.lat, longitude: data.lon }}
                        title={data.name}
                        description={"Car ID: " + data.car_id +  " | Station Order: " + data.station_order}
                        pinColor={route.color}
                      />
                    )
                  })
                }
                
                <Polyline
                  coordinates={route.data.map(m => ({ latitude: m.lat, longitude: m.lon }))}
                  strokeColor={route.color}
                  strokeWidth={2}
                />
              </>
            )
          })
        }
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: "100%",
    height: "100%",
  },
})