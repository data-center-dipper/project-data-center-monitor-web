<template>
  <div class="page-container">
    <ConsumerHeader @header-search="handleHeaderSearch"></ConsumerHeader>
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

const selectedTopics = ref([])
const selectedConsumerGroups = ref([])

function handleHeaderSearch(value: any) {
  selectedTopics.value = value.selectedTopics
  selectedConsumerGroups.value = value.selectedConsumerGroups
}
</script>
