/// <reference types="vite/client" />
// 引用 Vite 客户端模块的类型定义，这使得可以在 TypeScript 中使用 Vite 提供的 API。

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<any, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
