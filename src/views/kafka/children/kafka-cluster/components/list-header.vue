<script setup lang="ts">
import { ref } from 'vue'

const addEditClusterVisible = ref(false)
const addEditModalTitle = ref('添加集群')
const newCluster = ref({
  clusterCode: '',
  clusterName: '',
  address: '',
  kafkaJmxAddress: '',
  zookeeperAddress: '',
  clusterDesc: '',
  checkAddress: 'false',
})
const formOptions = [
  {
    type: 'input',
    label: '集群唯一识别码:',
    prop: 'clusterCode',
    value: newCluster.value.clusterCode,
    placeholder: '请输入集群唯一识别码，随机字符即可',
    rules: [
      { required: true, message: '集群唯一识别码不能为空', trigger: 'blur' },
    ],
  },
  {
    type: 'input',
    label: '集群名称:',
    prop: 'clusterName',
    value: newCluster.value.clusterName,
    placeholder: '请输入集群名称',
    rules: [{ required: true, message: '集群名称不能为空', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '集群地址:',
    prop: 'address',
    value: newCluster.value.address,
    placeholder: '请输入集群地址',
    rules: [{ required: true, message: '集群地址不能为空', trigger: 'blur' }],
  },
  {
    type: 'input',
    label: '集群Jmx地址:',
    prop: 'kafkaJmxAddress',
    value: newCluster.value.kafkaJmxAddress,
    placeholder: '请输入集群jmx地址',
    rules: [
      { required: true, message: '集群Jmx地址不能为空', trigger: 'blur' },
    ],
  },
  {
    type: 'input',
    label: '集群zk地址:',
    prop: 'zookeeperAddress',
    value: newCluster.value.zookeeperAddress,
    placeholder: '请输入集群zk地址',
    rules: [{ required: true, message: '集群zk地址不能为空', trigger: 'blur' }],
  },
  {
    type: 'textarea',
    label: '集群描述:',
    prop: 'clusterDesc',
    value: newCluster.value.clusterDesc,
    rows: 4,
    placeholder: '请输入集群描述',
    rules: [{ required: true, message: '集群描述不能为空', trigger: 'blur' }],
  },
  {
    type: 'radio-group',
    label: '检验地址:',
    prop: 'checkAddress',
    value: newCluster.value.checkAddress,
    rules: [
      { required: true, message: '请选择是否检验地址', trigger: 'change' },
    ],
    children: [
      { type: 'radio', label: '是', value: 'true' },
      { type: 'radio', label: '否', value: 'false' },
    ],
  },
]

const emits = defineEmits(['add-success'])

const submitClusterForm = () => {
  console.log('提交表单', newCluster.value)
  emits('add-success')
}

const openAddDialog = () => {
  addEditClusterVisible.value = !addEditClusterVisible.value
}

defineExpose({
  openAddDialog,
})
</script>

<template>
  <div class="flex justify-between mb-4">
    <div class="flex gap-2">
      <el-form-item label="集群查询">
        <el-input placeholder="搜索集群..." />
      </el-form-item>
      <el-button>搜索</el-button>
    </div>
    <el-button type="primary" @click="openAddDialog"> 新增集群 </el-button>
  </div>

  <qx-form-dialog
    v-model:visible="addEditClusterVisible"
    :options="formOptions"
    :title="addEditModalTitle"
    width="35%"
    :formAttrs="{ labelWidth: '130px', style: { padding: '0 40px' } }"
  >
    <template #footer>
      <el-button type="primary" @click="submitClusterForm">保存</el-button>
    </template>
  </qx-form-dialog>
</template>

<style scoped></style>
