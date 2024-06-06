import { FC, useEffect, useRef } from 'react'

import {
	AdmonitionDirectiveDescriptor,
	KitchenSinkToolbar,
	MDXEditor,
	MDXEditorMethods,
	SandpackConfig,
	codeBlockPlugin,
	codeMirrorPlugin,
	diffSourcePlugin,
	directivesPlugin,
	frontmatterPlugin,
	headingsPlugin,
	imagePlugin,
	linkDialogPlugin,
	linkPlugin,
	listsPlugin,
	markdownShortcutPlugin,
	quotePlugin,
	sandpackPlugin,
	tablePlugin,
	thematicBreakPlugin,
	toolbarPlugin,
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'

import useData from 'Components/Hooks/useData'

import { Container } from './Styles'

const reactJSSandpackSnippetContent = `
const App = () => {
	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<h2>Start editing to see some magic happen!</h2>
		</div>
	);
}

export default App
`.trim()

const sandpackConfig: SandpackConfig = {
	defaultPreset: 'react-js',
	presets: [
		{
			label: 'React JavaScript',
			name: 'react-js',
			meta: 'live',
			sandpackTemplate: 'react',
			sandpackTheme: 'light',
			snippetFileName: '/App.js',
			initialSnippetContent: reactJSSandpackSnippetContent,
		},
	],
}

const Editor: FC = () => {
	const { SetCurrentContent, SavedContent } = useData()

	console.log({ SavedContent })

	const MDXEditorRef = useRef<MDXEditorMethods>(null)

	useEffect(() => {
		MDXEditorRef.current?.setMarkdown(SavedContent)
	}, [SavedContent])

	return (
		<Container>
			<MDXEditor
				markdown={SavedContent}
				onChange={SetCurrentContent}
				ref={MDXEditorRef}
				suppressHtmlProcessing
				plugins={[
					toolbarPlugin({
						toolbarContents: () => <KitchenSinkToolbar />,
					}),
					listsPlugin(),
					quotePlugin(),
					headingsPlugin(),
					linkPlugin(),
					linkDialogPlugin(),
					imagePlugin(),
					tablePlugin(),
					thematicBreakPlugin(),
					frontmatterPlugin(),
					codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
					sandpackPlugin({ sandpackConfig }),
					codeMirrorPlugin({
						codeBlockLanguages: {
							js: 'JavaScript',
							ts: 'TypeScript',
							html: 'HTML',
							css: 'CSS',
							txt: 'Text',
							json: 'JSON',
							log: 'Log',
							jsx: 'JavaScript XML',
							tsx: 'TypeScript XML',
						},
					}),
					directivesPlugin({
						directiveDescriptors: [AdmonitionDirectiveDescriptor],
					}),
					diffSourcePlugin({
						viewMode: 'rich-text',
						diffMarkdown: SavedContent,
					}),
					markdownShortcutPlugin(),
				]}
			/>
		</Container>
	)
}

export default Editor
