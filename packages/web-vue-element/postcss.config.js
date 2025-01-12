export default {
  // 定义要使用的 PostCSS 插件及其配置。
  plugins: {
    // Tailwind CSS 是一个实用优先的 CSS 框架，它提供低级别的实用类（utility classes）以构建自定义设计。
    // 在这里，我们通过 PostCSS 使用 Tailwind CSS 插件，它将处理 Tailwind 特定的类和功能。
    tailwindcss: {}, // 尾随的空对象表示我们接受该插件的所有默认设置。

    // Autoprefixer 是一个 PostCSS 插件，它会根据 Can I Use 数据自动为 CSS 规则添加浏览器前缀。
    // 这样可以确保你的 CSS 兼容大多数浏览器，而不需要手动记住哪些属性需要前缀。
    autoprefixer: {}, // 同样，尾随的空对象表示我们使用插件的默认配置。
  },
}