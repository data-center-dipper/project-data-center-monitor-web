<script setup lang="ts">
import { ref } from 'vue'
import QxTable from '@/components/table/src/index.vue'
import QxCard from '@/components/Card/src/index.vue'

// 表格配置
const tableOptions = ref([
  { label: 'JVM', prop: 'name', align: 'center', width: 180 },
  { label: '1分钟', prop: 'minute1', align: 'center' },
  { label: '5分钟', prop: 'minute5', align: 'center' },
  { label: '15分钟', prop: 'minute15', align: 'center' },
  { label: '平均', prop: 'average', align: 'center' },
])

// 表格数据
const tableData = ref([
  {
    name: '消息入站速率',
    minute1: '8.01条',
    minute5: '8.08条',
    minute15: '8.08条',
    average: '7.38条',
  },
  {
    name: '节点入站速率',
    minute1: '0.00MB',
    minute5: '0.00MB',
    minute15: '0.00MB',
    average: '0.00MB',
  },
  {
    name: '节点出站速率',
    minute1: '0.00MB',
    minute5: '0.00MB',
    minute15: '0.00MB',
    average: '0.00MB',
  },
  {
    name: '请求拒绝率',
    minute1: '0.00%',
    minute5: '0.00%',
    minute15: '0.00%',
    average: '0.00%',
  },
  {
    name: 'topic拉取失败率',
    minute1: '0.00%',
    minute5: '0.00%',
    minute15: '0.00%',
    average: '0.00%',
  },
  {
    name: '发送请求失败率',
    minute1: '0.00%',
    minute5: '0.00%',
    minute15: '0.00%',
    average: '0.00%',
  },
  {
    name: 'consumer拉取速率',
    minute1: '0.00条',
    minute5: '0.00条',
    minute15: '0.00条',
    average: '0.00条',
  },
  {
    name: 'broker网络处理延迟空间间隔',
    minute1: '98.83%',
    minute5: '98.85%',
    minute15: '98.86%',
    average: '98.90%',
  },
  {
    name: 'leader选举比例(calls)',
    minute1: '0.00%',
    minute5: '0.00%',
    minute15: '0.00%',
    average: '0.00%',
  },
  {
    name: 'unclean leader选举比率(elections)',
    minute1: '0.00%',
    minute5: '0.00%',
    minute15: '0.00%',
    average: '0.00%',
  },
])
</script>

<template>
  <qx-card class="mt-3">
    <qx-table :options="tableOptions" :data="tableData"> </qx-table>
  </qx-card>
</template>

<style scoped></style>
