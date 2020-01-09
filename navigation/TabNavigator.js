import React from 'react';
import { Text, View } from 'react-native';
import Home from '../screens/Home.js'
import Search from '../screens/Search.js'
import Activity from '../screens/Activity.js'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

const TabNavigator = createBottomTabNavigator({
  Home: Home,
  Search: Search,
  Activity: Activity
});

export default createAppContainer(TabNavigator);