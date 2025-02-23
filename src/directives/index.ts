import type { App, Directive } from 'vue'
import settingTextColor from './modules/settingTextColor.ts'

const directivesList: { [key: string]: Directive } = {
  settingTextColor,
}

const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
