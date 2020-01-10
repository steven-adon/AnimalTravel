import React from 'react';
import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateEmail, updatePassword, login } from '../actions/user.js'
import firebase from 'firebase'
import styles from '../styles.js'

class Login extends React.Component {

  login = () => {
		firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.props.navigation.navigate('Home')
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
        	style={styles.border}
        	value={this.props.user.email}
        	onChangeText={input => this.props.updateEmail(input)}
        	placeholder='Email'
        />
        <TextInput
          style={styles.border}
        	value={this.props.user.password}
        	onChangeText={input => this.props.updatePassword(input)}
          placeholder='Password'
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
      		<Text>Login</Text>
      	</TouchableOpacity>

      	<Text>OR</Text>

        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
      		<Text>Signup</Text>
      	</TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, login }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
