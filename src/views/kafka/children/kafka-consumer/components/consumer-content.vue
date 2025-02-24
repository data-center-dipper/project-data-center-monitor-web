<template>
  <ConsumerDetail
    v-for="(consumer, index) in consumers"
    :key="index"
    :consumer="consumer"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ConsumerDetail from './consumer-detail.vue'

const props = defineProps<{
  selectedTopics: string
  selectedConsumerGroups: string
}>()

const consumers = ref<any[]>([
  {
    topic: 'Topic名称1',
    groupId: '消费组A1',
    businessProperty: '业务属性1',
    lastUpdateTime: new Date().toLocaleString(),
    deadline: '2025-01-01',
    isDelayed: true,
    avgConsumeRate: '100eps',
  },
  {
    topic: 'Topic名称1',
    groupId: '消费组A1',
    businessProperty: '业务属性1',
    lastUpdateTime: new Date().toLocaleString(),
    deadline: '2025-01-01',
    isDelayed: true,
    avgConsumeRate: '100eps',
  },
  {
    topic: 'Topic名称1',
    groupId: '消费组A1',
    businessProperty: '业务属性1',
    lastUpdateTime: new Date().toLocaleString(),
    deadline: '2025-01-01',
    isDelayed: true,
    avgConsumeRate: '100eps',
  },
])

watch(
  () => [props.selectedTopics, props.selectedConsumerGroups],
  async ([newTopic, newGroup]) => {},
  { immediate: true },
)
</script>

<style scoped></style>
