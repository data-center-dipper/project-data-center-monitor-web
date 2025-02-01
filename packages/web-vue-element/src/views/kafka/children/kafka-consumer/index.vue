<template>
  <div class="container mx-auto p-4">
    <!-- 显示主题和消费者总数 -->
    <div class="info-section flex items-center space-x-4 mb-4">
      <span>主题:</span>
      <el-input v-model="searchQuery" placeholder="搜索..." class="w-64"></el-input>
      <span>&nbsp;&nbsp;消费者总数: {{ consumerCount }}</span>
    </div>

    <!-- 消费者信息列表 -->
    <div class="consumer-list">
      <div v-for="(consumer, index) in filteredConsumers" :key="index" class="consumer-item bg-white p-4 rounded shadow mb-4">
        <div class="consumer-header cursor-pointer flex justify-between items-center" @click="toggleDetails(index)">
          <div class="flex-grow">
            <span>{{ consumer.topic }}</span>
            <span>{{ consumer.groupId }}</span>
            <span>{{ consumer.businessProperty }}</span>
            <span>{{ consumer.lastUpdateTime }}</span>
            <span>{{ consumer.deadline }}</span>
          </div>
          <div>
            <el-button type="text" @click.stop="refresh(consumer)">刷新</el-button>
            <el-button type="text" @click.stop="updateConsumer(consumer)">更新</el-button>
            <el-button type="text" @click.stop="deleteConsumer(index)">删除</el-button>
          </div>
        </div>
        <transition name="fade">
          <div v-if="expandedIndexes[index]" class="consumer-details mt-2">
            <el-table :data="consumer.details" style="width: 100%">
              <el-table-column prop="topicName" label="topic名称"></el-table-column>
              <el-table-column prop="partition" label="分区"></el-table-column>
              <el-table-column prop="startOffset" label="数据起点offset"></el-table-column>
              <el-table-column prop="currentOffset" label="当前读取offset"></el-table-column>
              <el-table-column prop="endOffset" label="数据结尾offset"></el-table-column>
              <el-table-column prop="lag" label="延迟lag"></el-table-column>
            </el-table>
            <a href="#" @click.prevent="collapseDetail(index)" class="block mt-2 text-blue-500 hover:underline">收起</a>
          </div>
        </transition>
      </div>
    </div>

    <!-- 新增消费者按钮 -->
    <el-button type="primary" @click="showAddModal" class="add-link">新增</el-button>

    <!-- 弹窗组件 -->
    <el-dialog :visible.sync="isAddModalVisible" title="新增消费者" width="30%">
      <AddConsumer
        :editMode="editMode"
        :modalData="modalData"
        @close="toggleAddModal"
        @add="handleAddConsumer"
        @update="updateSelectedConsumer"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { ElInput, ElButton, ElTable, ElTableColumn, ElDialog } from 'element-plus';
import AddConsumer from './consumer/AddConsumer.vue'; // 确保路径正确

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

// 使用对象跟踪每个条目是否展开
const expandedIndexes = ref({});

// 展开或收起详情
function toggleDetails(index) {
  if (!expandedIndexes.value[index]) {
    expandedIndexes.value = { ...expandedIndexes.value, [index]: true };
  }
}

// 收起详情
function collapseDetail(index) {
  expandedIndexes.value = { ...expandedIndexes.value, [index]: false };
}

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
.consumer-header span {
  @apply mr-4;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>