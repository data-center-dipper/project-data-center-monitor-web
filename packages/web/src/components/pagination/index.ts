import type { App } from 'vue'
import Pagination from './src/index.vue'

export default {
  install(app: App) {
    app.component('qx-pagination', Pagination)
  },
}
