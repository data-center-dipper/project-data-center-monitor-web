<script setup lang="ts">
import type { Ref } from 'vue';
import { ref, computed, onMounted } from 'vue';
import ListHeader from './components/list-header.vue';
import ChooseData from './components/choose-data.vue';
import request from '@/api/index.ts'; // 确保路径正确指向你的 RequestHttp 文件
import { ElMessageBox } from 'element-plus';

const searchQuery = ref('');
const clusters: Ref<any[]> = ref([]); // 修改类型定义以适应异步数据加载
const clusterModalVisible = ref(false);
const monitoringDialogVisible = ref(false);
const selectedCluster = ref<any>(null); // Ensure this is declared and initialized properly.
const modalData = ref({});
const modalTitle = ref('');
const listHeaderRef: Ref<InstanceType<typeof ListHeader> | null> = ref(null);
const selectedMonitoringPolicy = ref(''); // 确保已声明并初始化为空字符串或其他默认值
const startTime = ref('');
const endTime = ref('');

const pageSize = ref(10);
const currentPage = ref(1);

const newCluster = ref({ clusterCode: '', clusterName: '', address: '', clusterDesc: '', checkAddress: '' }); // 新增集群的数据模型

// 获取所有集群数据的函数
const fetchClusters = async () => {
    try {
        const response = await request.get('/dipper/monitor/api/v1/kafka/cluster/getAllCluster');
        console.log('获取集群信息成功:', JSON.stringify(response.data, null, 2));

        // 遍历每个集群并设置 monitoringEnabled 根据 clusterPolicy
        clusters.value = response.data.map(cluster => ({
            ...cluster,
            monitoringEnabled: cluster.clusterPolicy !== 'none'
        }));

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
  modalTitle.value = `集群详情 - ${cluster.clusterName}`;
  modalData.value = { ...cluster };
  clusterModalVisible.value = true;
}

// 这段代码定义了一个名为 editCluster 的函数，用于处理编辑 Kafka 集群的操作。它通过调用父组件（在这个例子中是 ListHeader 组件）的方法来显示一个编辑集群信息的模态框（modal）。
function editCluster(cluster: any) {
    console.log('index.vue - 尝试编辑集群:', JSON.stringify(cluster, null, 2));
    if (!cluster) {
        console.error('index.vue - 集群对象为 undefined');
        return;
    }
    // listHeaderRef.value：这是一个对 ListHeader 组件实例的引用。在 Vue 3 中，你可以使用 ref 来获取子组件的实例。这里假设你已经在模板中使用了 <ListHeader ref="listHeaderRef"></ListHeader> 来创建对 ListHeader 组件的引用。
    // listHeaderRef.value?.showEditClusterModal(cluster);：这里的 ?. 是可选链操作符，它确保只有当 listHeaderRef.value 不是 null 或 undefined 时才会尝试调用 showEditClusterModal 方法。如果 listHeaderRef.value 是 null 或 undefined，则整个表达式将短路返回 undefined 而不会抛出错误。
    // showEditClusterModal(cluster)：这是假设 ListHeader 组件中定义的一个方法，用来展示一个编辑集群信息的模态框。这个方法接收一个集群对象作为参数，以便在模态框中填充当前集群的信息进行编辑。
    listHeaderRef.value?.showEditClusterModal(cluster);
}

// 删除集群的逻辑
async function deleteCluster(cluster: any) {
  try {
    if (!cluster || !cluster.clusterCode) {
      console.error('无效的集群对象:', cluster);
      return;
    }

    // 弹出确认对话框，并设置 center 属性
    ElMessageBox.confirm(
      `确定要删除集群 ${cluster.clusterName} 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true, // 设置为 true 可以使内容居中
      }
    ).then(async () => {
      // 用户点击确定按钮后的逻辑
      const response = await request.post('/dipper/monitor/api/v1/kafka/cluster/deleteCluster',
                                         { clusterCode: cluster.clusterCode },
                                         {
                                           headers: {
                                             'Content-Type': 'application/json'
                                           }
                                         });

      console.log('集群删除成功:', response.data);

      // 刷新集群列表
      await fetchClusters();
    }).catch(() => {
      // 用户点击取消按钮后的逻辑
      console.log('删除操作已取消');
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error('集群删除失败:', error.message); // 打印错误消息
    } else {
      console.error('集群删除失败:', error); // 如果不是标准Error对象，直接打印
    }
  }
}

function updateMonitoring(cluster: any) {
  if (cluster.monitoringPolicy === 'now') {
    cluster.monitorStartTime = null;
    cluster.monitorEndTime = null;
  }
    }

    function handleStartDateChange(date: string | null) {
        startTime.value = date || '';
    }

    function handleEndDateChange(dates: { startDate: string | null, endDate: string }) {
        if (dates.startDate) {
            startTime.value = dates.startDate;
        }
        endTime.value = dates.endDate;
    }

async function handleMonitoringChange(cluster: any) {
  console.log('准备更新监控策略:', cluster);
  if (cluster.monitoringEnabled) {
    // 显示监控策略选择弹窗
    monitoringDialogVisible.value = true;
    selectedCluster.value = cluster;
  } else {
    // 取消监控策略
    await cancelMonitoring(cluster);
  }
}

function saveMonitoringSettings() {
    let policy = {
        clusterCode: selectedCluster.value.clusterCode,
        monitoringPolicy: selectedMonitoringPolicy.value,
        monitorStartTime: null,
        monitorEndTime: null,
    };

    if (selectedMonitoringPolicy.value === 'range') {
        // 如果策略是时间范围，则需要检查开始时间和结束时间是否已填写
        if (!startTime.value || !endTime.value) {
            alert('对于时间范围策略，请填写开始时间和结束时间');
            return;
        }

        // 格式化时间值为MySQL DATETIME格式
        const formattedStartTime = new Date(startTime.value).toISOString().slice(0, 19).replace('T', ' ');
        const formattedEndTime = new Date(endTime.value).toISOString().slice(0, 19).replace('T', ' ');

        policy = {
            clusterCode: selectedCluster.value.clusterCode,
            monitoringPolicy: selectedMonitoringPolicy.value,
            monitorStartTime: formattedStartTime,
            monitorEndTime: formattedEndTime,
        };
    }

    console.log('更新监控策略参数:', JSON.stringify(policy, null, 2));

    request.post('/dipper/monitor/api/v1/kafka/cluster/updateMonitoring', policy, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('监控策略更新成功:', response.data);
        fetchClusters();
        monitoringDialogVisible.value = false;
    })
        .catch(error => {
            console.error('监控策略更新失败:', error.message);
        });
}

async function cancelMonitoring(cluster: any) {
    try {
        let policy = {
            clusterCode: cluster.clusterCode, // 直接使用传入的 cluster 对象
            monitoringPolicy: 'none',
            monitorStartTime: null,
            monitorEndTime: null,
        };
        console.log('取消监控策略参数:', JSON.stringify(policy, null, 2));

        request.post('/dipper/monitor/api/v1/kafka/cluster/updateMonitoring', policy, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log('取消监控策略更新成功:', response.data);
            fetchClusters(); // 刷新集群列表
            monitoringDialogVisible.value = false; // 如果有打开的对话框，则关闭它
        }).catch(error => {
            console.error('取消监控策略更新失败:', error.message);
        });

        console.log('监控策略已取消:', cluster.clusterName);
    } catch (error) {
        console.error('取消监控策略失败:', error.message);
    }
    }

    // 格式化策略显示
    function formatPolicy(policy: string): string {
        if (policy === 'now') {
            return '从现在开始';
        } else if (policy === 'range') {
            return '时间范围';
        } else {
            return '无';
        }
    }

    // 格式化日期显示
    function formatDate(dateString: string | null): string {
        if (!dateString) {
            return '未设置';
        }
        const date = new Date(dateString);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
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
        <!-- 监听 update-clusters 事件 -->
        <ListHeader @update-clusters="fetchClusters" ref="listHeaderRef"></ListHeader>
        <choose-data :disableToday="true"
                     startPlaceholder="请选择开始时间"
                     endPlaceholder="请选择结束时间"
                     @startDateChange="handleStartDateChange"
                     @endDateChange="handleEndDateChange" />

        <!-- 集群列表 -->
        <el-table :data="paginatedClusters"
                  border
                  :header-cell-style="{ textAlign: 'center' }"
                  height="600">
            <el-table-column prop="id" label="集群ID" width="80" />
            <el-table-column prop="clusterCode" label="集群编码" width="120" />
            <el-table-column prop="clusterName" label="集群名称" width="150" />
            <el-table-column prop="clusterDesc" label="集群描述" width="200" />
            <el-table-column prop="address" label="集群地址" width="200" />
            <el-table-column prop="kafkaJmxAddress" label="集群jmx地址" width="200" />
            <el-table-column prop="kafkaJmxAddress" label="集群zk地址" width="200" />
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
                        <el-checkbox v-model="scope.row.monitoringEnabled"
                                     @change="handleMonitoringChange(scope.row)" />
                    </div>
                </template>
            </el-table-column>

            <!-- 新增：当前选择的策略 -->
            <el-table-column prop="clusterPolicy" label="当前策略" width="120">
                <template #default="scope">
                    <span>{{ formatPolicy(scope.row.clusterPolicy) }}</span>
                </template>
            </el-table-column>

            <!-- 新增：监控开始时间 -->
            <el-table-column prop="monitorStartTime" label="开始时间" width="180">
                <template #default="scope">
                    <span>{{ formatDate(scope.row.monitorStartTime) }}</span>
                </template>
            </el-table-column>

            <!-- 新增：监控结束时间 -->
            <el-table-column prop="monitorEndTime" label="结束时间" width="180">
                <template #default="scope">
                    <span>{{ formatDate(scope.row.monitorEndTime) }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="300" align="center">
                <template #default="scope">
                    <el-button type="text" size="small" @click.prevent="showDetails(scope.row)">详情</el-button>
                    <el-button type="text" size="small" @click.prevent="editCluster(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click.prevent="deleteCluster(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页组件 -->
        <el-pagination background
                       layout="prev, pager, next"
                       :total="filteredClusters.length"
                       :page-size="pageSize"
                       :current-page="currentPage"
                       @current-change="handlePageChange"
                       class="mt-4 flex justify-end" />

     
        <!-- 监控策略选择弹窗 -->
        <el-dialog v-model="monitoringDialogVisible" title="选择监控策略" width="30%">
            <el-form>
                <el-form-item label="监控策略">
                    <el-select v-model="selectedMonitoringPolicy" placeholder="请选择监控策略">
                        <el-option label="从现在开始" value="now" />
                        <el-option label="时间范围" value="range" />
                    </el-select>
                </el-form-item>
                <!-- 当选择了时间范围策略时，才显示 ChooseData 组件 -->
                <div v-if="selectedMonitoringPolicy === 'range'">
                    <choose-data :disableToday="true"
                                 startPlaceholder="请选择开始时间"
                                 endPlaceholder="请选择结束时间"
                                 @startDateChange="handleStartDateChange"
                                 @endDateChange="handleEndDateChange" />
                </div>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="monitoringDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="saveMonitoringSettings">保存</el-button>
                </span>
            </template>
        </el-dialog>

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
                    <el-button @click="closeModal">关闭</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.modal-body {
  font-size: 16px;
}

.modal-body p {
  margin: 5px 0;
}

.modal-body strong {
  display: inline-block;
  width: 120px; /* 设置固定宽度，使文本对齐 */
  font-weight: bold;
}

.el-dialog__header {
  background-color: #f0f2f5;
  padding: 15px;
  border-bottom: 1px solid #e8e8e8;
}

.el-dialog__title {
  font-size: 18px;
  font-weight: bold;
}

.dialog-footer .el-button {
  width: 100px;
  height: 40px;
  font-size: 16px;
}

::v-deep .el-message-box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

::v-deep .el-message-box__wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>