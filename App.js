import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login";
import HomeUserScreen from "./screens/HomeUserScreen";
import HomeAdminScreen from "./screens/HomeAdminScreen";
import MapScreen from "./screens/MapScreen";
import MapAdminScreen from "./screens/MapAdminScreen";
import MultipleSelectScreen from "./screens/MultipleSelectScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="HomeUser"
          options={{ title: "Home", headerBackVisible:false }}
          component={HomeUserScreen}
        />
        <Stack.Screen
          name="HomeAdmin"
          options={{ headerShown: false }}
          component={HomeAdminScreen}
        />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen
          name="MapAdmin"
          options={{ title: "Map Admin" }}
          component={MapAdminScreen}
        />
        <Stack.Screen name="MultipleSelect" component={MultipleSelectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
