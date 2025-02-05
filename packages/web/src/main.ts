import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.css'
import pinia from './store'
import ProComponents from './components/index.ts'
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ProComponents)
app.config.errorHandler = (err, vm, info) => {
  console.error('Global errorHandler:', err)
  console.log('Vue instance:', vm)
  console.log('Info:', info)
}
app.mount('#app')
