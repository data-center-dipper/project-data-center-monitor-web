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
import 'element-plus/theme-chalk/el-dialog.css'

export const modalList = shallowRef<Component[]>([])

type IConstructor = new (...args: any[]) => any

interface ModalOptions<T extends IConstructor = DefineComponent> {
  title: string
  component: Component | string
  props?: InstanceType<T>['$props']
}

let count = 0

export const useModal = <T extends IConstructor>(options: ModalOptions<T>) => {
  const component = defineComponent({
    name: '__modal__' + count++,
    setup() {
      return () =>
        h(
          ElDialog,
          {
            modelValue: true,
            title: options.title,
          },
          {
            default: () => h(options.component, options.props),
          },
        )
    },
  })

  modalList.value.push(component)
  triggerRef(modalList)
}

export const useCloseModal = () => {
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
        modalList.value.filter((c) => c.name !== p?.$options.name)
        triggerRef(modalList)
      }
    }
  }
}
