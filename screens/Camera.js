import React from 'react';
import styles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView, TouchableOpacity,  View } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadPhoto } from '../actions/index';
import { updatePhoto } from '../actions/post';

class CameraUpload extends React.Component {

    snapPhoto = async () => {
        const permission = await Camera.requestPermissionsAsync()
        if (permission.status === 'granted') {
            const image = await this.camera.takePictureAsync()
            if (!image.cancelled) {
                const resize = await ImageManipulator.manipulateAsync(image.uri,
                    [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
                    { compress: 0.1, format: ImageManipulator.SaveFormat.PNG })
                const url = await this.props.dispatch(uploadPhoto(resize))
                this.props.dispatch(updatePhoto(url))
                url ? this.props.navigation.navigate('Post') : null
                console.log(url)
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Camera style={{ flex: 1 }} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>
                    <SafeAreaView style={{ flex: 1 }}>
                        <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => this.props.navigation.goBack()} >
                            <Ionicons color={'white'} name={'ios-arrow-back'} size={50} />
                        </TouchableOpacity>
                    </SafeAreaView>
                    <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} />
                </Camera>
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPhoto, updatePhoto }, dispatch)
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(CameraUpload)