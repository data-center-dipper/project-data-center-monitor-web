/**
 * 定义此文件为一个 Tailwind CSS 配置对象。
 * @type {import('tailwindcss').Config}
 */
export default {
  // 设置 Tailwind CSS 使用 Just-In-Time (JIT) 模式编译。
  // JIT 模式会实时编译所需的样式，而不是预先生成所有可能的样式组合。
  mode: 'jit',

  // 定义内容源，即包含 Tailwind CSS 类名的文件路径模式。
  // 这些文件会被扫描来确定最终输出的 CSS 中需要包含哪些样式规则。
  content: [
    './index.html', // 包含 HTML 文件中的 Tailwind 类名
    './src/**/*.{vue,js,ts,jsx,tsx}', // 包括 src 目录下所有的 Vue、JavaScript 和 TypeScript 文件中的 Tailwind 类名
  ],

  // 主题配置，允许你自定义和扩展 Tailwind 的默认设计系统。
  theme: {
    // extend 属性可以用来在不覆盖默认值的情况下添加新的样式属性或修改现有的。
    extend: {},
  },

  // 插件数组，你可以在这里添加额外的功能或自定义行为到 Tailwind CSS。
  // 例如，可以通过插件添加更多的实用工具类，或者改变某些默认行为。
  plugins: [],
};
