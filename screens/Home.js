import React from 'react';
import { Text, View, Button } from 'react-native';
import styles from '../styles.js'

export default class Home extends React.Component {
  state = {
    count: 10
  }

  add = () => {
    console.log("adding")
    let num = this.state.count+1
    this.setState({count: num})
  }

  subtract = () => {
    console.log("subtracting")
    let num = this.state.count-1
    this.setState({count: num})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Home </Text>
        <Text>How many apps are we going to build? {this.state.count}</Text>
        <Button title='Add' onPress={() => this.add()}/>
        <Button title='Subtract' onPress={() => this.subtract()}/>
      </View>
    );
  }
}
