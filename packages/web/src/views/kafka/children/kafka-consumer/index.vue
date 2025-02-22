<template>
  <div class="page-container">
    <!-- 显示主题和消费者总数 -->
    <ConsumerHeader @select-topic="handleSelectTopic"></ConsumerHeader>
    <ConsumerContent :selected-topic="selectedTopic"></ConsumerContent>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ConsumerHeader from './components/ConsumerHeader.vue';
import ConsumerContent from './components/ConsumerContent.vue';


// 当前选中的主题
const selectedTopic = ref('');

// 处理从子组件A传来的主题选择事件
function handleSelectTopic(topic) {
  selectedTopic.value = topic;
  console.log('接受道子组件的传参，然后把数据传递给兄弟组件' ,topic);
}

</script>

<style scoped>
/* 样式根据需要自行定义 */
</style>