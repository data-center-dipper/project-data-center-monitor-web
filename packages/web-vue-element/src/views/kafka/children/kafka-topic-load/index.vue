<template>
  <div class="container mx-auto p-4">
    <!-- Topic JMX信息监控 -->
    <section class="topic-monitor-section mb-8">
      <h2 class="section-title text-xl font-bold">Topic JMX信息监控</h2>
      <hr class="my-2" />

      <!-- 选择 Topic -->
      <el-form-item label="选择 Topic" class="flex items-center gap-4 mb-4">
        <el-select v-model="selectedTopic" @change="loadTopicMetrics">
          <el-option
            v-for="topic in topics"
            :key="topic.name"
            :label="topic.name"
            :value="topic.name"
          />
        </el-select>
      </el-form-item>

      <!-- 展示选中 Topic 的指标信息 -->
      <div
        v-if="selectedTopicMetrics.length > 0"
        class="selected-topic-metrics grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
      >
        <div
          v-for="metric in selectedTopicMetrics"
          :key="metric.title"
          class="metric-chart p-4 border rounded shadow-md"
        >
          <line-chart :data="metric.data" :title="metric.title"></line-chart>
        </div>
      </div>
      <div v-else class="flex justify-center mt-[100px]">
        <el-empty description="请选择一个 Topic 查看其监控信息。" />
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import LineChart from '../kafka-host-load/node/LineChart.vue';

// 模拟的 Topic 数据
interface Topic {
  name: string;
}

const topics = ref<Topic[]>([
  { name: 'topic1' }, // 只定义了名称，其他信息将在选择时加载
  { name: 'topic2' },
]);

// 辅助函数生成随机数据用于图表
function generateRandomData(hours: number) {
  const now = new Date();
  return Array.from({ length: hours }, (_, i) => ({
    label: new Date(now - (hours - i - 1) * 3600 * 1000).toLocaleTimeString(),
    value: Math.floor(Math.random() * 100) + 1, // 随机值从1到100
  }));
}

// Topic 相关变量
const selectedTopic = ref<string>('');
const selectedTopicMetrics = ref<
  { title: string; data: { label: string; value: number }[] }[]
>([]);

// 加载 Topic 的指标信息
function loadTopicMetrics() {
  if (!selectedTopic.value) return;

  // 这里假设每个 topic 的 metrics 是静态定义的，实际应用中应该从服务器获取
  const metrics = [
    { title: '消息入栈速率(bytes)/1min', data: generateRandomData(24) },
    { title: '消息出栈速率(bytes)/1min', data: generateRandomData(24) },
    { title: '拉取失败率(Eps)/1min', data: generateRandomData(24) },
    { title: '发送消息失败率(Eps)/1min', data: generateRandomData(24) },
    { title: '消息入栈速率(Eps)/1min', data: generateRandomData(24) },
    { title: '消息出栈速率(Eps)/1min', data: generateRandomData(24) },
    { title: '消息入栈速率(Eps)/15min', data: generateRandomData(24) },
  ];

  selectedTopicMetrics.value = metrics;
}
</script>

<style scoped>
:deep(.el-select) {
  --el-select-width: 200px;
}
.topic-monitor-section {
  margin-bottom: 20px;
}

.section-title {
  margin-top: 0;
}

.selected-topic-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
}

.metric-chart {
  border: 1px solid #ddd;
  padding: 10px;
  box-sizing: border-box;
}
</style>
