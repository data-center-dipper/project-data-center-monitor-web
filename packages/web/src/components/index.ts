import type { App } from 'vue'
import Table from './table'
import Pagination from './pagination'
import Switch from './switch'
import FormDialog from './form-dialog'

const components = [Table, Pagination, Switch, FormDialog]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  },
}
