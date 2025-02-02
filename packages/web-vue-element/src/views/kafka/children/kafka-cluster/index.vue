<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, computed, onMounted } from 'vue';
import ListHeader from './components/list-header.vue';
import ChooseData from './components/choose-data.vue';
import request from '@/api/index.ts'; // 确保路径正确指向你的 RequestHttp 文件

const searchQuery = ref('');
const clusters: Ref<any[]> = ref([]); // 修改类型定义以适应异步数据加载
const clusterModalVisible = ref(false);
const modalData = ref({});
const modalTitle = ref('');
const listHeaderRef: Ref<InstanceType<typeof ListHeader> | null> = ref(null);

const pageSize = ref(10);
const currentPage = ref(1);

const newCluster = ref({ clusterCode: '', clusterName: '', address: '', clusterDesc: '', checkAddress: '' }); // 新增集群的数据模型

// 获取所有集群数据的函数
const fetchClusters = async () => {
  try {
    const response = await request.get('/dipper/monitor/api/v1/kafka/cluster/getAllCluster');
    console.log('获取集群信息成功:', JSON.stringify(response.data, null, 2));
    clusters.value = response.data; // 更新clusters值为从接口获取的数据
  } catch (error) {
    if (error instanceof Error) {
      console.error('获取集群信息失败:', error.message); // 打印错误消息
    } else {
      console.error('获取集群信息失败:', error); // 如果不是标准Error对象，直接打印
    }
  }
};


// 计算过滤后的集群数据
const filteredClusters = computed(() => {
  const result = clusters.value.filter((cluster) =>
    cluster && cluster.clusterName && cluster.clusterName.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  console.log('Filtered Clusters:', JSON.stringify(result, null, 2)); // 打印过滤后的数据
  return result;
});

// 计算需要展示的数据
const paginatedClusters = computed(() => {
  const result = filteredClusters.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value,
  );
  console.log('Paginated Clusters:', JSON.stringify(result, null, 2)); // 打印分页后的数据
  return result;
});

onMounted(async () => {
  console.log('开始获取集群信息...');
  await fetchClusters(); // 确保这里等待fetchClusters完成
  console.log('结束获取集群信息.');
  console.log('当前 clusters 数据:', JSON.stringify(clusters.value, null, 2)); // 打印获取后的clusters数据
});

function showDetails(cluster: any) {
  modalTitle.value = `集群详情 - ${cluster.name}`;
  modalData.value = { ...cluster };
  clusterModalVisible.value = true;
}

function editCluster(cluster: any) {
  listHeaderRef.value?.showEditClusterModal(cluster);
}

function deleteCluster(cluster: any) {}

function updateMonitoring(cluster: any) {
  if (cluster.monitoringPolicy === 'now') {
    cluster.monitorStartTime = null;
    cluster.monitorEndTime = null;
  }
}

function closeModal() {
  clusterModalVisible.value = false;
}

// 分页改变时的处理函数
function handlePageChange(page: number) {
  currentPage.value = page;
}
</script>

<template>
  <div class="kafka-cluster-manager p-4 space-y-4">
    <ListHeader ref="listHeaderRef"></ListHeader>

    <!-- 集群列表 -->
    <el-table
      :data="paginatedClusters"
      border
      :header-cell-style="{ textAlign: 'center' }"
      height="600"
    >
      <el-table-column prop="id" label="集群ID" width="80" />
      <el-table-column prop="clusterCode" label="集群编码" width="120" />
      <el-table-column prop="clusterName" label="集群名称" width="150" />
      <el-table-column prop="clusterDesc" label="集群描述" width="200" />
      <el-table-column prop="address" label="集群地址" width="200" />
      <el-table-column prop="currentCluster" label="当前集群" width="100">
        <template #default="scope">
          <span>{{ scope.row.currentCluster ? '是' : '否' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="defaultCluster" label="默认集群" width="100">
        <template #default="scope">
          <span>{{ scope.row.defaultCluster ? '是' : '否' }}</span>
        </template>
      </el-table-column>
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
          <template v-if="scope.row.monitoringPolicy === 'range' && scope.row.monitoringEnabled">
            <ChooseData startPlaceholder="监控开始时间" endPlaceholder="监控结束时间" />
          </template> <!-- 添加这个结束标签 -->
        </template>
      </el-table-column>
      <!-- 如果需要显示更多关于监控的信息，请确保相关属性存在于数据对象中 -->
      <el-table-column label="操作" width="300" align="center">
        <template #default="scope">
          <el-button type="text" size="small" @click.prevent="showDetails(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click.prevent="editCluster(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click.prevent="deleteCluster(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="filteredClusters.length"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="handlePageChange"
      class="mt-4 flex justify-end"
    />

    <!-- 集群详情弹窗 -->
    <el-dialog v-model="clusterModalVisible" :title="modalTitle" width="30%">
      <div class="modal-body">
        <p><strong>ID:</strong> {{ modalData.id }}</p>
        <p><strong>集群编码:</strong> {{ modalData.clusterCode }}</p>
        <p><strong>集群名称:</strong> {{ modalData.clusterName }}</p>
        <p><strong>集群描述:</strong> {{ modalData.clusterDesc }}</p>
        <p><strong>集群地址:</strong> {{ modalData.address }}</p>
        <p><strong>是否为当前集群:</strong> {{ modalData.currentCluster ? '是' : '否' }}</p>
        <p><strong>是否为默认集群:</strong> {{ modalData.defaultCluster ? '是' : '否' }}</p>
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