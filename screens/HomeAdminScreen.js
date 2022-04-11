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
import Ionicons from 'react-native-vector-icons/Ionicons';
import StationsScreen from './StationsScreen';
import DailyVoteScreen from './DailyVoteScreen';

const Tab = createBottomTabNavigator();

export default function HomeAdminScreen() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="DailyVote">
      <Tab.Screen name="DailyVote" component={DailyVoteScreen} />
      <Tab.Screen name="Stations" component={StationsScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  
})