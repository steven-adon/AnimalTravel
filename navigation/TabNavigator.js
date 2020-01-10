import React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home.js'
import Search from '../screens/Search.js'
import Post from '../screens/Post'
import Activity from '../screens/Activity.js'
import Profile from '../screens/Profile.js'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs'

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (
                    <Ionicons name='ios-home' size={32} />
                )
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (
                    <Ionicons name='ios-search' size={32} />
                )
            }
        },
        Post: {
            screen: Post,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (
                    <Ionicons name='ios-add-circle-outline' size={32} />
                )
            }
        },
        Activity: {
            screen: Activity,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: ({ focused }) => (
                    <Ionicons name={focused ? 'ios-heart' : 'ios-heart-empty'} size={32} />
                )
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel: ' ',
                tabBarIcon: () => (
                    <Ionicons name='ios-person' size={32} />
                )
            }
        }
    },
    {
        tabBarOptions: {
            style: {
                paddingVertical: 10,
                height: 60
            }
        }
    }
);

export default createAppContainer(TabNavigator);