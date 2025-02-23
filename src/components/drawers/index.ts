import type { App } from 'vue'
import Drawer from './src/index.vue'

export default {
  install(app: App) {
    app.component('qx-drawer', Drawer)
  },
}
