<script setup lang="ts">
import { ref } from 'vue';

// 示例数据
const kafkaStabilityData = ref([
  { id: '1-kafka-1', topicName: 'topicA', logSize: '24小时' },
  { id: '2-kafka-1', topicName: 'topicB', logSize: '14小时' },
  { id: '3-kafka-1', topicName: 'topicC', logSize: '8小时' }
]);

const zookeeperStabilityData = ref([
  { id: '1-zookeeper-1', topicName: 'topicX', logSize: '24小时' },
  { id: '2-zookeeper-1', topicName: 'topicY', logSize: '14小时' },
  { id: '3-zookeeper-1', topicName: 'topicZ', logSize: '8小时' }
]);

const handleCurrentPageChange = (page: number) => {
  console.log(page);
};

const handlePageSizeChange = (size: number) => {
  console.log(size);
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-center md:text-left">
        <span class="font-bold">TOPIC TOP 10 统计</span>
      </div>
    </template>
    <!-- 修改这里的grid布局 -->
    <div class="grid grid-cols-2 gap-4 p-4">

      <div class="border border-gray-200 p-6 rounded-lg shadow-md bg-white">
        <div class="border-b bg-gray-200/50 mb-2 p-3">
          <span class="text-gray-500">kafka log size top 10</span>
        </div>
        <div class="p-3">
          <el-table :data="kafkaStabilityData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="topicName" label="Topic Name" width="180"></el-table-column>
            <el-table-column prop="logSize" label="Log Size"></el-table-column>
          </el-table>
        </div>
      </div>

      <!-- topic 数据量写入或者读取top10 -->
      <div class="border border-gray-200 p-6 rounded-lg shadow-md bg-white">
        <div class="border-b bg-gray-200/50 mb-2 p-3">
          <span class="text-gray-500">topic数据量写入或者读取top10</span>
        </div>
        <div class="p-3">
          <el-table :data="zookeeperStabilityData" style="width: 100%">
            <el-table-column prop="id" label="ID" width="180"></el-table-column>
            <el-table-column prop="topicName" label="Topic Name" width="180"></el-table-column>
            <el-table-column prop="logSize" label="Log Size"></el-table-column>
          </el-table>
        </div>
      </div>

    </div>
  </el-card>
</template>

<style scoped>
/* 可根据需要添加额外样式 */
</style>