<script setup lang="ts">
import { useMessage, useMessageBox, useNotify } from '@/components/toast'
useMessage().info('我是普通提示！')

useMessageBox().success('我是成功提示！')

useNotify().success('我的成功消息')

useNotify().info('优先显示标题', {
  title: 'sdsdsds',
  message: 'dssddsds',
  type: 'warning',
})
</script>

<template>
  <div>工作台</div>
</template>

<style scoped></style>
