import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { updateDescription } from '../actions/post'
import { Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import styles from '../styles'

class Post extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.postPhoto} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/instagram-tutorial-3c0fc.appspot.com/o/philly.jpg?alt=media&token=8ac781b6-744b-4aef-b339-52a80840492e' }} />
                <TextInput
                    style={styles.border}
                    value={this.props.post.description}
                    onChangeText={text => this.props.updateDescription(text)}
                    placeholder='Description'
                />
                <TouchableOpacity style={styles.button} onPress={() => console.log("post this")}>
                    <Text>Post</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ updateDescription }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        post: state.post,
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)