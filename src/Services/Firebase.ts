import { Note } from 'Types/Types'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import {
	FirestoreDataConverter,
	addDoc,
	collection,
	doc,
	getDocs,
	getFirestore,
	updateDoc,
} from 'firebase/firestore/lite'

const notesConverter: FirestoreDataConverter<Note> = {
	toFirestore: data => {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const { id: _, ...rest } = data

		return rest
	},
	fromFirestore: snapshot => {
		const data = snapshot.data()

		return {
			id: snapshot.id,
			name: data.name,
			content: data.content,
		}
	},
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

export const NotesCollection = collection(Firestore, 'notes').withConverter(
	notesConverter,
)

export const GetNotes = async (): Promise<Note[]> => {
	const notesSnapshot = await getDocs(NotesCollection)

	const notesList = notesSnapshot.docs.map(doc => doc.data())

	return notesList
}

export const CreateNote = async (note: Omit<Note, 'id'>) => {
	await addDoc(NotesCollection, note)
}

export const EditNote = async (id: string, note: Omit<Note, 'id'>) => {
	await updateDoc(doc(NotesCollection, id), note)
}

export default FirebaseApp
