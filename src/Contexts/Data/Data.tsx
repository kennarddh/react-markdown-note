import { FC, createContext, useCallback, useEffect, useState } from 'react'

import { CreateNote, EditNote, GetNoteByID, GetNotes } from 'Services/Firebase'
import { Note } from 'Types/Types'

import type { IDataContext, IDataContextProviderProps } from './Types'

const DataContext = createContext<IDataContext>({} as IDataContext)

export const DataProvider: FC<IDataContextProviderProps> = ({ children }) => {
	const [SavedContent, SetSavedContent] = useState('# Hello World')
	const [CurrentContent, SetCurrentContent] = useState(SavedContent)
	const [Name, SetName] = useState('')
	const [CurrentNoteID, SetCurrentNoteID] = useState<string | null>(null)

	const [Notes, SetNotes] = useState<Note[]>([])

	useEffect(() => {
		SetCurrentContent(SavedContent)
	}, [SavedContent])

	const CreateNewNote = useCallback(async () => {
		const result = await CreateNote({
			name: Name,
			content: SavedContent,
		})

		SetCurrentNoteID(result.id)
	}, [Name, SavedContent])

	const RefreshNotes = useCallback(async () => {
		SetNotes(await GetNotes())
	}, [])

	const SaveNote = useCallback(async () => {
		if (Name === '') return alert('Name must not be empty.')

		SetSavedContent(CurrentContent)

		if (CurrentNoteID == null) {
			const result = await CreateNote({
				name: Name,
				content: CurrentContent,
			})

			SetCurrentNoteID(result.id)

			RefreshNotes()

			return
		}

		await EditNote(CurrentNoteID, {
			name: Name,
			content: CurrentContent,
		})
	}, [CurrentContent, CurrentNoteID, Name, RefreshNotes])

	const LoadNote = useCallback(async (id: string) => {
		const result = await GetNoteByID(id)

		if (!result) return

		SetSavedContent(result.content)
		SetCurrentContent(result.content)
		SetCurrentNoteID(result.id)
		SetName(result.name)
	}, [])

	const NewNote = useCallback(() => {
		SetSavedContent('# Hello World')
		SetCurrentContent('# Hello World')
		SetCurrentNoteID(null)
		SetName('')
	}, [])

	useEffect(() => {
		RefreshNotes()
	}, [RefreshNotes])

	return (
		<DataContext.Provider
			value={{
				SavedContent,
				SetSavedContent,
				CurrentContent,
				SetCurrentContent,
				Name,
				SetName,
				CurrentNoteID,
				Notes,
				CreateNewNote,
				SaveNote,
				RefreshNotes,
				LoadNote,
				NewNote,
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext
