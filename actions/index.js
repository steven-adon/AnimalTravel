import uuid from 'uuid';
import firebase from 'firebase'
import db from '../config/firebase'
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';
import * as ImageManipulator from 'expo-image-manipulator';
const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send'

export const uploadPhoto = (image) => {
	return async (dispatch) => {
		try {
			// const resize = await ImageManipulator.manipulateAsync(image.uri, [], { compress: 0.1, format: ImageManipulator.SaveFormat.PNG })
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


export const allowNotifications = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().user
		try {
			const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
			if (permission.status === 'granted') {
				const token = await Notifications.getExpoPushTokenAsync()
				dispatch({ type: 'GET_TOKEN', payload: token })
				db.collection('users').doc(uid).update({ token: token })
			}
		} catch (e) {
			console.error(e)
		}
	}
}

export const sendNotification = (uid, text) => {
	return async (dispatch, getState) => {
		const { username } = getState().user
		try {
			const user = await db.collection('users').doc(uid).get()
			if (user.data().token) {
				fetch(PUSH_ENDPOINT, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						to: user.data().token,
						title: username,
						body: text,
					})
				})
			}
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
