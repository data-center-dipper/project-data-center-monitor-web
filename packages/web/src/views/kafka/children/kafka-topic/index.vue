<script setup lang="ts">
import TopicHeader from './components/topic-header.vue'
import TopicItem from './components/topic-item.vue'
import { DialogList } from '@/components/dialog/useDialog.tsx'

const handleCurrentPageChange = (page: number) => {
  console.log(page)
}

const handlePageSizeChange = (size: number) => {
  console.log(size)
}
</script>

<template>
  <el-card>
    <TopicHeader></TopicHeader>
    <div class="flex flex-col gap-2">
      <template v-for="i in 3">
        <TopicItem></TopicItem>
      </template>
    </div>
    <qx-pagination
      layout="prev, pager, next"
      :total="50"
      background
      @qx-current-change="handleCurrentPageChange"
      @qx-size-change="handlePageSizeChange"
    ></qx-pagination>
    <component v-for="(modal, index) in DialogList" :is="modal" :key="index" />
  </el-card>
</template>

<style scoped></style>
