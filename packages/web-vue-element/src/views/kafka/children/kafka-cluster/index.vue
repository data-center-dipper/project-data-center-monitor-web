<script setup lang="ts">
import { ref, computed } from 'vue'
import ListHeader from './components/list-header.vue'
import ChooseData from './components/choose-data.vue'

const searchQuery = ref('')
const clusters = ref([
  {
    id: 1,
    name: 'cluster_lxx',
    type: '内置',
    partitions: 1,
    replicas: 2,
    registrationTime: '2024-01-01T12:00:00Z',
    updateTime: '2024-01-01T12:00:00Z',
    address: '192.168.1.1:9092',
    status: '正常',
    monitoringEnabled: false,
    monitoringPolicy: 'now', // 默认值
    monitorStartTime: null,
    monitorEndTime: null,
  },
])
const clusterModalVisible = ref(false)
const modalData = ref({})
const modalTitle = ref('')

const filteredClusters = computed(() =>
  clusters.value.filter((cluster) =>
    cluster.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  ),
)

function showDetails(cluster: any) {
  modalTitle.value = `集群详情 - ${cluster.name}`
  modalData.value = { ...cluster }
  clusterModalVisible.value = true
}

function editCluster(cluster: any) {}

function deleteCluster(cluster: any) {}

function updateMonitoring(cluster: any) {
  if (cluster.monitoringPolicy === 'now') {
    cluster.monitorStartTime = null
    cluster.monitorEndTime = null
  }
}

function closeModal() {
  clusterModalVisible.value = false
}
</script>

<template>
  <div class="kafka-cluster-manager p-4 space-y-4">
    <ListHeader></ListHeader>
    <!-- 集群列表 -->
    <el-table
      :data="filteredClusters"
      border
      :header-cell-style="{ textAlign: 'center' } as any"
    >
      <el-table-column prop="id" label="集群ID" width="80" />
      <el-table-column prop="name" label="集群名称" width="120" />
      <el-table-column prop="registrationTime" label="注册时间" width="240" />
      <el-table-column prop="updateTime" label="更新时间" width="240" />
      <el-table-column prop="address" label="集群地址" width="240" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column prop="type" label="类型" width="180" />
      <el-table-column label="监控" width="480">
        <template #default="scope">
          <div class="flex items-center gap-2">
            <div>是否开启监控:</div>
            <el-checkbox
              v-model="scope.row.monitoringEnabled"
              @change="updateMonitoring(scope.row)"
            />
          </div>
          <el-form-item label="监控策略:" v-if="scope.row.monitoringEnabled">
            <el-select
              v-model="scope.row.monitoringPolicy"
              @change="updateMonitoring(scope.row)"
            >
              <el-option label="从现在开始" value="now" />
              <el-option label="时间范围" value="range" />
            </el-select>
          </el-form-item>
          <template
            v-if="
              scope.row.monitoringPolicy === 'range' &&
              scope.row.monitoringEnabled
            "
          >
            <ChooseData
              startPlaceholder="监控开始时间"
              endPlaceholder="监控结束时间"
            />
          </template>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300" align="center">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click.prevent="showDetails(scope.row)"
            >详情</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.prevent="editCluster(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="small"
            @click.prevent="deleteCluster(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 集群详情弹窗 -->
    <el-dialog v-model="clusterModalVisible" :title="modalTitle" width="30%">
      <div class="modal-body">
        <p><strong>ID:</strong> {{ modalData.id }}</p>
        <p><strong>名称:</strong> {{ modalData.name }}</p>
        <p><strong>地址:</strong> {{ modalData.address }}</p>
        <p>
          <strong>更多信息:</strong> 这里是关于{{ modalData.name }}的额外信息。
        </p>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeModal"> 关闭 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped></style>
