import { Note } from 'Types/Types'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
	FirestoreDataConverter,
	collection,
	getDocs,
	getFirestore,
} from 'firebase/firestore/lite'

const notesConverter: FirestoreDataConverter<Note> = {
	toFirestore: data => data,
	fromFirestore: snapshot => snapshot.data() as Note,
}

const firebaseConfig: FirebaseOptions = {
	apiKey: import.meta.env.APP_FIREBASE_API_KEY,
	authDomain: import.meta.env.APP_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.APP_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.APP_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.APP_FIREBASE_APP_ID,
}

export const FirebaseApp = initializeApp(firebaseConfig)

export const Firestore = getFirestore(FirebaseApp)

export const GetNotes = async () => {
	const notesCollection = collection(Firestore, 'notes').withConverter(
		notesConverter,
	)

	const notesSnapshot = await getDocs(notesCollection)

	const notesList = notesSnapshot.docs.map(doc => doc.data())

	return notesList
}

export default FirebaseApp
