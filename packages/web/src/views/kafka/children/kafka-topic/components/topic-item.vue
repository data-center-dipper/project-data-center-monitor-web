<script setup lang="ts">
import { ref } from 'vue'
import { useDialog } from '@/components/dialog/useDialog.tsx'
import TopicDetail from './topic-detail.vue'
import ConsumerGroupDetail from './consumer-group-detail.vue'
import TopicDataPreview from './topic-data-preview.vue'

const visible = ref(false)
const dialogTitle = ref('')
const options = ref([])

const tableOptions = ref([
  { label: '入流速率(bytes)/1min', prop: 'inputRate' },
  { label: '出流速率(bytes)/1min', prop: 'outputRate' },
  { label: '排流量虚拟速率(EPS)/1min', prop: 'evaporationRate1' },
  { label: '满入入流速率(EPS)/1min', prop: 'fullInputRate1' },
  { label: '满入入流速率(EPS)/5min', prop: 'fullInputRate5' },
  { label: '满入入流速率(EPS)/15min', prop: 'fullInputRate15' },
])

const tableData = ref([
  {
    inputRate: '0.00MB',
    outputRate: '0.00MB',
    evaporationRate1: '0.0',
    fullInputRate1: '0.00',
    fullInputRate5: '0.00',
    fullInputRate15: '0.00',
  },
])

const handleOpenDialog = (title: string, ops: any[], type: string) => {
  visible.value = true
  dialogTitle.value = title
  options.value = ops
}

const dialogFormOptionsA = ref([
  {
    type: 'input',
    value: '',
    label: 'Topic名称',
    prop: 'topicName',
    placeholder: '请输入Topic名称',
    rules: [{ required: true, message: 'Topic名称不能为空', trigger: 'blur' }],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '分区数',
    prop: 'partitionsNum',
    placeholder: '请输入分区数',
    rules: [{ required: true, message: '分区数不能为空', trigger: 'blur' }],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '副本数',
    prop: 'replicasNum',
    placeholder: '请输入副本数',
    rules: [{ required: true, message: '副本数不能为空', trigger: 'blur' }],
    attrs: {
      clearable: true,
    },
  },
])

const dialogFormOptionsB = ref([
  {
    type: 'input',
    value: '',
    label: 'Topic名称',
    prop: 'topicName',
    placeholder: '请输入Topic名称',
    rules: [{ required: true, message: 'Topic名称不能为空', trigger: 'blur' }],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '旧分区数',
    prop: 'oldPartitionsNum',
    placeholder: '请输入旧分区数',
    rules: [{ required: true, message: '旧分区数不能为空', trigger: 'blur' }],
    attrs: {
      clearable: true,
    },
  },
  {
    type: 'input',
    value: '',
    label: '新分区数',
    prop: 'newPartitionsNum',
    placeholder: '请输入新分区数',
    rules: [{ required: true, message: '新分区数不能为空', trigger: 'blur' }],
    attrs: {
      clearable: true,
    },
  },
])

const openDetailDialog = () => {
  useDialog({
    title: '查看消费详情',
    component: TopicDetail,
    props: {},
  })
}

const openConsumerGroupDialog = () => {
  useDialog({
    title: '消费组查看',
    component: ConsumerGroupDetail,
    props: {},
  })
}

const openDataPreviewDialog = () => {
  useDialog({
    title: '数据预览',
    component: TopicDataPreview,
    props: {},
  })
}

const handleFormDialog = (type: string) => {
  if (type === 'rebuild') {
    handleOpenDialog('重建Topic', dialogFormOptionsA.value, type)
  } else if (type === 'expand') {
    handleOpenDialog('分区扩容', dialogFormOptionsB.value, type)
  }
}

const deleteTopic = () => {
 // 执行删除topic
}
</script>

<template>
  <div class="border rounded-md p-4 border-gray-200">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-1">
        <span class="text-gray-500">topic名称：</span>
        <span>com.dbapp.topic.rawevent</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">类型：</span>
        <span>内置</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">分区数：</span>
        <span>12</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">副本数：</span>
        <span>1</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">数据大小：</span>
        <span>133.91B</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">数据大小：</span>
        <span>2.88KB</span>
      </div>
    </div>
    <div class="mt-4">
      <qx-table
        border
        :options="tableOptions"
        :data="tableData"
        :pagination="false"
        :isLoading="false"
      />
    </div>
    <div class="flex items-center gap-1">
      <span class="text-gray-500">分区状态：</span>
      <span class="text-green-500">正常</span>
    </div>
    <div class="flex items-center gap-1">
      <div class="text-gray-500">操作：</div>
      <div class="flex gap-2">
        <el-button type="text" @click="openDetailDialog">查看详情</el-button>
        <el-button type="text" @click="openConsumerGroupDialog"
          >消费组查看</el-button
        >
        <el-button type="text" @click="openDataPreviewDialog"
          >数据预览</el-button
        >
        <el-button type="text" @click="handleFormDialog('rebuild')"
          >重建topic</el-button
        >
        <el-button type="text" @click="handleFormDialog('expand')"
          >分区扩容</el-button
        >
        <el-button type="text" @click="deleteTopic('expand')">删除topic</el-button>
        <el-button type="text">生成数据</el-button>
      </div>
    </div>
    <qx-form-dialog
      v-model:visible="visible"
      :title="dialogTitle"
      width="35%"
      :options="options"
      align-center
      :formAttrs="{
        labelWidth: '100px',
        style: { padding: '0 20px' },
      }"
    >
      <template #footer="{ form }">
        <el-button type="primary" @click="visible = false">取消</el-button>
        <el-button type="primary" @click="">确定</el-button>
      </template>
    </qx-form-dialog>
  </div>
</template>
