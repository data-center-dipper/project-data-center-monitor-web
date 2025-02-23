<template>
  <div class="page-container" style="display: flex; flex-direction: column">
    <!-- 节点监控 -->
    <section class="monitor-section" v-if="kafkaMonitors.length > 0">
      <h2 class="section-title">Kafka节点监控</h2>
      <hr />
      <div
        class="monitor-list"
        style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
        "
      >
        <div
          v-for="(monitor, index) in paginatedKafkaMonitors"
          :key="index"
          class="monitor-info"
          @click="showDetail(monitor)"
        >
          <p>
            主机域名：<router-link to="/details">{{
              monitor.hostDomain
            }}</router-link>
          </p>
          <p>
            内存: {{ monitor.memory }} 空闲：{{ monitor.freeMemory }} CPU负载:
            {{ monitor.cpuLoad }}
          </p>
          <ul>
            <li v-for="(metric, mIndex) in monitor.metrics" :key="mIndex">
              {{ metric.name }}: {{ metric.value }}
            </li>
          </ul>
        </div>
      </div>
      <!-- 分页控件 -->
      <pagination
        v-if="totalMonitorPages > 1"
        :current-page="currentMonitorPage"
        :total-pages="totalMonitorPages"
        @page-change="handleMonitorPageChange"
      />
    </section>

    <!-- 显示主题和主机总数 -->
    <div
      class="info-section"
      style="
        border: 1px solid #ddd;
        width: 600px;
        margin: 20px auto;
        text-align: center;
        padding: 10px;
      "
    >
      <span>主题: </span>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="搜索..."
        style="margin-right: 10px"
      />
      <span>主机总数: {{ kafkaMonitors.length }}</span>
    </div>

    <!-- 主机详情展示 -->
    <div
      class="selected-hosts-section"
      style="display: flex; flex-direction: column; gap: 10px"
    >
      <div
        v-for="host in selectedHosts"
        :key="host.hostDomain"
        class="host-details"
        style="border: 1px solid #ddd; padding: 10px; box-sizing: border-box"
      >
        <div>{{ host.hostDomain }} 基本信息</div>
        <div class="charts-grid">
          <div v-for="chart in charts" :key="chart.title" style="padding: 5px">
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

<script setup>
import { ref, computed } from 'vue'
import LineChart from './node/LineChart.vue' // 假设有一个折线图组件
// import Pagination from './components/Pagination.vue'; // 假设有分页组件

// 模拟数据
const kafkaMonitors = ref([
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
function generateRandomData(hours) {
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
function handleMonitorPageChange(page) {
  currentMonitorPage.value = page
}

// 展示详情（这里可以实现更多逻辑）
function showDetail(monitor) {
  if (
    !selectedHosts.value.some((host) => host.hostDomain === monitor.hostDomain)
  ) {
    selectedHosts.value.push(monitor)
  }
}

// 默认显示的主机详情信息
const selectedHosts = ref([])

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
.page-container {
  font-family: Arial, sans-serif;
}

.monitor-section {
  margin-bottom: 20px;
}

.section-title {
  margin-top: 0;
}

.monitor-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.monitor-info {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  box-sizing: border-box;
  cursor: pointer;
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
  width: 600px;
  margin: 20px auto;
  text-align: center;
  padding: 10px;
}

.selected-hosts-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.host-details {
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
}

.charts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr; /* 两列布局 */
  gap: 10px;
}
</style>
