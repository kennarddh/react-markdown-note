import React from 'react'

// import 'Services/Firebase'
import ReactDOM from 'react-dom/client'

import App from './App'
import GlobalStyle from './Styles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
)
