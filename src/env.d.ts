/// <reference types="vite/client" />

// Declare env types here
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ImportMetaEnv {
	APP_FIREBASE_API_KEY: string
	APP_FIREBASE_AUTH_DOMAIN: string
	APP_FIREBASE_PROJECT_ID: string
	APP_FIREBASE_STORAGE_BUCKET: string
	APP_FIREBASE_MESSAGING_SENDER_ID: string
	APP_FIREBASE_APP_ID: string
}

interface ImportMeta {
	readonly env: Readonly<ImportMetaEnv>
}
