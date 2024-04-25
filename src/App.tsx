import { FC } from 'react'

import Editor from 'Components/Editor/Editor'
import Sidebar from 'Components/Sidebar/Sidebar'

import { DataProvider } from 'Contexts/Data/Data'

import { Container } from './AppStyles'

const App: FC = () => {
	return (
		<DataProvider>
			<Container>
				<Sidebar />
				<Editor />
			</Container>
		</DataProvider>
	)
}

export default App
