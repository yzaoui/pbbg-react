/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string
    readonly VITE_API_ROOT: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
