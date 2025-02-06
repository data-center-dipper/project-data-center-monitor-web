import type { RuleItem } from './rule.ts'
import type { CSSProperties } from 'vue'

export interface FormOptions {
  // 表单项显示的元素
  type:
    | 'cascader'
    | 'checkbox'
    | 'checkbox-group'
    | 'checkbox-button'
    | 'radio'
    | 'radio-group'
    | 'radio-button'
    | 'color-picker'
    | 'date-picker'
    | 'input'
    | 'input-number'
    | 'rate'
    | 'select'
    | 'option'
    | 'slider'
    | 'switch'
    | 'time-picker'
    | 'time-select'
    | 'transfer'
    | 'upload'
    | 'editor '
  // 表单项的值
  value?: any
  // 表单的Label
  label?: string
  // 表单的标识
  prop?: string
  // 表单的验证规则
  rules?: RuleItem
  // 表单项的提示信息
  placeholder?: string
  // 表单元素特有的属性
  attrs?: {
    clearable?: boolean
    showPassword?: boolean
    disabled?: boolean
    // css 样式
    style?: CSSProperties
  }
  // 表单项的子元素
  children?: FormOptions[]
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string
    headers?: object
    method?: 'post' | 'put' | 'patch'
    multiple?: boolean
    data?: any
    name?: string
    withCredentials?: boolean
    showFileList?: boolean
    drag?: boolean
    accept?: string
    thumbnailMode?: boolean
    fileList?: any[]
    listType?: 'text' | 'picture' | 'picture-card'
    autoUpload?: boolean
    disabled?: boolean
    limit?: number
  }
}
