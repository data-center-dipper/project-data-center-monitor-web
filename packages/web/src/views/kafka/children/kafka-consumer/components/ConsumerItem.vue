<template>
  <el-card class="consumer-item">
    <div slot="header" class="clearfix">
      <span>{{ consumer.topic }}</span>
      <span>{{ consumer.groupId }}</span>
      <span>{{ consumer.businessProperty }}</span>
      <span>{{ consumer.lastUpdateTime }}</span>
      <span>{{ consumer.deadline }}</span>
      <el-link type="primary" :underline="false" @click.prevent="refresh(consumer)">刷新</el-link>
      <el-link type="primary" :underline="false" @click.prevent="update(consumer)">更新</el-link>
      <el-link type="primary" :underline="false" @click.prevent="remove()">删除</el-link>
    </div>
    <!-- 默认展开的消费者详情 -->
    <div class="consumer-details">
      <el-table :data="consumer.details" style="width: 100%">
        <el-table-column prop="topicName" label="topic名称"></el-table-column>
        <el-table-column prop="partition" label="分区"></el-table-column>
        <el-table-column prop="startOffset" label="数据起点offset"></el-table-column>
        <el-table-column prop="currentOffset" label="当前读取offset"></el-table-column>
        <el-table-column prop="endOffset" label="数据结尾offset"></el-table-column>
        <el-table-column prop="lag" label="延迟lag"></el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  consumer: Object,
});

const emit = defineEmits(['refresh', 'update', 'delete']);

function refresh() {
  emit('refresh', props.consumer);
}

function update() {
  emit('update', props.consumer);
}

function remove() {
  emit('delete');
}
</script>

<style scoped>
.consumer-item {
  margin-bottom: 20px;
}

.clearfix {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.clearfix span {
  margin-right: 10px;
}

.el-link {
  margin-left: 10px;
}

.consumer-details {
  padding-top: 15px;
}
</style>