import React, { useState } from 'react'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function MapScreen({ route }) {
    const { data } = route.params
    const [serviceRoute, setServiceRoute] = useState(data.service_route);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}>
                {
                    serviceRoute &&
                    serviceRoute.map((m, index) => {
                        return (
                            <Marker
                                key={index}
                                coordinate={{ latitude: m.lat, longitude: m.lon }}
                                title={m.name}
                                description={"Station Order: " + m.station_order}
                            />
                        )
                    })
                }
                <Polyline
                    coordinates={data.service_route.map(m => ({ latitude: m.lat, longitude: m.lon }))}
                    strokeColor="#FF0000"
                    strokeWidth={2}
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