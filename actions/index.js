import uuid from 'uuid';
import firebase from 'firebase'

export const uploadPhoto = (image) => {
	debugger
	return async (dispatch) => {
		try {
			const blob = await new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest()
				xhr.onload = () => resolve(xhr.response)
				xhr.responseType = 'blob'
				xhr.open('GET', image.uri, true)
				xhr.send(null)
			});
			const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
			const downloadURL = await uploadTask.ref.getDownloadURL()
			return downloadURL
		} catch (e) {
			console.error(e)
		}
	}
}

export const add = () => {
	return { type: 'ADD' }
}

export const subtract = () => {
	return { type: 'SUBTRACT' }
}


