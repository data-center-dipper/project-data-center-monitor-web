import type { App } from 'vue'
import FormSearch from './src/index.vue'

export default {
  install(app: App) {
    app.component('qx-form-search', FormSearch)
  },
}
