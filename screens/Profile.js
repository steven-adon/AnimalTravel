import React from 'react';
import firebase from 'firebase';
import { Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import styles from '../styles'

class Profile extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile</Text>
                <Image style={styles.roundImage} source={this.props.user.photo ? { uri: this.props.user.photo } : require('../assets/images/robot-dev.png')} />
                <Text>{this.props.user.email}</Text>
                <Text>{this.props.user.username}</Text>
                <Text>{this.props.user.bio}</Text>
                <TouchableOpacity style={styles.buttonSmall} onPress={() => this.props.navigation.navigate('Edit')}>
                    <Text style={styles.bold}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSmall} onPress={() => firebase.auth().signOut()}>
                    <Text style={styles.bold}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Profile)