/// <reference types="vite/client" />
// 引用 Vite 客户端模块的类型定义，这使得可以在 TypeScript 中使用 Vite 提供的 API。

// 为所有 .vue 文件提供类型声明，使得这些文件可以被正确地识别为 Vue 组件。
declare module '*.vue' {
  // 导入 DefineComponent 类型，用于定义 Vue 组件的结构。
  import type { DefineComponent } from 'vue'

  // 声明组件常量，其类型为 DefineComponent，表示这是一个 Vue 组件。
  // 这里使用泛型 any, {}, any 分别对应于组件的 props、emits 和 setup 函数返回值的类型。
  const component: DefineComponent<any, {}, any>

  // 将组件导出为默认导出，以便在其他地方通过 import 引用时可以直接使用。
  export default component
}

// 扩展 ImportMetaEnv 接口，定义了项目中使用的环境变量的类型。
interface ImportMetaEnv {
  readonly VITE_API_URL: string // API 的基础 URL，通常用于配置请求地址。
  readonly VITE_APP_TITLE: string // 应用程序标题，可能用于页面的 meta 标签或全局状态管理。
}

// 扩展 ImportMeta 接口，添加 env 属性，该属性引用了上面定义的 ImportMetaEnv 接口。
// 这样做的目的是让 TypeScript 知道在运行时可以通过 import.meta.env 访问到哪些环境变量。
interface ImportMeta {
  readonly env: ImportMetaEnv
}
