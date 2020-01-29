import firebase from 'firebase';
import db from '../config/firebase';
import uuid from 'uuid'

export const updateDescription = (text) => {
	return { type: 'UPDATE_DESCRIPTION', payload: text }
}

export const updatePhoto = (input) => {
	return { type: 'UPDATE_PHOTO', payload: input }
}

export const updateLocation = (input) => {
	return { type: 'UPDATE_LOCATION', payload: input }
}

export const uploadPost = () => {
	return async (dispatch, getState) => {
		try {
			const { post, user } = getState()
			const id = uuid.v4()
			const upload = {
				id: id,
				postPhoto: post.photo,
				postDescription: post.description || ' ',
				postLocation: post.location || ' ',
				uid: user.uid,
				photo: user.photo || ' ',
				username: user.username,
				likes: []
			}
			db.collection('posts').doc(id).set(upload)
		} catch (e) {
			console.error(e)
		}
	}
}

export const getPosts = () => {
	return async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').get()

			let array = []
			posts.forEach((post) => {
				array.push(post.data())
			})
			console.log(array)
			dispatch({ type: 'GET_POSTS', payload: array })
		} catch (e) {
			alert(e)
		}
	}
}

export const likePost = (post) => {
	return (dispatch, getState) => {
		const { uid, username, photo } = getState().user
		try {
			db.collection('posts').doc(post.id).update({
				likes: firebase.firestore.FieldValue.arrayUnion(uid)
			})
			db.collection('activity').doc().set({
				postId: post.id,
				postPhoto: post.postPhoto,
				likerId: uid,
				likerPhoto: photo,
				likerName: username,
				uid: post.uid,
				date: new Date().getTime(),
				type: 'LIKE',
			})
			dispatch(getPosts())
		} catch (e) {
			console.error(e)
		}
	}
}

export const unlikePost = (post) => {
	return async (dispatch, getState) => {
		const { uid } = getState().user
		try {
			db.collection('posts').doc(post.id).update({
				likes: firebase.firestore.FieldValue.arrayRemove(uid)
			})
			const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', uid).get()
			query.forEach((response) => {
				response.ref.delete()
			})
			dispatch(getPosts())
		} catch (e) {
			console.error(e)
		}
	}

}
