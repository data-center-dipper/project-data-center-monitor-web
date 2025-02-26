import type { App } from 'vue'
import Lottie from './src/index.vue'

export default {
  install(app: App) {
    app.component('qx-lottie', Lottie)
  },
}
