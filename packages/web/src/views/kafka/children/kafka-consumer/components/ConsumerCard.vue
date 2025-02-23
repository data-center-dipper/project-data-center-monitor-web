<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
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
      </div>
    </template>

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

    <template #footer>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">操作：</span>
        <div class="flex gap-2">
          <el-button type="text" size="small" @click="handleRealTimeQuery(consumer)">实时查询</el-button>
          <el-button type="text" size="small" @click="handleViewHistory(consumer)">查看历史</el-button>
          <el-button type="text" size="small" @click="handleToggleMonitor(consumer, true)">设置</el-button>
          <el-button type="text" size="small" @click="handleToggleMonitor(consumer, false)">删除</el-button>
        </div>
      </div>
    </template>
  </el-card>
</template>

<script setup>
import { defineProps } from 'vue';
import { useDialog } from '@/components/dialog/useDialog.tsx'
import ConsumerGroupDetail from '@/views/kafka/children/kafka-topic/components/consumer-group-detail.vue'

const props = defineProps({
  consumer: Object,
  handleRealTimeQuery: Function,
  handleViewHistory: Function,
  handleToggleMonitor: Function,
});
</script>

<style scoped>
.box-card {
  margin-bottom: 10px;
}
</style>