import type { App, Directive } from 'vue'

const directivesList: { [key: string]: Directive } = {}

const directives = {
  install(app: App<Element>) {
    Object.keys(directivesList).forEach((key) => {
      app.directive(key, directivesList[key])
    })
  },
}

export default directives
