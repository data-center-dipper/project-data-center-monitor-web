<template>
  <div class="page-container mt-3">
    <ConsumerHeader @header-search="handleHeaderSearch"></ConsumerHeader>
    <ConsumerAction @action-success="handleActionSuccess"></ConsumerAction>
    <ConsumerContent
      :selectedTopics="selectedTopics"
      :selectedConsumerGroups="selectedConsumerGroups"
    ></ConsumerContent>
    <qx-pagination
      :total="100"
      @qx-current-change="handleCurrentPageChange"
      @qx-size-change="handlePageSizeChange"
    ></qx-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ConsumerHeader from './components/consumer-header.vue'
import ConsumerContent from './components/consumer-content.vue'
import ConsumerAction from './components/consumer-action.vue'
import QxPagination from '@/components/pagination/src/index.vue'

const selectedTopics = ref([])
const selectedConsumerGroups = ref([])

function handleHeaderSearch(value: any) {
  selectedTopics.value = value.selectedTopics
  selectedConsumerGroups.value = value.selectedConsumerGroups
}

function handleActionSuccess() {}

function handleCurrentPageChange(currentPage: number) {
  console.log(currentPage)
}

function handlePageSizeChange(pageSize: number) {
  console.log(pageSize)
}
</script>
