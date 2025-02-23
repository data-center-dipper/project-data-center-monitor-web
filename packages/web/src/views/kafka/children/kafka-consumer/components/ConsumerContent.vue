<template>
  <div class="topicConsumerShow">
    <h2>展示组件</h2>
    <!-- 根据是否有数据决定显示的内容 -->
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="consumers.length > 0">
      <!-- 使用卡片布局展示消费者信息列表 -->
      <ConsumerCard
        v-for="(consumer, index) in consumers"
        :key="index"
        :consumer="consumer"
        :handleRealTimeQuery="handleRealTimeQuery"
        :handleViewHistory="handleViewHistory"
        :handleToggleMonitor="handleToggleMonitor"
      />
      <el-button class="mt-4" style="width: 100%" @click="onAddItem()">增加消费组</el-button>
    </div>
    <div v-else>
      <p v-if="selectedTopic">请选择一个主题以查看相关内容。</p>
      <p v-else>没有选择任何主题。</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import ConsumerCard from './ConsumerCard.vue';

// 定义响应式变量用于状态管理
const loading = ref(false);
const error = ref(null);
const consumers = ref([]); // 初始化为空数组

// 接收父组件传递的选中主题
const props = defineProps({
  selectedTopic: String,
});

watch(() => props.selectedTopic, async (newTopic) => {
  if (newTopic) {
    await fetchItems(newTopic);
  }
}, { immediate: true }); // 立即执行一次监听器

async function fetchItems(topic) {
  loading.value = true;
  error.value = null;

  try {
    const mockData = {
      topic1: [
        {
          topic: 'Topic名称1',
          groupId: '消费组A1',
          businessProperty: '业务属性1',
          lastUpdateTime: new Date().toLocaleString(),
          deadline: '2025-01-01',
          isDelayed: true,
          avgConsumeRate: '100eps'
        },
        {
          topic: 'Topic名称1',
          groupId: '消费组A2',
          businessProperty: '业务属性2',
          lastUpdateTime: new Date().toLocaleString(),
          deadline: '2025-01-01',
          isDelayed: false,
          avgConsumeRate: '90eps'
        }
      ]
    };

    await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟1秒模拟网络请求

    if (mockData[topic]) {
      consumers.value = mockData[topic];
    } else {
      throw new Error('No data available for the selected topic.');
    }
  } catch (err) {
    error.value = err.message || 'Failed to fetch data.';
  } finally {
    loading.value = false;
  }
}

function handleRealTimeQuery(consumer) {
  console.log(`实时查询 ${consumer.topic} 的信息`);
  // 实现实时查询逻辑
}

function handleViewHistory(consumer) {
  console.log(`查看 ${consumer.topic} 的历史记录`);
  // 实现查看历史记录逻辑
}

function handleToggleMonitor(consumer, enable) {
  console.log(`${enable ? '开启' : '关闭'} ${consumer.topic} 的监控`);
  // 实现监控逻辑
}

function onAddItem() {
  console.log('添加新的消费组');
  // 实现增加消费组逻辑
}
</script>

<style scoped>
.topicConsumerShow {
  border-top: 1px solid #ccc;
  padding-top: 20px;
}
</style>