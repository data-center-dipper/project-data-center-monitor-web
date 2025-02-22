<template>
  <div class="topicConsumerShow">
    <h2>展示组件</h2>
    <!-- 根据是否有数据决定显示的内容 -->
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="consumers.length > 0">
      <!-- 消费者信息列表 -->
      <el-table :data="consumers" style="width: 100%">
        <el-table-column prop="topic" label="Topic名称"></el-table-column>
        <el-table-column prop="groupId" label="消费组"></el-table-column>
        <el-table-column prop="businessProperty" label="业务属性"></el-table-column>
        <el-table-column prop="avgConsumeRate" label="平均消费速率"></el-table-column>
        <el-table-column prop="isDelayed" label="是否延迟">
          <template #default="scope">
            {{ scope.row.isDelayed ? '延迟' : '不延迟' }}
          </template>
        </el-table-column>
        <el-table-column prop="lastUpdateTime" label="最后更新时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="scope">
            <el-button link  type="primary" size="small" @click="handleRealTimeQuery(scope.row)">实时查询</el-button>
            <el-button link type="primary" size="small" @click="handleViewHistory(scope.row)">查看历史</el-button>
            <el-button link type="primary" size="small" @click="handleToggleMonitor(scope.row, true)">开启监控</el-button>
            <el-button link type="primary" size="small" @click="handleToggleMonitor(scope.row, false)">关闭监控</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="mt-4" style="width: 100%" @click="onAddItem">增加消费组</el-button>
    </div>
    <div v-else>
      <p v-if="selectedTopic">请选择一个主题以查看相关内容。</p>
      <p v-else>没有选择任何主题。</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import ConsumerGroupDetail from '@/views/kafka/children/kafka-topic/components/consumer-group-detail.vue'
import { useDialog } from '@/components/dialog/useDialog.tsx'

// 接收父组件传递的选中主题
const props = defineProps({
  selectedTopic: String,
});

// 定义响应式变量用于状态管理
const loading = ref(false);
const error = ref(null);
const consumers = ref([]); // 改为存储消费者信息列表

watch(() => props.selectedTopic, async (newTopic) => {
  console.log('接收到的主题:', newTopic); // 打印接收到的主题

  if (newTopic) {
    await fetchItems(newTopic);
    console.log('获取到的数据:', consumers.value); // 打印获取到的数据
  }
}, { immediate: true }); // 立即执行一次监听器

async function fetchItems(topic) {
  loading.value = true;
  error.value = null;
  consumers.value = [];

  try {
    const mockData = {
      topic1: [
        {
          topic: 'Topic名称1',
          groupId: '消费组A1',
          businessProperty: '业务属性1',
          lastUpdateTime: new Date().toLocaleString(),
          deadline: '2025-01-01',
          details: [
            { topicName: 'topic1', partition: 1, startOffset: 10001, currentOffset: 10002, endOffset: 10020, lag: 10 },
            { topicName: 'topic1', partition: 2, startOffset: 10001, currentOffset: 10002, endOffset: 10020, lag: 10 }
          ],
          isDelayed: true,
          avgConsumeRate: '100eps'
        },
        {
          topic: 'Topic名称1',
          groupId: '消费组A2',
          businessProperty: '业务属性2',
          lastUpdateTime: new Date().toLocaleString(),
          deadline: '2025-01-01',
          details: [
            { topicName: 'topic1', partition: 1, startOffset: 10001, currentOffset: 10002, endOffset: 10020, lag: 10 },
            { topicName: 'topic1', partition: 2, startOffset: 10001, currentOffset: 10002, endOffset: 10020, lag: 10 }
          ],
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
</script>

<style scoped>
.topicConsumerShow {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  background-color: pink;
}
</style>