/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_API_BASE?: string;
	readonly VITE_ENABLE_ADMIN?: 'true' | 'false';
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
