import React from 'react';
import Login from '../screens/Login.js'
import Signup from '../screens/Signup.js'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
      	header: null
      }
    },
    Signup: {
      screen: Signup
    }
  }
);

export default createAppContainer(StackNavigator);