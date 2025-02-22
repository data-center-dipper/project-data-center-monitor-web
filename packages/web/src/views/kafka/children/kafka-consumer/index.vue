<template>
  <div class="page-container">
    <!-- 显示主题和消费者总数 -->
    <div class="info-section">
      <div class="info-box">
        <span>主题: </span>
        <input type="text" v-model="searchQuery" placeholder="搜索..." />
        <span>&nbsp;&nbsp;消费者总数: {{ consumerCount }}</span>
      </div>
    </div>

    <!-- 消费者信息列表 -->
    <div class="consumer-list">
      <div v-for="(consumer, index) in filteredConsumers" :key="index" class="consumer-item">
        <div class="consumer-header">
          <span>{{ consumer.topic }}</span>
          <span>{{ consumer.groupId }}</span>
          <span>{{ consumer.businessProperty }}</span>
          <span>{{ consumer.lastUpdateTime }}</span>
          <span>{{ consumer.deadline }}</span>
          <a href="#" @click.prevent="refresh(consumer)">刷新</a>
          <a href="#" @click.prevent="updateConsumer(consumer)">更新</a>
          <a href="#" @click.prevent="deleteConsumer(index)">删除</a>
        </div>
        <!-- 默认展开的消费者详情 -->
        <div class="consumer-details">
          <table class="details-table">
            <thead>
              <tr>
                <th>topic名称</th>
                <th>分区</th>
                <th>数据起点offset</th>
                <th>当前读取offset</th>
                <th>数据结尾offset</th>
                <th>延迟lag</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="detail in consumer.details" :key="detail.partition">
                <td>{{ detail.topicName }}</td>
                <td>{{ detail.partition }}</td>
                <td>{{ detail.startOffset }}</td>
                <td>{{ detail.currentOffset }}</td>
                <td>{{ detail.endOffset }}</td>
                <td>{{ detail.lag }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- 新增消费者按钮 -->
    <button @click="showAddModal" class="add-link">新增</button>

    <!-- 弹窗组件 -->
    <AddConsumer
      :show="isAddModalVisible"
      @close="toggleAddModal"
      @add="handleAddConsumer"
      :editMode="editMode"
      :modalData="modalData"
      @update="updateSelectedConsumer"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import AddConsumer from '@/views/kafka/children/kafka-consumer/AddConsumer.vue'; // 确保路径正确

// 模拟的消费者数据
const consumers = ref([
  {
    topic: 'topic1',
    groupId: 'group1',
    businessProperty: '属性A',
    lastUpdateTime: new Date().toLocaleString(),
    deadline: '2025-01-01',
    details: [
      { topicName: 'topic1', partition: 1, startOffset: 10001, currentOffset: 10002, endOffset: 10020, lag: 10 },
      { topicName: 'topic1', partition: 2, startOffset: 10001, currentOffset: 10002, endOffset: 10020, lag: 10 }
    ]
  },
  {
    topic: 'topic2',
    groupId: 'group2',
    businessProperty: '属性B',
    lastUpdateTime: new Date().toLocaleString(),
    deadline: '2025-02-01',
    details: [
      { topicName: 'topic2', partition: 1, startOffset: 20001, currentOffset: 20002, endOffset: 20020, lag: 8 },
      { topicName: 'topic2', partition: 2, startOffset: 20001, currentOffset: 20002, endOffset: 20020, lag: 8 }
    ]
  }
]);

// 搜索查询字符串
const searchQuery = ref('');

// 消费者总数
const consumerCount = computed(() => consumers.value.length);

// 过滤后的消费者列表
const filteredConsumers = computed(() => {
  return consumers.value.filter(consumer =>
    consumer.topic.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    consumer.groupId.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 刷新消费者信息
function refresh(consumer) {
  console.log(`刷新 ${consumer.topic} 的信息`);
}

// 更新消费者信息
function updateConsumer(consumer) {
  console.log('更新消费者信息');
}

// 删除消费者
function deleteConsumer(index) {
  consumers.value.splice(index, 1);
}

// 控制新增消费者弹窗的显示状态
const isAddModalVisible = ref(false);

// 切换弹窗显示状态
function toggleAddModal() {
  isAddModalVisible.value = !isAddModalVisible.value;
}

// 处理新增消费者的逻辑
function handleAddConsumer(consumerData) {
  console.log('新消费者数据:', consumerData);
  consumers.value.push({ ...consumerData, details: [] }); // 添加新消费者到列表
  toggleAddModal(); // 添加后关闭弹窗
}

// 模态框相关状态
const modalData = ref({ topic: '', groupId: '', businessProperty: '', deadline: '' });
const editMode = ref(false);
let editingIndex = null;

// 显示添加弹窗
function showAddModal() {
  editMode.value = false;
  modalData.value = { topic: '', groupId: '', businessProperty: '', deadline: '' };
  toggleAddModal();
}

// 更新选中的消费者
function updateSelectedConsumer(updatedData) {
  if (editingIndex !== null && editingIndex >= 0 && editingIndex < consumers.value.length) {
    consumers.value[editingIndex] = { ...updatedData };
  }
  toggleAddModal();
}
</script>

<style scoped>
/* 样式根据需要自行定义 */
</style>