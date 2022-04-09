import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const loginControl = () => {
    navigation.navigate('HomeUser');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200, marginBottom: 40 }}
          resizeMode="cover"
          source={require('../assets/route-icon.png')}
        />
        <View style={styles.containerInput}>
          <TextInput
            placeholder='Username'
            style={styles.input}
            value={username}
            onChangeText={text => {
              setUsername(text)
            }} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            value={password}
            onChangeText={text => {
              setPassword(text)
            }}
            secureTextEntry
          />
        </View>
        <View style={styles.containerButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => loginControl()}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInput: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  containerButton: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#000',
    width: '100%',
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