import type { App } from 'vue'
import FormDialog from './src/index.vue'

export default {
  install(app: App) {
    app.component('qx-form-dialog', FormDialog)
  },
}
