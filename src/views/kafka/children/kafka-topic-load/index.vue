<template>
  <div class="page-container">
    <!-- 显示主题和消费者总数 -->
    <TopicLoadHeader @searchForm="handleSelectTopic"></TopicLoadHeader>
    <TopicLoadContent :selectedTopics="selectedTopics" :selectedConsumerGroups="selectedConsumerGroups"></TopicLoadContent>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import TopicLoadHeader from './components/TopicLoadHeader.vue';
import TopicLoadContent from './components/TopicLoadContent.vue';

// 当前选中的主题和消费组
const selectedTopics = ref('');
const selectedConsumerGroups = ref('');

// 处理从子组件A传来的主题选择事件
function handleSelectTopic(topicAndGroup) {
  selectedTopics.value = topicAndGroup.topics;
  // 注意：您可能还需要处理消费组的选择逻辑
  console.log('接受到子组件的传参，然后把数据传递给兄弟组件', topicAndGroup);
}
</script>