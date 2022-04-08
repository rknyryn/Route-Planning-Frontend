import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                <Marker
                    coordinate={{ latitude: 40.766666, longitude: 29.916668 }}
                />
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