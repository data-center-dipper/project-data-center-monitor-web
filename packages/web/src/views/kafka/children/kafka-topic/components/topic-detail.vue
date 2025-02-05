<script setup lang="ts">
import { ref } from 'vue'

const tableOptions = ref([
  { label: '入流速率(bytes)/1min', prop: 'inputRate' },
  { label: '出流速率(bytes)/1min', prop: 'outputRate' },
  { label: '排流量虚拟速率(EPS)/1min', prop: 'evaporationRate1' },
  { label: '满入入流速率(EPS)/1min', prop: 'fullInputRate1' },
  { label: '满入入流速率(EPS)/5min', prop: 'fullInputRate5' },
  { label: '满入入流速率(EPS)/15min', prop: 'fullInputRate15' },
])

const tableData = ref([
  {
    inputRate: '0.00MB',
    outputRate: '0.00MB',
    evaporationRate1: '0.0',
    fullInputRate1: '0.00',
    fullInputRate5: '0.00',
    fullInputRate15: '0.00',
  },
])
</script>

<template>
  <div class="border rounded-md p-4 border-gray-200">
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-1">
        <span class="text-gray-500">topic名称：</span>
        <span>com.dbapp.topic.rawevent</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">类型：</span>
        <span>内置</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">分区数：</span>
        <span>12</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">副本数：</span>
        <span>1</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">平均数据大小：</span>
        <span>133.91B</span>
      </div>
      <div class="flex items-center gap-1">
        <span class="text-gray-500">数据大小：</span>
        <span>2.88KB</span>
      </div>
    </div>
    <div class="mt-4">
      <qx-table
        border
        :options="tableOptions"
        :data="tableData"
        :pagination="false"
        :isLoading="false"
      />
    </div>
    <div class="flex items-center gap-1">
      <span class="text-gray-500">分区状态：</span>
      <span class="text-green-500">正常</span>
    </div>
    <div class="flex items-center gap-1">
      <div class="text-gray-500">操作：</div>
      <div class="flex gap-2">
        <el-button type="text">查看详情</el-button>
        <el-button type="text">消费组查看</el-button>
        <el-button type="text">数据预览</el-button>
        <el-button type="text">重建topic</el-button>
        <el-button type="text">分区扩容</el-button>
        <el-button type="text">生成数据</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
