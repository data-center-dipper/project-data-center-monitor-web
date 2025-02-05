import type { App } from 'vue'
import Table from './table'
import Pagination from './pagination'
import Switch from './switch'

const components = [Table, Pagination, Switch]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  },
}
