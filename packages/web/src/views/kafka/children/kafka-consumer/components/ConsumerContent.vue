<template>
  <div class="topicConsumerShow">
    <h2>子组件B</h2>
    <!-- 根据是否有数据决定显示的内容 -->
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else-if="consumers.length > 0">
      <!-- 消费者信息列表 -->
      <div class="consumer-list">
        <ConsumerItem
          v-for="(consumer, index) in consumers"
          :key="index"
          :consumer="consumer"
          @refresh="refresh"
          @update="updateConsumer"
          @delete="deleteConsumer(index)"
        ></ConsumerItem>
      </div>
    </div>
    <div v-else>
      <p v-if="selectedTopic">请选择一个主题以查看相关内容。</p>
      <p v-else>没有选择任何主题。</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue';
import ConsumerItem from './ConsumerItem.vue'; // 导入 ConsumerItem 组件

// 接收父组件传递的选中主题
const props = defineProps({
  selectedTopic: String,
});

// 定义响应式变量用于状态管理
const loading = ref(false);
const error = ref(null);
const consumers = ref([]); // 改为存储消费者信息列表

// 监听 selectedTopic 变化
watch(() => props.selectedTopic, (newTopic) => {
  console.log('接收到的主题:', newTopic); // 打印接收到的主题

  if (newTopic) {
    fetchItems(newTopic).then(() => {
      console.log('获取到的数据:', consumers.value); // 打印获取到的数据
    });
  }
}, { immediate: true }); // 立即执行一次监听器

// 模拟接口调用函数
async function fetchItems(topic) {
  loading.value = true;
  error.value = null;
  consumers.value = [];

  try {
    // 这里可以替换为实际的异步请求
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
          ]
        }
      ],
      topic2: [
        {
          topic: 'Topic名称2',
          groupId: '消费组A2',
          businessProperty: '业务属性2',
          lastUpdateTime: new Date().toLocaleString(),
          deadline: '2025-02-01',
          details: [
            { topicName: 'topic2', partition: 1, startOffset: 20001, currentOffset: 20002, endOffset: 20020, lag: 8 },
            { topicName: 'topic2', partition: 2, startOffset: 20001, currentOffset: 20002, endOffset: 20020, lag: 8 }
          ]
        }
      ],
      topic3: [
        {
          topic: 'Topic名称3',
          groupId: '消费组A3',
          businessProperty: '业务属性3',
          lastUpdateTime: new Date().toLocaleString(),
          deadline: '2025-03-01',
          details: [
            { topicName: 'topic3', partition: 1, startOffset: 30001, currentOffset: 30002, endOffset: 30020, lag: 6 },
            { topicName: 'topic3', partition: 2, startOffset: 30001, currentOffset: 30002, endOffset: 30020, lag: 6 }
          ]
        }
      ]
    };

    // 延迟1秒以模拟网络请求
    await new Promise(resolve => setTimeout(resolve, 1000));

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

function refresh(consumer) {
  console.log(`刷新 ${consumer.topic} 的信息`);
}

function updateConsumer(consumer) {
  console.log(`更新 ${consumer.topic} 的信息`);
}

function deleteConsumer(index) {
  consumers.value.splice(index, 1);
}
</script>

<style scoped>
.topicConsumerShow {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  background-color: pink;
}
</style>