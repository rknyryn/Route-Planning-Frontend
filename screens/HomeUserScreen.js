import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Picker } from '@react-native-picker/picker';

export default function HomeUser({ navigation }) {
  const [selectedData, setSelectedData] = useState();

  return (
    <View style={styles.container}>
      <View style={{ margin:5, width: "80%", backgroundColor: "white", borderRadius: 10 }}>
        <Picker
          selectedValue={selectedData}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedData(itemValue)
          }>
          <Picker.Item label="İzmit" value="izmit" />
          <Picker.Item label="Gölcük" value="gölcük" />
        </Picker>
      </View>
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Map')}
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