<template>
  <div class="container mx-auto p-4">
    <!-- 节点监控 -->
    <section v-if="kafkaMonitors.length > 0" class="monitor-section mb-4">
      <h2 class="section-title text-xl font-bold">Kafka节点监控</h2>
      <hr class="my-2" />
      <div
        class="monitor-list grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
      >
        <div
          v-for="(monitor, index) in paginatedKafkaMonitors"
          :key="index"
          class="monitor-info p-4 border rounded cursor-pointer hover:bg-gray-50"
          @click="showDetail(monitor)"
        >
          <p>
            主机域名：<router-link to="/details" class="text-blue-600">{{
              monitor.hostDomain
            }}</router-link>
          </p>
          <p>
            内存: {{ monitor.memory }} 空闲：{{ monitor.freeMemory }} CPU负载:
            {{ monitor.cpuLoad }}
          </p>
          <ul class="list-inside list-disc">
            <li v-for="(metric, mIndex) in monitor.metrics" :key="mIndex">
              {{ metric.name }}: {{ metric.value }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 分页控件 -->
      <el-pagination
        v-if="totalMonitorPages > 1"
        layout="prev, pager, next"
        :current-page="currentMonitorPage"
        :page-size="monitorsPerPage"
        :total="kafkaMonitors.length"
        @current-change="handleMonitorPageChange"
        class="mt-4 justify-center flex"
      />
    </section>

    <!-- 显示主题和主机总数 -->
    <div
      class="info-section border p-4 rounded-lg shadow-md w-full max-w-md mx-auto text-center"
    >
      <span>主题: </span>
      <el-input
        v-model="searchQuery"
        placeholder="搜索..."
        class="w-64 my-2 inline-block"
      ></el-input>
      <span>主机总数: {{ kafkaMonitors.length }}</span>
    </div>

    <!-- 主机详情展示 -->
    <div class="selected-hosts-section space-y-4">
      <div
        v-for="host in selectedHosts"
        :key="host.hostDomain"
        class="host-details p-4 border rounded-lg shadow-md"
      >
        <div>{{ host.hostDomain }} 基本信息</div>
        <div class="charts-grid grid gap-4 grid-cols-2 mt-4">
          <div v-for="chart in charts" :key="chart.title" class="p-2">
            <line-chart
              :data="host[chart.dataKey]"
              :title="chart.title"
            ></line-chart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElInput, ElPagination } from 'element-plus'
import LineChart from '../../../../components/charts/line-chart.vue' // 假设有一个折线图组件

// 模拟数据
interface Monitor {
  hostDomain: string
  memory: string
  freeMemory: string
  cpuLoad: string
  metrics: Array<{ name: string; value: string }>
  loadData: { label: string; value: number }[]
  cpuUsage: { label: string; value: number }[]
  ioWrite: { label: string; value: number }[]
  networkTraffic: { label: string; value: number }[]
  diskWrite: { label: string; value: number }[]
  diskRead: { label: string; value: number }[]
}

const kafkaMonitors = ref<Monitor[]>([
  {
    hostDomain: 'host1.example.com',
    memory: '8GB',
    freeMemory: '2GB',
    cpuLoad: '75%',
    metrics: [
      { name: 'Total Requests', value: '1000' },
      { name: 'Error Rate', value: '0.5%' },
    ],
    loadData: generateRandomData(24),
    cpuUsage: generateRandomData(24),
    ioWrite: generateRandomData(24),
    networkTraffic: generateRandomData(24),
    diskWrite: generateRandomData(24),
    diskRead: generateRandomData(24),
  },
  {
    hostDomain: 'host2.example.com',
    memory: '16GB',
    freeMemory: '4GB',
    cpuLoad: '30%',
    metrics: [
      { name: 'Total Requests', value: '2000' },
      { name: 'Error Rate', value: '0.2%' },
    ],
    loadData: generateRandomData(24),
    cpuUsage: generateRandomData(24),
    ioWrite: generateRandomData(24),
    networkTraffic: generateRandomData(24),
    diskWrite: generateRandomData(24),
    diskRead: generateRandomData(24),
  },
])

// 辅助函数生成随机数据用于图表
function generateRandomData(hours: number) {
  const now = new Date()
  return Array.from({ length: hours }, (_, i) => ({
    label: new Date(now - (hours - i - 1) * 3600 * 1000).toLocaleTimeString(),
    value: Math.floor(Math.random() * 100) + 1, // 随机值从1到100
  }))
}

// 搜索查询字符串
const searchQuery = ref('')

// 分页相关变量
const currentMonitorPage = ref(1)
const monitorsPerPage = 10
const totalMonitorPages = computed(() =>
  Math.ceil(kafkaMonitors.value.length / monitorsPerPage),
)

// 计算分页后的 Kafka 监控列表
const paginatedKafkaMonitors = computed(() => {
  const start = (currentMonitorPage.value - 1) * monitorsPerPage
  const end = start + monitorsPerPage
  return kafkaMonitors.value.slice(start, end)
})

// 处理分页改变
function handleMonitorPageChange(page: number) {
  currentMonitorPage.value = page
}

// 展示详情（这里可以实现更多逻辑）
function showDetail(monitor: Monitor) {
  if (
    !selectedHosts.value.some((host) => host.hostDomain === monitor.hostDomain)
  ) {
    selectedHosts.value.push(monitor)
  }
}

// 默认显示的主机详情信息
const selectedHosts = ref<Monitor[]>([])

// 折线图配置
const charts = [
  { title: '主机负载', dataKey: 'loadData' },
  { title: 'CPU 使用率', dataKey: 'cpuUsage' },
  { title: 'IO 写入', dataKey: 'ioWrite' },
  { title: '网络流量', dataKey: 'networkTraffic' },
  { title: '磁盘写入', dataKey: 'diskWrite' },
  { title: '磁盘读取', dataKey: 'diskRead' },
]
</script>

<style scoped>
.monitor-section {
  margin-bottom: 20px;
}

.section-title {
  margin-top: 0;
}

.monitor-info:hover {
  background-color: #f9f9f9;
}

.monitor-info p {
  margin: 0;
}

.monitor-info ul {
  list-style-type: none;
  padding: 0;
}

.monitor-info li {
  margin: 5px 0;
}

.info-section {
  border: 1px solid #ddd;
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  text-align: center;
  padding: 10px;
}

.selected-hosts-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  gap: 10px;
}
</style>
