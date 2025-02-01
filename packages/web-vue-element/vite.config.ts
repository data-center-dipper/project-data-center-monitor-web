// 导入 Vite 的配置函数，用于定义项目的构建和开发服务器配置。
import { defineConfig } from 'vite';

// 从 Node.js 标准库导入 URL 相关的功能，用于处理文件路径。
import { fileURLToPath, URL } from 'node:url';

// 导入 Vue 插件，使 Vite 支持 Vue 单文件组件（SFC）。
import vue from '@vitejs/plugin-vue';

// 导入 AutoImport 插件，自动导入 API 和工具函数，减少手动 import。
import AutoImport from 'unplugin-auto-import/vite';

// 导入 Components 插件，自动注册所有 Vue 组件，无需手动 import 和 register。
import Components from 'unplugin-vue-components/vite';

// 导入 Vue JSX 插件，使 Vite 支持在 TypeScript 文件中使用 JSX 语法。
import vueJsx from '@vitejs/plugin-vue-jsx';

// 导入 ElementPlusResolver 解析器，用于解析 Element Plus 组件和函数。
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 导出默认的 Vite 配置对象。
export default defineConfig({
  // 定义插件列表，这些插件会在项目构建过程中被应用。
  plugins: [
    // 使用 Vue 插件，并提供自定义模板编译选项。
    vue({
      template: {
        compilerOptions: {
          // 指定哪些标签被视为自定义元素，避免被 Vue 编译器转换。
          isCustomElement: (tag) => tag === 'iconpark-icon',
        },
      },
    }),
    // 启用 Vue JSX 插件以支持 JSX 语法。
    vueJsx(),
    // 使用 AutoImport 插件并指定 ElementPlusResolver 作为解析器，以便自动导入 Element Plus 的 API。
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    // 使用 Components 插件并指定 ElementPlusResolver 作为解析器，以便自动注册 Element Plus 组件。
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // resolve 属性用来设置模块解析选项。
  resolve: {
    alias: {
      // 设置别名 '@' 指向项目的 src 目录，方便引用源代码文件。
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
