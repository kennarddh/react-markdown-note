import { Note } from 'Types/Types'
import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getDoc } from 'firebase/firestore'
import {
	FirestoreDataConverter,
	addDoc,
	collection,
	deleteDoc,
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

export const GetNoteByID = async (id: string): Promise<Note | null> => {
	const result = await getDoc(doc(NotesCollection, id))

	if (!result) return null

	const data = result.data()

	if (!data) return null

	return {
		id: data.id.toString(),
		name: data.name.toString(),
		content: data.content.toString(),
	}
}

export const CreateNote = async (note: Omit<Note, 'id'>) => {
	return await addDoc(NotesCollection, note)
}

export const EditNote = async (id: string, note: Omit<Note, 'id'>) => {
	return await updateDoc(doc(NotesCollection, id), note)
}

export const DeleteNote = async (id: string) => {
	return await deleteDoc(doc(NotesCollection, id))
}

export default FirebaseApp
