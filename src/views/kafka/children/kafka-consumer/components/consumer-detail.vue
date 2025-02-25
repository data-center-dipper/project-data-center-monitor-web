<template>
  <qx-card class="mb-4" shadow="never">
    <template #header>
      <div class="card-header">
        <div class="flex items-center gap-6 mb-2">
          <div class="flex items-center gap-1">
            <span class="text-gray-500">Topic名称：</span>
            <span>{{ consumer.topic }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">消费组：</span>
            <span>{{ consumer.groupId }}</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">监控状态：</span>
            <span class="text-green-500">监控中</span>
          </div>
          <div class="flex items-center gap-1">
            <span class="text-gray-500">业务属性：</span>
            <span>{{ consumer.businessProperty }}</span>
          </div>
        </div>
      </div>
    </template>
    <div class="flex items-center gap-1 mb-2">
      <div class="flex items-center gap-1">
        <span class="text-gray-500">平均消费速率：</span>
        <span>{{ consumer.avgConsumeRate }}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">延迟lag：</span>
        <span>1000</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">延迟阈值：10分钟</span>
        <span>1000</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">是否延迟：</span>
        <span>{{ consumer.isDelayed ? '延迟' : '不延迟' }}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">预计耗时：</span>
        <span>20分钟</span>
      </div>
    </div>
    <div class="flex items-center gap-1 mb-2">
      <div class="flex items-center gap-1">
        <span class="text-gray-500">最后更新时间：</span>
        <span>{{ consumer.lastUpdateTime }}</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">生命截止时间：</span>
        <span>{{ consumer.deadline }}</span>
      </div>
    </div>
    <template #footer>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">操作：</span>
        <div class="flex">
          <el-button
            v-for="action in actions"
            :key="action.name"
            type="text"
            @click="action.handler(consumer)"
            >{{ action.label }}</el-button
          >
        </div>
      </div>
    </template>
  </qx-card>
</template>

<script setup lang="ts">
import { useDialog } from '@/components/dialog/useDialog.tsx'
import ConsumerGroupDetail from './consumer-group-detail.vue'
import ConsumerGroupHistory from './consumer-group-history.vue'
import ConsumerGroupSetting from './consumer-group-setting.vue'

interface Consumer {
  topic: string
  groupId: string
  businessProperty: string
  avgConsumeRate: number
  isDelayed: boolean
  lastUpdateTime: string
  deadline: string
}

const props = defineProps<{
  consumer: Consumer
  handleRealTimeQuery: (consumer: Consumer) => void
  handleViewHistory: (consumer: Consumer) => void
  handleToggleMonitor: (consumer: Consumer, flag: boolean) => void
}>()

const actions = [
  {
    name: 'realTimeQuery',
    label: '实时查询',
    handler: handleRealTimeQuery,
  },
  {
    name: 'viewHistory',
    label: '查看历史',
    handler: handleViewHistory,
  },
  {
    name: 'toggleSetting',
    label: '设置',
    handler: handleToggleSetting,
  },
  {
    name: 'deleteMonitor',
    label: '删除',
    handler: (consumer) => handleToggleMonitor(consumer, false),
  },
]

function handleRealTimeQuery(consumer) {
  useDialog({
    title: '消费组查看',
    component: ConsumerGroupDetail,
    props: {},
  })
}

function handleViewHistory(consumer) {
  useDialog({
    title: '消费组历史查看',
    component: ConsumerGroupHistory,
    props: {},
  })
}

function handleToggleSetting() {
  useDialog({
    title: '消费组设置',
    component: ConsumerGroupSetting,
    props: {
      onSettingSuccess: () => {
        console.log('保存设置')
      },
    },
  })
}

function handleToggleMonitor(consumer, isMonitor) {
  console.log(`设置 ${consumer.topic} 的监控状态为 ${isMonitor}`)
}
</script>

<style scoped></style>
