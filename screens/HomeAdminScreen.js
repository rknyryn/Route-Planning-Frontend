import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  KeyboardAvoidingView, Alert
} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StationsScreen from './StationsScreen';
import DailyVoteScreen from './DailyVoteScreen';

const Tab = createBottomTabNavigator();

export default function HomeAdminScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'DailyVote') {
            iconName = 'vote'
          } else if (route.name === 'Stations') {
            iconName = 'bus-marker';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}

      initialRouteName="DailyVote">
      <Tab.Screen name="DailyVote" component={DailyVoteScreen} />
      <Tab.Screen name="Stations" component={StationsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

})