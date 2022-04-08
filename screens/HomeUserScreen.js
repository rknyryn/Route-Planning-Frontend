import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function HomeUser() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
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
    backgroundColor: '#0782F9',
    width: '60%',
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