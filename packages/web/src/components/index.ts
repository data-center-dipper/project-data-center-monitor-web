import type { App } from 'vue'
import Table from './table'
import Pagination from './pagination'

const components = [Table, Pagination]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  },
}
