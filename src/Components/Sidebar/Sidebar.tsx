import { FC, useCallback, useTransition } from 'react'

import useData from 'Components/Hooks/useData'

import { ButtonsContainer, Container, NotesContainer } from './Styles'

const Sidebar: FC = () => {
	const [, StartTransition] = useTransition()

	const { SetName, SaveNote, NewNote, Notes, RefreshNotes, LoadNote, Name } =
		useData()

	const ChangeName = useCallback(
		(name: string) => {
			StartTransition(() => {
				SetName(name)
			})
		},
		[SetName],
	)

	return (
		<Container>
			<ButtonsContainer>
				<button onClick={SaveNote}>Save</button>
				<button onClick={NewNote}>New</button>
				<button onClick={RefreshNotes}>Refresh</button>
				<input
					onChange={event => ChangeName(event.target.value)}
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
