import type { App } from 'vue'
import Table from './table'
import Pagination from './pagination'
import FormDialog from './form-dialog'
import Drawer from './drawers'
import Form from './form'
import FormSearch from './form-search'
import Icon from './Icon'

const components = [
  Table,
  Pagination,
  FormDialog,
  Drawer,
  Form,
  FormSearch,
  Icon,
]

export default {
  install(app: App) {
    components.map((item) => {
      app.use(item)
    })
  },
}
