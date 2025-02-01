// 导入 createApp 函数，这是 Vue 3 中用于创建 Vue 应用实例的核心 API。
import { createApp } from 'vue';

// 导入根组件 App.vue，这将是整个应用的最外层组件。
import App from './App.vue';

// 导入路由配置，Vue Router 是官方的路由管理库，用来实现单页面应用中的页面导航。
import router from './router';

// 引入全局样式文件，确保所有组件都能继承这些样式规则。
import './style/index.css';

// 导入 Pinia 状态管理库的实例，Pinia 是 Vue 3 的状态管理库，替代了 Vuex。
import pinia from './store';

// 使用 createApp 函数创建一个新的 Vue 应用实例，并传入根组件 App。
const app = createApp(App);

// 安装 Vue Router 到应用实例中，这样所有的组件都可以通过 this.$router 和 this.$route 访问路由信息。
app.use(router);

// 安装 Pinia 状态管理库到应用实例中，使得所有组件都可以访问全局的状态管理功能。
app.use(pinia);

app.config.errorHandler = (err, vm, info) => {
  console.error('Global errorHandler:', err);
  console.log('Vue instance:', vm);
  console.log('Info:', info);
};

// 将应用实例挂载到 HTML 中 id 为 'app' 的元素上，启动应用。
app.mount('#app');
