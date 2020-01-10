import firebase from 'firebase';
import db from '../config/firebase';

export const updateDescription = (text) => {
	return {type: 'UPDATE_DESCRIPTION', payload: text}
}
