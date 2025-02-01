<script setup lang="ts">
import { ref, computed } from 'vue';

// 数据初始化
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 5;
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
    monitorEndTime: null
  },
]);
const clusterModalVisible = ref(false);
const addEditClusterVisible = ref(false);
const modalData = ref({});
const modalTitle = ref('');
const newCluster = ref({
  name: '',
  address: '',
  type: '',
  monitoringEnabled: false,
  monitoringPolicy: 'now', // 默认值
  monitorStartTime: null,
  monitorEndTime: null
});
const addEditModalTitle = ref('');

// 计算属性
const filteredClusters = computed(() =>
  clusters.value.filter(cluster =>
    cluster.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

const paginatedclusters = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredClusters.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredClusters.value.length / itemsPerPage));

// 方法定义
function showDetails(cluster: any) {
  modalTitle.value = `集群详情 - ${cluster.name}`;
  modalData.value = { ...cluster };
  clusterModalVisible.value = true;
}

function editCluster(cluster: any) {
  newCluster.value = { ...cluster };
  addEditModalTitle.value = `编辑集群 - ${cluster.name}`;
  addEditClusterVisible.value = true;
}

function deleteCluster(cluster: any) {}

function showAddClusterModal() {
  newCluster.value = {};
  addEditModalTitle.value = '新增集群';
  addEditClusterVisible.value = true;
}

function submitClusterForm() {
  if (addEditModalTitle.value.includes('新增')) {
    clusters.value.push({ ...newCluster.value });
  } else {
    let index = clusters.value.findIndex(c => c.id === newCluster.value.id);
    if (index !== -1) {
      clusters.value.splice(index, 1, { ...newCluster.value });
    }
  }
  closeAddEditModal();
}

function closeAddEditModal() {
  addEditClusterVisible.value = false;
}

function closeModal() {
  clusterModalVisible.value = false;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function updateMonitoring(cluster: any) {
  if (cluster.monitoringPolicy === 'now') {
    cluster.monitorStartTime = null;
    cluster.monitorEndTime = null;
  }
}
</script>

<template>
  <div class="kafka-cluster-manager p-4 space-y-4">
    <!-- 集群查询部分 -->
    <div class="header flex justify-between items-center border-b pb-2 mb-4">
      <div class="flex items-center space-x-2">
        <span>集群查询:</span>
        <input type="text" v-model="searchQuery" placeholder="搜索集群..." class="border rounded px-2 py-1"/>
      </div>
      <div class="text-gray-600">集群总数: {{ clusters.length }}</div>
      <button @click="showAddClusterModal" class="bg-blue-500 text-white px-3 py-1 rounded">新增集群</button>
    </div>

    <!-- 集群列表 -->
    <div class="cluster-list space-y-4">
      <div v-for="(cluster, index) in paginatedclusters" :key="index" class="cluster-item bg-white p-4 rounded shadow-md">
        <div class="row flex flex-wrap gap-2 mb-2">
          <span>集群ID：{{ cluster.id }}</span>
          <span>集群名称：{{ cluster.name }}</span>
          <span>注册时间：{{ cluster.registrationTime }}</span>
          <span>更新时间：{{ cluster.updateTime }}</span>
        </div>
        <div class="row flex gap-2 mb-2">
          <span>集群地址：{{ cluster.address }}</span>
        </div>
        <div class="metrics-row row grid grid-cols-2 gap-2 mb-2">
          <span>状态：{{ cluster.status }}</span>
          <span>类型：{{ cluster.type }}</span>
        </div>
        <div class="monitor-metrics row space-y-2">
          <label>
            是否开启监控:
            <input type="checkbox" v-model="cluster.monitoringEnabled" @change="updateMonitoring(cluster)">
          </label>
          <label>
            监控策略:
            <select v-model="cluster.monitoringPolicy" @change="updateMonitoring(cluster)">
              <option value="now">从现在开始</option>
              <option value="range">时间范围</option>
            </select>
          </label>
          <template v-if="cluster.monitoringPolicy === 'range'">
            <label>
              监控开始时间:
              <input type="datetime-local" v-model="cluster.monitorStartTime" @change="updateMonitoring(cluster)">
            </label>
            <label>
              监控结束时间:
              <input type="datetime-local" v-model="cluster.monitorEndTime" @change="updateMonitoring(cluster)">
            </label>
          </template>
          <template v-else>
            <span>监控将立即开始。</span>
          </template>
        </div>
        <div class="actions row space-x-2">
          <a href="#" @click.prevent="showDetails(cluster)">详情</a>
          <a href="#" @click.prevent="editCluster(cluster)">编辑</a>
          <a href="#" @click.prevent="deleteCluster(cluster)">删除</a>
        </div>
      </div>
    </div>

    <!-- 分页控制 -->
    <div class="pagination flex justify-center space-x-2 mt-4" v-if="totalPages > 1">
      <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">上一页</button>
      <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-300 hover:bg-gray-400 rounded">下一页</button>
    </div>

    <!-- 集群详情弹窗 -->
    <transition name="fade">
      <div v-if="clusterModalVisible" class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="modal bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ modalTitle }}</h3>
            <button @click="closeModal" class="text-xl">&times;</button>
          </div>
          <div class="modal-body">
            <p><strong>ID:</strong> {{ modalData.id }}</p>
            <p><strong>名称:</strong> {{ modalData.name }}</p>
            <p><strong>地址:</strong> {{ modalData.address }}</p>
            <p><strong>更多信息:</strong> 这里是关于{{ modalData.name }}的额外信息。</p>
          </div>
          <div class="modal-footer text-right">
            <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded">关闭</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- 新增/编辑集群模态框 -->
    <transition name="fade">
      <div v-if="addEditClusterVisible" class="modal-overlay fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="modal bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div class="modal-header flex justify-between items-center">
            <h3>{{ addEditModalTitle }}</h3>
            <button @click="closeAddEditModal" class="text-xl">&times;</button>
          </div>
          <form @submit.prevent="submitClusterForm" class="space-y-4">
            <label for="clusterName">集群名称:</label>
            <input id="clusterName" v-model="newCluster.name" required class="border rounded px-2 py-1 w-full"/>

            <label for="clusterAddress">集群地址:</label>
            <input id="clusterAddress" v-model="newCluster.address" required class="border rounded px-2 py-1 w-full"/>

            <label for="clusterType">集群类型:</label>
            <input id="clusterType" v-model="newCluster.type" required class="border rounded px-2 py-1 w-full"/>

            <label for="monitoringEnabled">是否开启监控:</label>
            <input id="monitoringEnabled" type="checkbox" v-model="newCluster.monitoringEnabled" />

            <label for="monitoringPolicy">监控策略:</label>
            <select id="monitoringPolicy" v-model="newCluster.monitoringPolicy" class="border rounded px-2 py-1 w-full">
              <option value="now">从现在开始</option>
              <option value="range">时间范围</option>
            </select>

            <template v-if="newCluster.monitoringPolicy === 'range'">
              <label for="monitorStartTime">监控开始时间:</label>
              <input id="monitorStartTime" type="datetime-local" v-model="newCluster.monitorStartTime" class="border rounded px-2 py-1 w-full"/>

              <label for="monitorEndTime">监控结束时间:</label>
              <input id="monitorEndTime" type="datetime-local" v-model="newCluster.monitorEndTime" class="border rounded px-2 py-1 w-full"/>
            </template>
            <template v-else>
              <p>监控将立即开始。</p>
            </template>

            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">{{ addEditModalTitle.includes('新增') ? '添加' : '保存' }}</button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 保留必要的自定义样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 确保模态框在最上层 */
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 轻微阴影 */
  width: 80%;
  max-width: 600px;
}

.modal-header button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

/* Transition for fade effect */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>