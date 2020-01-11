import React from 'react';
import styles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { uploadPhoto } from '../actions/index';

class CameraUpload extends React.Component {

    snapPhoto = async () => {
        const permission = await Camera.requestPermissionsAsync()
        if (permission.status === 'granted') {
            const image = await this.camera.takePictureAsync()
            console.log(image)
            if (!image.cancelled) {
                const resize = await ImageManipulator.manipulateAsync(image.uri,
                    [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
                    { compress: 0.1, format: ImageManipulator.SaveFormat.PNG })
                const url = await this.props.dispatch(uploadPhoto(resize))
                console.log(url)
            }
        }
    }

    render() {
        return (
            <Camera style={{ flex: 1 }} ref={ref => { this.camera = ref }} type={Camera.Constants.Type.back}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ paddingLeft: 30 }} onPress={() => this.props.navigation.goBack()} >
                        <Ionicons color={'white'} name={'ios-arrow-back'} size={50} />
                    </TouchableOpacity>
                </SafeAreaView>
                <TouchableOpacity style={styles.cameraButton} onPress={() => this.snapPhoto()} />
            </Camera>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ uploadPhoto }, dispatch)
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps)(CameraUpload)