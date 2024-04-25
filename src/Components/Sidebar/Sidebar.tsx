import { FC } from 'react'

import useData from 'Components/Hooks/useData'

import { Container } from './Styles'

const Sidebar: FC = () => {
	const { CurrentMarkdown, SetCurrentMarkdown, MDXEditorRef } = useData()

	return (
		<Container>
			<button
				onClick={() => {
					const markdown = MDXEditorRef.current?.getMarkdown()

					if (!markdown) return

					SetCurrentMarkdown(markdown)
				}}
			>
				Save
			</button>
			<button
				onClick={() => {
					MDXEditorRef.current?.setMarkdown(CurrentMarkdown)
				}}
			>
				Load
			</button>
		</Container>
	)
}

export default Sidebar
