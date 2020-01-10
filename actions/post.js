import firebase from 'firebase';
import db from '../config/firebase';

export const updateDescription = (text) => {
	return { type: 'UPDATE_DESCRIPTION', payload: text }
}

export const uploadPost = () => {
	return async (dispatch, getState) => {
		try {
			const { post, user } = getState()

			console.log(post);

			const upload = {
				postPhoto: 'https://firebasestorage.googleapis.com/v0/b/instagram-tutorial-3c0fc.appspot.com/o/paris.jpg?alt=media&token=dc7c8705-cd1c-4a22-9b15-4c854941785f',
				postDescription: post.description,
				uid: user.uid,
				photo: user.photo,
				username: user.username,
			}

			const ref = await db.collection('posts').doc()
			upload.id = ref.id
			ref.set(upload)

		} catch (e) {
			alert(e)
		}
	}
}