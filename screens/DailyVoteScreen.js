import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useState, useEffect } from 'react'

export default function DailyVoteScreen({ navigation }) {
    const today = new Date();
    const date = today.getDate() + 1 + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    const [dailyList, setDailyList] = useState([]);

    async function getDailyList() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "route_date": date
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://route-planning-backend.azurewebsites.net/route/daily-vote/", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 403) {
                    Alert.alert("Route Planning", result.msg);
                } else {
                    setDailyList(result.daily_vote_list)
                }
            })
            .catch(error => console.log('error', error));
    }

    async function saveRoute() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "route_date": date
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch("http://route-planning-backend.azurewebsites.net/algorithm/limited-car/route-save", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 400) {
                    Alert.alert("Route Planning", result.msg);
                }
            })
            .catch(error => console.log('error', error));
    }

    async function getRouteList() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "route_date": date
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://route-planning-backend.azurewebsites.net/algorithm/limited-car/route-list", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.status_code === 403) {
                    Alert.alert('Route Planning', result.msg);
                } else {
                    navigation.navigate('MapAdmin', { routeList: result.route_list })
                }
            })
            .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getDailyList();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.containerList}>
                {dailyList &&
                    <FlatList
                        style={{ flex: 1 }}
                        data={dailyList}
                        renderItem={(item) => {
                            return (
                                <View style={styles.item}>
                                    <Text>{item.item.name}</Text>
                                    <Text>{item.item.passenger_count} <Ionicons name='person' size={12} color={'#000'} /></Text>
                                </View>
                            )
                        }}
                        keyExtractor={item => item.id}
                    />
                }
            </View>
            <View style={styles.containerButton}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={saveRoute}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={getRouteList}>
                    <Text style={styles.buttonText}>Show Routes</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    containerList: {
        flex: 8,
        margin: 20,
    },
    containerButton: {
        flex: 2,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
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
    button: {
        backgroundColor: '#000',
        padding: 10,
        borderRadius: 10,
        width: "40%",
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})