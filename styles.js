import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerComment: {
        flex: 1,
        backgroundColor: '#fff',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    space: {
        justifyContent: 'space-between',
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    row: {
        flexDirection: 'row'
    },
    input: {
        width: width * .90,
        margin: 15,
        padding: 15,
        alignSelf: 'center',
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 50,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    facebookButton: {
        backgroundColor: '#3b5998',
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: '#3b5998',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    border: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    postPhoto: {
        height: 250,
        width: width,
    },
    roundImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 5,
        backgroundColor: '#adadad'
    },
    cameraButton: {
        height: 100,
        width: 100,
        borderRadius: 50,
        alignSelf: 'center',
        backgroundColor: '#fff',
        marginBottom: 50
    },
    button: {
        marginTop: 20,
        paddingVertical: 10,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonSmall: {
        margin: 10,
        marginBottom: 0,
        padding: 5,
        alignItems: 'center',
        borderColor: '#d3d3d3',
        borderWidth: 1,
        borderRadius: 5,
        width: 125
    }
});
