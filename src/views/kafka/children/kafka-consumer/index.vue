<template>
  <div class="page-container">
    <ConsumerHeader @searchForm="handleSelectTopic"></ConsumerHeader>
    <ConsumerContent
      :selectedTopics="selectedTopics"
      :selectedConsumerGroups="selectedConsumerGroups"
    ></ConsumerContent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConsumerHeader from './components/ConsumerHeader.vue'
import ConsumerContent from './components/ConsumerContent.vue'

// 当前选中的主题和消费组
const selectedTopics = ref('')
const selectedConsumerGroups = ref('')

// 处理从子组件A传来的主题选择事件
function handleSelectTopic(topicAndGroup) {
  selectedTopics.value = topicAndGroup.topics
  selectedConsumerGroups.value = topicAndGroup.consumerGroups
  console.log('接受到子组件的传参，然后把数据传递给兄弟组件', topicAndGroup)
}
</script>
