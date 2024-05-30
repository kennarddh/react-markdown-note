import { FC } from 'react'

import useData from 'Components/Hooks/useData'

import { ButtonsContainer, Container, NotesContainer } from './Styles'

const Sidebar: FC = () => {
	const {
		SetName,
		SaveNote,
		MDXEditorRef,
		Notes,
		RefreshNotes,
		LoadNote,
		Name,
	} = useData()

	return (
		<Container>
			<ButtonsContainer>
				<button
					onClick={() => {
						const markdown = MDXEditorRef.current?.getMarkdown()

						if (!markdown) return

						SaveNote(markdown)
					}}
				>
					Save
				</button>
				<button onClick={() => RefreshNotes()}>Refresh</button>
				<input
					onChange={event => SetName(event.target.value)}
					value={Name}
					placeholder='Name'
				/>
			</ButtonsContainer>
			<NotesContainer>
				{Notes.map(note => (
					<button key={note.id} onClick={() => LoadNote(note.id)}>
						{note.name}
					</button>
				))}
			</NotesContainer>
		</Container>
	)
}

export default Sidebar
