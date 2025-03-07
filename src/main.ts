import { createApp } from 'vue'
import type { App as _App } from 'vue'
import App from './App.vue'
import router from './router/intercept.ts'
import './style/index.css'
import pinia from './store'
import ProComponents from './components/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import globalComponentsPlugin from '@/components/index'
import Directives from './directives/index.ts'
import './plugins/modules/echarts-plugin.ts'

console.log('所有环境变量:', import.meta.env)

// 开发环境特定的配置和初始化
const setupForDevelopment = async (app: _App) => {
  if (import.meta.env.VITE_USER_NODE_ENV === 'development') {
    console.log('Running in development mode.')
    console.log(import.meta.env.VITE_APP_API_URL) // 打印 API URL
    console.log(import.meta.env.VITE_APP_DEBUG) // 打印 DEBUG 标志
    console.log(import.meta.env) // 打印所有的环境变量
  }
}

// 生产环境特定的配置和初始化
const setupForProduction = (app: _App) => {
  if (import.meta.env.NODE_ENV === 'production') {
    console.log('Running in production mode.')
  }
}

const initializeApp = async () => {
  console.log('【主程序】准备初始化app')
  const app = createApp(App)
  app.use(ElementPlus)
  app.use(router)
  app.use(pinia)
  app.use(ProComponents)
  app.use(globalComponentsPlugin)

  // 注册自定义指令
  app.use(Directives)

  // 根据当前环境执行相应的初始化步骤
  await setupForDevelopment(app)
  setupForProduction(app)

  // 挂载应用
  app.mount('#app')
}

initializeApp().catch((err) => {
  console.error('Failed to initialize the application:', err)
})
