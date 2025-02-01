<script setup lang="ts">
import { ref } from 'vue'
import ChooseData from '@/views/kafka/children/kafka-cluster/components/choose-data.vue'
const searchQuery = ref('')

const addEditClusterVisible = ref(false)
const addEditModalTitle = ref('新增集群')
const newCluster = ref({
  name: '',
  address: '',
  type: '',
  monitoringEnabled: false,
  monitoringPolicy: 'now',
  monitorStartTime: '',
  monitorEndTime: '',
})

// 显示新增集群模态框
const showAddClusterModal = () => {
  addEditClusterVisible.value = true
  addEditModalTitle.value = '新增集群'

  newCluster.value = {
    name: '',
    address: '',
    type: '',
    monitoringEnabled: false,
    monitoringPolicy: 'now',
    monitorStartTime: '',
    monitorEndTime: '',
  }
}

// 显示编辑集群模态框
const showEditClusterModal = (cluster) => {
  addEditClusterVisible.value = true
  addEditModalTitle.value = '编辑集群'
  newCluster.value = { ...cluster }
}

// 提交表单的处理逻辑
const submitClusterForm = () => {
  if (addEditModalTitle.value.includes('新增')) {
    addCluster()
  } else {
    editCluster()
  }
}

// 新增集群的逻辑
const addCluster = () => {
  console.log('新增集群:', newCluster.value)
  addEditClusterVisible.value = false
}

// 编辑集群的逻辑
const editCluster = () => {
  console.log('编辑集群:', newCluster.value)
  addEditClusterVisible.value = false
}

defineExpose({
  showAddClusterModal,
  showEditClusterModal,
})
</script>

<template>
  <div class="flex justify-between items-center mb-4">
    <div class="text-nowrap flex items-center gap-2">
      <div>集群查询:</div>
      <el-input v-model="searchQuery" placeholder="搜索集群..." />
    </div>
    <el-button @click="showAddClusterModal"> 新增集群 </el-button>
  </div>
  <el-dialog
    v-model="addEditClusterVisible"
    :title="addEditModalTitle"
    width="30%"
  >
    <el-form @submit.prevent="submitClusterForm" class="space-y-4">
      <el-form-item label="集群名称:">
        <el-input
          id="clusterName"
          v-model="newCluster.name"
          required
          class="w-full"
          placeholder="请输入集群名称"
        />
      </el-form-item>
      <el-form-item label="集群地址:">
        <el-input
          id="clusterAddress"
          v-model="newCluster.address"
          required
          class="w-full"
          placeholder="请输入集群地址"
        />
      </el-form-item>
      <el-form-item label="集群类型:">
        <el-input
          id="clusterType"
          v-model="newCluster.type"
          required
          class="w-full"
          placeholder="请输入集群类型"
        />
      </el-form-item>
      <el-form-item label="是否开启监控:">
        <el-checkbox
          id="monitoringEnabled"
          v-model="newCluster.monitoringEnabled"
        />
      </el-form-item>
      <el-form-item label="监控策略:" v-if="newCluster.monitoringEnabled">
        <el-select
          id="monitoringPolicy"
          v-model="newCluster.monitoringPolicy"
          class="w-full"
        >
          <el-option label="从现在开始" value="now" />
          <el-option label="时间范围" value="range" />
        </el-select>
      </el-form-item>

      <template
        v-if="
          newCluster.monitoringPolicy === 'range' &&
          newCluster.monitoringEnabled
        "
      >
        <ChooseData
          startPlaceholder="监控开始时间"
          endPlaceholder="监控结束时间"
        />
      </template>
    </el-form>
    <template #footer>
      <el-button type="primary">
        {{ addEditModalTitle.includes('新增') ? '添加' : '保存' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped></style>
