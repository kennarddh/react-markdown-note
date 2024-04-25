import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react'

import { MDXEditorMethods } from '@mdxeditor/editor'

export type ReactSetState<T> = Dispatch<SetStateAction<T> | T>

export interface IDataContext {
	CurrentMarkdown: string
	SetCurrentMarkdown: ReactSetState<string>
	MDXEditorRef: RefObject<MDXEditorMethods>
}

export interface IDataContextProviderProps {
	children: ReactNode
}
