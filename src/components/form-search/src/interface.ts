//选择框的option类型
interface SelectOption {
  label: string
  value: any
}
//选择框和文本输入框的option类型
interface InputOptions {
  prop: string
  option: SelectOption[]
}

export interface Option {
  label: string //标签名称
  prop: string //表单项字段名
  endProp?: string //日期范围的结束日期字段名
  placeholder?: string //输入框占位文本
  type?:
    | 'input'
    | 'select'
    | 'cascader'
    | 'date'
    | 'datetime'
    | 'daterange'
    | 'inputSelect' //表单项类型
  optionLabel?: string //选择框的label字段
  optionValue?: string //选择框的value字段
  option?: any[] //选择框option
  inputOptions?: InputOptions //选择框和文本输入框的option
  max?: number //级联选择器的最大选择数量
  children?: string //级联选择器children字段名
  multiple?: boolean //级联选择器是否多选
  value?: string //级联选择器返回值字段名
  itemLabel?: string //级联选择器选项名称
  checkStrictly?: boolean //是否可选择父节点和子节点
  emitPath?: boolean // 是否返回由该节点所在的各级菜单的值所组成的数组
  show?: boolean //是否显示选中值的完整路径
  filterable?: boolean //选择框是否可搜索
}
