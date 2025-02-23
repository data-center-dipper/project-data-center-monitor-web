import type { App } from 'vue'
import Form from './src/index.vue'

export default {
  install(app: App) {
    app.component('qx-form', Form)
  },
}
