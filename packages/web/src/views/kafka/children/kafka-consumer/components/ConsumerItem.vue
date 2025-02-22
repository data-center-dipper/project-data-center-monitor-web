<template>
  <div class="consumer-item">
    <div class="consumer-header">
      <span>{{ consumer.topic }}</span>
      <span>{{ consumer.groupId }}</span>
      <span>{{ consumer.businessProperty }}</span>
      <span>{{ consumer.lastUpdateTime }}</span>
      <span>{{ consumer.deadline }}</span>
      <a href="#" @click.prevent="refresh(consumer)">刷新</a>
      <a href="#" @click.prevent="update(consumer)">更新</a>
      <a href="#" @click.prevent="remove()">删除</a>
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
</template>

<script setup>
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
/* 样式根据需要自行定义 */
</style>