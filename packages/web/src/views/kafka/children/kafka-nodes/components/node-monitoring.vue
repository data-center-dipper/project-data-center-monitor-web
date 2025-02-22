<script setup lang="ts">
import { ref } from 'vue'

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

const handleCurrentPageChange = (page: number) => {
  console.log(page)
}

const handlePageSizeChange = (size: number) => {
  console.log(size)
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-center md:text-left">
        <span class="font-bold">Kafka节点监控</span>
      </div>
    </template>
    <div class="w-[280px] pb-5">
      <el-select placeholder="请选择">
        <el-option label="最近1小时" value="1"></el-option>
        <el-option label="最近24小时" value="24"></el-option>
        <el-option label="最近7天" value="7"></el-option>
        <el-option label="最近30天" value="30"></el-option>
      </el-select>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <template v-for="item in 5" :key="item">
        <div class="border border-gray-200 rounded-md">
          <div class="text-center py-3 bg-gray-100 font-bold">1-kafka-1</div>
          <div class="flex flex-col justify-center py-3 gap-3">
            <span>内存：共 8GB  空闲：5.6GB</span>
            <span>提示: 内存状态良好</span>
          </div>
          <div class="flex flex-col justify-center py-3 gap-3">
              <span>系统CPU负载：0.15  磁盘IO:23w</span>
              <span>提示: 当前磁盘使用率过高，可能会导致写入压力比较大</span>
          </div>
          <div class="flex flex-col justify-center py-3 gap-3">
              <span>网络速率：1000xx -> 100M (千兆网卡)</span>
              <span>网络速率实测：20M/s  更新时间:2023-12-12 12:12:11</span>
              <span>节点消费速率+写入速率: 100M</span>
              <span>提示: 数据量太大,即将达到网卡极限</span>
          </div>
          <qx-table :options="tableOptions" :data="tableData"> </qx-table>
        </div>
      </template>
    </div>
    <qx-pagination
      layout="prev, pager, next"
      :total="50"
      background
      @qx-current-change="handleCurrentPageChange"
      @qx-size-change="handlePageSizeChange"
    ></qx-pagination>
  </el-card>
</template>

<style scoped></style>
