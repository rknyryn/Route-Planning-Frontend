import React, { useState } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

export default function Map({ stations }) {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {stations.map((m, index) => {
          return (
            <Marker
              key={index}
              coordinate={{ latitude: m.lat, longitude: m.lon }}
              title={m.name}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
