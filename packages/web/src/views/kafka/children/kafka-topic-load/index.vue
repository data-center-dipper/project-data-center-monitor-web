<template>
  <div class="page-container" style="display: flex; flex-direction: column;">


    <!-- Topic JMX信息监控 -->
    <section class="topic-monitor-section">
      <h2 class="section-title">Topic JMX信息监控</h2>
      <hr />

      <!-- 选择 Topic -->
      <div style="margin-bottom: 20px;">
        <label for="topicSelect">选择 Topic:</label>
        <select id="topicSelect" v-model="selectedTopic" @change="loadTopicMetrics">
          <option value="">请选择一个 Topic</option>
          <option v-for="topic in topics" :value="topic.name" :key="topic.name">{{ topic.name }}</option>
        </select>
      </div>

      <!-- 展示选中 Topic 的指标信息 -->
      <div v-if="selectedTopicMetrics.length > 0" class="selected-topic-metrics" style="display: flex; flex-direction: column; gap: 10px;">
        <div v-for="metric in selectedTopicMetrics" :key="metric.title" class="metric-chart" style="border: 1px solid #ddd; padding: 10px; box-sizing: border-box;">
          <line-chart :data="metric.data" :title="metric.title"></line-chart>
        </div>
      </div>
      <div v-else style="text-align: center;">请选择一个 Topic 查看其监控信息。</div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import LineChart from './node/LineChart.vue'; // 假设有一个折线图组件

// 模拟的 Topic 数据
const topics = ref([
  { name: 'topic1' }, // 只定义了名称，其他信息将在选择时加载
  { name: 'topic2' }
]);

// 辅助函数生成随机数据用于图表
function generateRandomData(hours) {
  const now = new Date();
  return Array.from({ length: hours }, (_, i) => ({
    label: new Date(now - (hours - i - 1) * 3600 * 1000).toLocaleTimeString(),
    value: Math.floor(Math.random() * 100) + 1 // 随机值从1到100
  }));
}

// Topic 相关变量
const selectedTopic = ref('');
const selectedTopicMetrics = ref([]);

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
    { title: '消息入栈速率(Eps)/15min', data: generateRandomData(24) }
  ];

  selectedTopicMetrics.value = metrics;
}
</script>

<style scoped>
.page-container {
  font-family: Arial, sans-serif;
}

.topic-monitor-section {
  margin-bottom: 20px;
}

.section-title {
  margin-top: 0;
}



.selected-topic-metrics {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.metric-chart {
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