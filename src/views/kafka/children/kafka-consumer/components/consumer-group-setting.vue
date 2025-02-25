<script lang="ts" setup>
import { reactive } from 'vue'
import { useCloseDialog } from '@/components/dialog/useDialog.tsx'
import QxForm from '@/components/form/src/index.vue'

const props = defineProps<{
  onSettingSuccess: () => void
  onSettingCancel: () => void
}>()

const form = reactive({
  attribute: '',
  resource: '',
  threshold: '',
  lifeCycle: '',
})

const closeDialog = useCloseDialog()

const options = [
  {
    type: 'radio-group',
    label: '开启监控',
    prop: 'resource',
    value: form.resource,
    rules: [
      { required: true, message: '请选择是否开启监控', trigger: 'change' },
    ],
    children: [
      { type: 'radio', label: '开启', value: 1 },
      { type: 'radio', label: '关闭', value: 0 },
    ],
  },
  {
    type: 'input',
    label: '业务属性',
    prop: 'clusterCode',
    value: form.attribute,
    placeholder: '请输入集群唯一识别码，随机字符即可',
    rules: [
      { required: true, message: '集群唯一识别码不能为空', trigger: 'blur' },
    ],
  },
  {
    type: 'input',
    label: '延迟阈值',
    prop: 'address',
    value: form.threshold,
    placeholder: '请输入集群地址',
    rules: [{ required: true, message: '集群地址不能为空', trigger: 'blur' }],
  },
  {
    type: 'select',
    label: '生命周期',
    prop: 'lifeCycle',
    value: form.lifeCycle,
    placeholder: '请选择集群生命周期',
    rules: [
      { required: true, message: '集群生命周期不能为空', trigger: 'blur' },
    ],
    children: [
      { label: '永久', value: 1, type: 'option' },
      { label: '一个月(一个月不更新自动删除)', value: 0, type: 'option' },
    ],
  },
]

function cancel() {
  closeDialog()
}

function save() {
  props.onSettingSuccess()
  closeDialog()
}
</script>

<template>
  <qx-form :options="options">
    <template #actions="{ form, model }">
      <div class="flex justify-end w-full">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="save">保存</el-button>
      </div>
    </template>
  </qx-form>
</template>

<style scoped></style>
