import {
  defineComponent,
  h,
  shallowRef,
  triggerRef,
  getCurrentInstance,
  type DefineComponent,
} from 'vue'
import type { Component } from 'vue'
import { ElDialog } from 'element-plus'

export const DialogList = shallowRef<Component[]>([])

type IConstructor = new (...args: any[]) => any

interface ModalOptions<T extends IConstructor = DefineComponent> {
  title: string
  component: Component | string
  props?: InstanceType<T>['$props']
  dialogProps?: any
}

let count = 0

export const useDialog = <T extends IConstructor>(options: ModalOptions<T>) => {
  const component = defineComponent({
    name: '__modal__' + count++,
    setup() {
      return () =>
        h(
          ElDialog,
          {
            modelValue: true,
            title: options.title,
            ...options.dialogProps,
          },
          {
            default: () => h(options.component, options.props),
          },
        )
    },
  })

  DialogList.value.push(component)
  triggerRef(DialogList)
}

export const useCloseDialog = () => {
  const instance = getCurrentInstance()?.proxy
  return () => {
    if (instance) {
      let p = instance.$parent
      while (p) {
        if (p?.$options.name?.startsWith('__modal__')) {
          break
        }
        p = p.$parent
      }
      if (p) {
        DialogList.value.filter((c) => c.name !== p?.$options.name)
        triggerRef(DialogList)
      }
    }
  }
}
