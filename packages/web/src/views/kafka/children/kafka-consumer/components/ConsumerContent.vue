<template>
  <div class="topicConsumerShow">
    <h2>展示组件</h2>
    <!-- 根据是否有数据决定显示的内容 -->
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="consumers.length > 0">
      <!-- 使用卡片布局展示消费者信息列表 -->
      <div v-for="(consumer, index) in consumers" :key="index" class="border rounded-md p-4 border-gray-200 mb-4">

        <div class="flex items-center gap-6 mb-2">
          <div class="flex items-center gap-1">
            <span class="text-gray-500">Topic名称：</span>
            <span>{{ consumer.topic }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">消费组：</span>
            <span>{{ consumer.groupId }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">业务属性：</span>
            <span>{{ consumer.businessProperty }}</span>
          </div>
        </div>

        <div class="flex items-center gap-1 mb-2">
          <div class="flex items-center gap-1">
            <span class="text-gray-500">平均消费速率：</span>
            <span>{{ consumer.avgConsumeRate }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">延迟lag：</span>
            <span>1000</span>
          </div>
          <div class="flex items-center gap-1">
              <span class="text-gray-500">延迟阈值：10分钟</span>
              <span>1000</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">是否延迟：</span>
            <span>{{ consumer.isDelayed ? '延迟' : '不延迟' }}</span>
          </div>
          <div class="flex items-center gap-1">
           <span class="text-gray-500">预计耗时：</span>
           <span>20分钟</span>
          </div>
        </div>

        <div class="flex items-center gap-1 mb-2">
          <div class="flex items-center gap-1">
            <span class="text-gray-500">最后更新时间：</span>
            <span>{{ consumer.lastUpdateTime }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">生命截止时间：</span>
            <span>{{ consumer.deadline }}</span>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <span class="text-gray-500">操作：</span>
          <div class="flex gap-2">
            <el-button type="text" size="small" @click="handleRealTimeQuery(consumer)">实时查询</el-button>
            <el-button type="text" size="small" @click="handleViewHistory(consumer)">查看历史</el-button>
            <el-button type="text" size="small" @click="handleToggleMonitor(consumer, true)">设置</el-button>
            <el-button type="text" size="small" @click="handleToggleMonitor(consumer, false)">删除</el-button>
          </div>
        </div>
      </div>
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
import { useDialog } from '@/components/dialog/useDialog.tsx'
import ConsumerGroupDetail from '@/views/kafka/children/kafka-topic/components/consumer-group-detail.vue'
import AddConsumer from '@/views/kafka/children/kafka-consumer/components/AddConsumer.vue'

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
   useDialog({
      title: '消费组查看',
      component: ConsumerGroupDetail,
      props: {},
    })
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