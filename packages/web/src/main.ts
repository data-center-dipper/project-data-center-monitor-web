import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.css'
import pinia from './store'
import ProComponents from './components/index.ts'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ProComponents)
app.use(ElementPlus)

app.mount('#app')
