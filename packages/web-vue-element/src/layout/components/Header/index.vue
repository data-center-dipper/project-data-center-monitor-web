<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Crumbs from './components/crumbs.vue'
import { useCommonStore } from '@/store/modules/common.ts'

const commonStore = useCommonStore()
const { isCollapse } = storeToRefs(commonStore)

const handleCollapse  = () => {
  commonStore.toggleCollapse()
}
</script>

<template>
  <header class="flex justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
    <div class="flex items-center space-x-2">
      <iconpark-icon size="24" :name="isCollapse ? 'unfold' : 'fold'" @click="handleCollapse" class="cursor-pointer"></iconpark-icon>
      <Crumbs />
    </div>
    <div class="user-avatar flex items-center">
      <div class="avatar w-10 h-10 bg-blue-500 rounded-full"></div>
    </div>
  </header>
</template>

<style scoped>
</style>
