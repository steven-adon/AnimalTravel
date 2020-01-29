import firebase from 'firebase';
import db from '../config/firebase';
import * as Facebook from 'expo-facebook';

export const updateEmail = (email) => {
	return { type: 'UPDATE_EMAIL', payload: email }
}

export const updatePassword = (password) => {
	return { type: 'UPDATE_PASSWORD', payload: password }
}

export const updateUsername = (username) => {
	return { type: 'UPDATE_USERNAME', payload: username }
}

export const updateBio = (bio) => {
	return { type: 'UPDATE_BIO', payload: bio }
}

export const updatePhoto = (photo) => {
	return {type: 'UPDATE_PHOTO', payload: photo}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await firebase.auth().signInWithEmailAndPassword(email, password)
			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const facebookLogin = () => {
	return async (dispatch) => {
		try {
			// const { type, token } = await Facebook.logInWithReadPermissionsAsync('1012406185793074')
			await Facebook.initializeAsync('1012406185793074');
			const {
				type,
				token,
			} = await Facebook.logInWithReadPermissionsAsync({
				permissions: ['public_profile'],
			});

			if (type === 'success') {
				// Build Firebase credential with the Facebook access token.
				const credential = await firebase.auth.FacebookAuthProvider.credential(token);
				// Sign in with credential from the Facebook user.
				const response = await firebase.auth().signInWithCredential(credential)

				const user = await db.collection('users').doc(response.user.uid).get()

				if (!user.exists) {

					const currentUser = {
						uid: response.user.uid,
						email: response.user.email,
						username: response.user.displayName,
						bio: '',
						photo: response.user.photoURL,
						token: null,
					}

					db.collection('users').doc(response.user.uid).set(currentUser)
					dispatch({ type: 'LOGIN', payload: currentUser })
				} else {
					dispatch(getUser(response.user.uid))
				}
			}
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser = (uid) => {
	return async (dispatch, getState) => {
		try {
			const user = await db.collection('users').doc(uid).get()
			dispatch({ type: 'LOGIN', payload: user.data() })
		} catch (e) {
			alert(e)
		}
	}
}

export const updateUser = () => {
	return async (dispatch, getState) => {
		const { uid, username, bio, photo } = getState().user
		try {
			db.collection('users').doc(uid).update({
				username: username,
				bio: bio,
				photo: photo
			})
		} catch (e) {
			alert(e)
		}
	}
}

export const signup = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password, username, bio } = getState().user
			console.log(email, password, username, bio, '❤️❤️❤️')
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
			if (response.user.uid) {
				const user = {
					uid: response.user.uid,
					email: email,
					username: username,
					bio: bio,
					photo: '',
					token: null,
				}
				db.collection('users').doc(response.user.uid).set(user)
				dispatch({ type: 'LOGIN', payload: user })
			}
		} catch (e) {
			alert(e)
		}
	}
}
