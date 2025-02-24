<template>
  <div class="main">
    <qx-form-search
      :defaultValue="{
        daterange: '2024-01-01',
        endDaterange: '2024-01-31',
        inputA: 'defaultInputA',
        inputB: 'defaultInputB',
      }"
      :option="searchOptions"
      @search="search"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import type { Option } from '@/components/form-search/src/interface.ts'

const cascaderOptions = [
  {
    value: 'guide',
    label: 'Guide',
    children: [
      {
        value: 'disciplines',
        label: 'Disciplines',
        children: [
          {
            value: 'consistency',
            label: 'Consistency',
          },
          {
            value: 'feedback',
            label: 'Feedback',
          },
          {
            value: 'efficiency',
            label: 'Efficiency',
          },
          {
            value: 'controllability',
            label: 'Controllability',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'side nav',
            label: 'Side Navigation',
          },
          {
            value: 'top nav',
            label: 'Top Navigation',
          },
        ],
      },
    ],
  },
  {
    value: 'component',
    label: 'Component',
    children: [
      {
        value: 'basic',
        label: 'Basic',
        children: [
          {
            value: 'layout',
            label: 'Layout',
          },
          {
            value: 'color',
            label: 'Color',
          },
          {
            value: 'typography',
            label: 'Typography',
          },
          {
            value: 'icon',
            label: 'Icon',
          },
          {
            value: 'button',
            label: 'Button',
          },
        ],
      },
      {
        value: 'form',
        label: 'Form',
        children: [
          {
            value: 'radio',
            label: 'Radio',
          },
          {
            value: 'checkbox',
            label: 'Checkbox',
          },
          {
            value: 'input',
            label: 'Input',
          },
          {
            value: 'input-number',
            label: 'InputNumber',
          },
          {
            value: 'select',
            label: 'Select',
          },
          {
            value: 'cascader',
            label: 'Cascader',
          },
          {
            value: 'switch',
            label: 'Switch',
          },
          {
            value: 'slider',
            label: 'Slider',
          },
          {
            value: 'time-picker',
            label: 'TimePicker',
          },
          {
            value: 'date-picker',
            label: 'DatePicker',
          },
          {
            value: 'datetime-picker',
            label: 'DateTimePicker',
          },
          {
            value: 'upload',
            label: 'Upload',
          },
          {
            value: 'rate',
            label: 'Rate',
          },
          {
            value: 'form',
            label: 'Form',
          },
        ],
      },
      {
        value: 'data',
        label: 'Data',
        children: [
          {
            value: 'table',
            label: 'Table',
          },
          {
            value: 'tag',
            label: 'Tag',
          },
          {
            value: 'progress',
            label: 'Progress',
          },
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'pagination',
            label: 'Pagination',
          },
          {
            value: 'badge',
            label: 'Badge',
          },
        ],
      },
      {
        value: 'notice',
        label: 'Notice',
        children: [
          {
            value: 'alert',
            label: 'Alert',
          },
          {
            value: 'loading',
            label: 'Loading',
          },
          {
            value: 'message',
            label: 'Message',
          },
          {
            value: 'message-box',
            label: 'MessageBox',
          },
          {
            value: 'notification',
            label: 'Notification',
          },
        ],
      },
      {
        value: 'navigation',
        label: 'Navigation',
        children: [
          {
            value: 'menu',
            label: 'Menu',
          },
          {
            value: 'tabs',
            label: 'Tabs',
          },
          {
            value: 'breadcrumb',
            label: 'Breadcrumb',
          },
          {
            value: 'dropdown',
            label: 'Dropdown',
          },
          {
            value: 'steps',
            label: 'Steps',
          },
        ],
      },
      {
        value: 'others',
        label: 'Others',
        children: [
          {
            value: 'dialog',
            label: 'Dialog',
          },
          {
            value: 'tooltip',
            label: 'Tooltip',
          },
          {
            value: 'popover',
            label: 'Popover',
          },
          {
            value: 'card',
            label: 'Card',
          },
          {
            value: 'carousel',
            label: 'Carousel',
          },
          {
            value: 'collapse',
            label: 'Collapse',
          },
        ],
      },
    ],
  },
  {
    value: 'resource',
    label: 'Resource',
    children: [
      {
        value: 'axure',
        label: 'Axure Components',
      },
      {
        value: 'sketch',
        label: 'Sketch Templates',
      },
      {
        value: 'docs',
        label: 'Design Documentation',
      },
    ],
  },
]

const searchOptions: Option[] = reactive([
  {
    label: '文本类型',
    placeholder: '请输入文本',
    type: 'input',
    prop: 'inputA',
  },
  {
    label: '文本类型',
    placeholder: '请输入文本',
    type: 'input',
    prop: 'inputB',
  },
  {
    label: '选择框',
    prop: 'select',
    placeholder: '请选择支付方式',
    type: 'select',
    option: [
      {
        label: '微信',
        value: 0,
      },
      {
        label: '支付宝',
        value: 1,
      },
    ],
  },
  {
    label: '文本选择框',
    prop: 'inputSelect1',
    placeholder: '请输入文本',
    type: 'inputSelect',
    inputOptions: {
      prop: 'inputSelect2',
      option: [
        {
          label: '微信',
          value: 0,
        },
        {
          label: '支付宝',
          value: 1,
        },
      ],
    },
  },
  {
    label: '级联选择器',
    placeholder: '请选择级联选择器',
    type: 'cascader',
    prop: 'cascader',
    option: cascaderOptions,
  },
  {
    label: '日期选择',
    type: 'date',
    prop: 'date',
    placeholder: '请选择日期',
  },
  {
    label: '日期时间',
    type: 'datetime',
    prop: 'datetime',
    placeholder: '请选择日期时间',
  },
  {
    label: '日期范围',
    type: 'daterange',
    prop: 'daterange',
    endProp: 'endDaterange',
  },
])

// 搜索
const search = (val: any) => {
  tableData.searchForm = val
  tableData.page.pageIndex = 1
  initTableData()
}

//表格数据
const tableData: any = reactive({
  data: [],
  searchForm: {},
  page: {
    pageIndex: 1,
    pageSize: 10,
    total: 0,
  },
})

// 初始化表格数据
const initTableData = () => {
  console.log(tableData.searchForm)
}
</script>

<style scoped>
.main {
  padding: 20px;
}
</style>
