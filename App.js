import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeUserScreen from './screens/HomeUserScreen';
import HomeAdminScreen from './screens/HomeAdminScreen';
import MapScreen from './screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" options={{ title: "Register" }} component={RegisterScreen} />
        <Stack.Screen name="HomeUser" options={{ title: "Home" }} component={HomeUserScreen} />
        <Stack.Screen name="HomeAdmin" options={{ title: "Home" }} component={HomeAdminScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
