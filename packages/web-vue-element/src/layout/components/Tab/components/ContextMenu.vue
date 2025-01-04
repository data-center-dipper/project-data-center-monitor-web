<template>
  <ul class="context-menu-container">
    <li @click="onRefreshClick">刷新</li>
    <li @click="onCloseRightClick">关闭右侧</li>
    <li @click="onCloseOtherClick">关闭其他</li>
    <li @click="onCloseAllClick">关闭全部</li>
  </ul>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  index: number;
}>()

const router = useRouter()

// 刷新当前页面
const onRefreshClick = () => {
  router.go(0)
}

// 关闭右侧标签
const onCloseRightClick = () => {

}

// 关闭其他标签
const onCloseOtherClick = () => {

}

// 关闭所有标签
const onCloseAllClick = () => {
  router.push('/dashboard')
}
</script>

<style scoped>

</style>
