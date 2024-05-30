import {
	FC,
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

import { MDXEditorMethods } from '@mdxeditor/editor'
import { CreateNote, EditNote, GetNoteByID, GetNotes } from 'Services/Firebase'
import { Note } from 'Types/Types'

import type { IDataContext, IDataContextProviderProps } from './Types'

const DataContext = createContext<IDataContext>({} as IDataContext)

export const DataProvider: FC<IDataContextProviderProps> = ({ children }) => {
	const [CurrentMarkdown, SetCurrentMarkdown] = useState('# Hello World')
	const [Name, SetName] = useState('')
	const [CurrentNoteID, SetCurrentNoteID] = useState<string | null>(null)

	const [Notes, SetNotes] = useState<Note[]>([])

	const CreateNewNote = useCallback(async () => {
		const result = await CreateNote({
			name: Name,
			content: CurrentMarkdown,
		})

		SetCurrentNoteID(result.id)
	}, [Name, CurrentMarkdown])

	const SaveNote = useCallback(
		async (content: string) => {
			if (Name === '') return alert('Name must not be empty.')

			SetCurrentMarkdown(content)

			if (CurrentNoteID == null) {
				const result = await CreateNote({ name: Name, content })

				SetCurrentNoteID(result.id)

				return
			}

			await EditNote(CurrentNoteID, {
				name: Name,
				content: CurrentMarkdown,
			})
		},
		[CurrentMarkdown, CurrentNoteID, Name],
	)

	const RefreshNotes = useCallback(async () => {
		SetNotes(await GetNotes())
	}, [])

	const LoadNote = useCallback(async (id: string) => {
		const result = await GetNoteByID(id)

		if (!result) return

		MDXEditorRef.current?.setMarkdown(result.content)

		SetCurrentMarkdown(result.content)
		SetCurrentNoteID(result.id)
		SetName(result.name)
	}, [])

	const MDXEditorRef = useRef<MDXEditorMethods>(null)

	useEffect(() => {
		RefreshNotes()
	}, [RefreshNotes])

	return (
		<DataContext.Provider
			value={{
				CurrentMarkdown,
				SetCurrentMarkdown,
				MDXEditorRef,
				Name,
				SetName,
				CurrentNoteID,
				Notes,
				CreateNewNote,
				SaveNote,
				RefreshNotes,
				LoadNote,
			}}
		>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext
