<template>
  <div class="info-section">
    <div class="info-box">
      <span>主题: </span>
      <input type="text" v-model="localSearchQuery" placeholder="搜索..." @input="handleSearch" />
      <span>&nbsp;&nbsp;消费者总数: {{ consumerCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  searchQuery: String,
  consumerCount: Number,
});

const emit = defineEmits(['update-search']);

const localSearchQuery = ref(props.searchQuery);

watch(localSearchQuery, newValue => {
  emit('update-search', newValue);
});

function handleSearch(event) {
  localSearchQuery.value = event.target.value;
}
</script>

<style scoped>
/* 样式根据需要自行定义 */
</style>