import React from 'react';
import { Text, View, Button, Image } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { add, subtract } from '../actions'
import { getPosts } from '../actions/post'
import styles from '../styles'

class Home extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        if(this.props.post === null) return null
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <Text>How many apps are we going to build? {this.props.counter}</Text>
                <Button title='Add' onPress={() => this.props.add()} />
                <Button title='Subtract' onPress={() => this.props.subtract()} />

                <Image style={styles.postPhoto} source={{uri: this.props.post.feed[0].postPhoto}}/>
                <Text>{this.props.post.feed[0].postDescription}</Text>

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ add, subtract, getPosts }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        post: state.post
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)