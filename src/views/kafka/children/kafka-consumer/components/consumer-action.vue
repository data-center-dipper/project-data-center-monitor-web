<script lang="ts" setup>
import { useDialog } from '@/components/dialog/useDialog.tsx'
import ConsumerGroupDetail from './consumer-group-add.vue'

defineEmits(['action-success'])

function handleAddGroup() {
  useDialog({
    title: '添加新的消费组',
    component: ConsumerGroupDetail,
    props: {},
  })
}
</script>

<template>
  <div class="w-full py-2 flex justify-end">
    <el-button @click="handleAddGroup">新增消费组</el-button>
  </div>
</template>

<style></style>
