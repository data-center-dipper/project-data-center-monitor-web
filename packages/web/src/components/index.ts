import type { App } from 'vue'
import Table from './table'
import Pagination from './pagination'
import Switch from './switch'
import FormDialog from './form-dialog'
import Drawer from './drawers'
import Form from './form'

const components = [Table, Pagination, Switch, FormDialog, Drawer, Form]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  },
}
