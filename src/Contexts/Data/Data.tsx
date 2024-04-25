import { FC, RefObject, createContext, useRef, useState } from 'react'

import { MDXEditorMethods } from '@mdxeditor/editor'

import type { IDataContext, IDataContextProviderProps } from './Types'

const DataContext = createContext<IDataContext>({
	CurrentMarkdown: '',
	SetCurrentMarkdown: () => undefined,
	MDXEditorRef: null as unknown as RefObject<MDXEditorMethods>,
})

export const DataProvider: FC<IDataContextProviderProps> = ({ children }) => {
	const [CurrentMarkdown, SetCurrentMarkdown] = useState('# Hello World')

	const MDXEditorRef = useRef<MDXEditorMethods>(null)

	return (
		<DataContext.Provider
			value={{ CurrentMarkdown, SetCurrentMarkdown, MDXEditorRef }}
		>
			{children}
		</DataContext.Provider>
	)
}

export default DataContext
