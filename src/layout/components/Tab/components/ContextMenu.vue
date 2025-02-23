<template>
  <ul
    class="context-menu-container absolute z-50 bg-white rounded-md shadow-lg text-center border border-gray-200"
  >
    <li
      @click="onRefreshClick"
      class="p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
    >
      刷新
    </li>
    <li
      @click="onCloseRightClick"
      class="p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
    >
      关闭右侧
    </li>
    <li
      @click="onCloseOtherClick"
      class="p-2 cursor-pointer hover:bg-gray-100 border-b border-gray-200"
    >
      关闭其他
    </li>
    <li @click="onCloseAllClick" class="p-2 cursor-pointer hover:bg-gray-100">
      关闭全部
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/store/modules/tags'

const props = defineProps<{
  index: number
}>()

const router = useRouter()
const tagsStore = useTagsStore()

// 刷新当前页面
const onRefreshClick = () => {
  router.go(0)
}

// 关闭右侧标签
const onCloseRightClick = () => {
  tagsStore.closeRightTags(props.index)
}

// 关闭其他标签
const onCloseOtherClick = () => {
  tagsStore.closeOtherTags(props.index)
}

// 关闭所有标签
const onCloseAllClick = () => {
  tagsStore.closeAllTags()
  router.push('/dashboard')
}
</script>

<style scoped></style>
