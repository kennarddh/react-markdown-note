import { FC } from 'react'

import { Container } from './AppStyles'

import Editor from 'Components/Editor/Editor'
import Sidebar from 'Components/Sidebar/Sidebar'

const App: FC = () => {
	return (
		<Container>
			<Sidebar />
			<Editor />
		</Container>
	)
}

export default App
