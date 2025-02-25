<script lang="ts" setup>
import { reactive, ref } from 'vue'
import QxFormDialog from '@/components/form-dialog/src/index.vue'
import { useMessage } from '@/components/toast/index.tsx'

const emits = defineEmits(['action-success'])

const message = useMessage()

const newConsumer = reactive({
  resource: 0,
  name: '',
  id: '',
  threshold: '',
  businessProperty: '',
  lifeCycle: '',
})

const visible = ref(false)

const options = [
  {
    type: 'radio-group',
    label: '是否开启监控',
    prop: 'resource',
    value: newConsumer.resource,
    rules: [
      { required: true, message: '请选择是否开启监控', trigger: 'change' },
    ],
    children: [
      { type: 'radio', label: '是', value: 1 },
      { type: 'radio', label: '否', value: 0 },
    ],
  },
  {
    type: 'input',
    label: 'topic名称',
    prop: 'clusterCode',
    value: newConsumer.name,
    placeholder: '请输入集群唯一识别码，随机字符即可',
    rules: [
      { required: true, message: '集群唯一识别码不能为空', trigger: 'blur' },
    ],
  },
  {
    type: 'input',
    label: '消费组ID',
    prop: 'clusterName',
    value: newConsumer.id,
    placeholder: '请输入集群名称',
    rules: [{ required: true, message: '集群名称不能为空', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '延迟阈值',
    prop: 'address',
    value: newConsumer.threshold,
    placeholder: '请输入集群地址',
    rules: [{ required: true, message: '集群地址不能为空', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '业务属性',
    prop: 'kafkaJmxAddress',
    value: newConsumer.businessProperty,
    placeholder: '请输入集群jmx地址',
    rules: [
      { required: true, message: '集群Jmx地址不能为空', trigger: 'blur' },
    ],
  },
  {
    type: 'select',
    label: '生命周期',
    prop: 'lifeCycle',
    value: newConsumer.lifeCycle,
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

function handleCancel() {
  visible.value = false
  message.info('取消操作')
}

function handleConfirm() {
  message.success('新增成功')
  visible.value = false
  emits('action-success', newConsumer)
}

function handleAddGroup() {
  visible.value = !visible.value
}
</script>

<template>
  <div class="w-full py-2 flex justify-end">
    <el-button @click="handleAddGroup">新增消费组</el-button>
  </div>
  <qx-form-dialog
    :options="options"
    v-model:visible="visible"
    title="新增消费组"
    width="40%"
    :formAttrs="{ labelWidth: '130px', style: { padding: '0 40px' } }"
  >
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </qx-form-dialog>
</template>

<style></style>
