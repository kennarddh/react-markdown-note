import type { Dispatch, ReactNode, SetStateAction } from 'react'

import { Note } from 'Types/Types'

export type ReactSetState<T> = Dispatch<SetStateAction<T> | T>

export interface IDataContext {
	CurrentContent: string
	SetCurrentContent: ReactSetState<string>
	SavedContent: string
	SetSavedContent: ReactSetState<string>
	Name: string
	SetName: ReactSetState<string>
	CurrentNoteID: string | null
	Notes: Note[]
	RefreshNotes: () => void
	CreateNewNote: () => void
	SaveNote: () => void
	LoadNote: (id: string) => void
}

export interface IDataContextProviderProps {
	children: ReactNode
}
