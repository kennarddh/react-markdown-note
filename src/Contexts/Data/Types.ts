import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'

import { MDXEditorMethods } from '@mdxeditor/editor'
import { Note } from 'Types/Types'

export type ReactSetState<T> = Dispatch<SetStateAction<T> | T>

export interface IDataContext {
	CurrentMarkdown: string
	SetCurrentMarkdown: ReactSetState<string>
	Name: string
	SetName: ReactSetState<string>
	CurrentNoteID: string | null
	MDXEditorRef: RefObject<MDXEditorMethods>
	Notes: Note[]
	RefreshNotes: () => void
	CreateNewNote: () => void
	SaveNote: (content: string) => void
	LoadNote: (id: string) => void
}

export interface IDataContextProviderProps {
	children: ReactNode
}
