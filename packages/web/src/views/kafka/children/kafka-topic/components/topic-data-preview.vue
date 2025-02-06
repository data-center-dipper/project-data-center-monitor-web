<script setup lang="ts">
import { ref } from 'vue'
const tableOptions = ref([
  { label: '序号', prop: 'id', align: 'left', width: 180, sortable: true },
  { label: 'offset', prop: 'offset', align: 'left' },
  { label: '写入时间', prop: 'start', align: 'left' },
  { label: '数据内容', prop: 'content', align: 'left' },
])

const tableData = ref([
  { id: 1, offset: 100, start: '2022-01-01 12:00:00', content: 'hello world' },
  { id: 2, offset: 200, start: '2022-01-01 12:00:01', content: 'hello world' },
  { id: 3, offset: 300, start: '2022-01-01 12:00:02', content: 'hello world' },
  { id: 4, offset: 400, start: '2022-01-01 12:00:03', content: 'hello world' },
  { id: 5, offset: 500, start: '2022-01-01 12:00:04', content: 'hello world' },
  { id: 6, offset: 600, start: '2022-01-01 12:00:05', content: 'hello world' },
  { id: 7, offset: 700, start: '2022-01-01 12:00:06', content: 'hello world' },
  { id: 8, offset: 800, start: '2022-01-01 12:00:07', content: 'hello world' },
  { id: 9, offset: 900, start: '2022-01-01 12:00:08', content: 'hello world' },
  {
    id: 10,
    offset: 1000,
    start: '2022-01-01 12:00:09',
    content: 'hello world',
  },
])
</script>

<template>
  <div>
    <div class="flex justify-between items-center pb-3">
      <div class="flex gap-2">
        <el-select placeholder="选择主题">
          <el-option label="分区ID" value="id"></el-option>
          <el-option label="当前offset" value="offset"></el-option>
          <el-option label="start" value="start"></el-option>
          <el-option label="end" value="end"></el-option>
          <el-option label="size" value="size"></el-option>
          <el-option label="lag" value="lag"></el-option>
        </el-select>
        <el-input>
          <template #prepend>
            <span>关键字</span>
          </template>
        </el-input>
        <el-input>
          <template #prepend>
            <span>显示条数</span>
          </template>
        </el-input>
      </div>
      <div>
        <el-button type="primary">查询</el-button>
        <el-button>下载</el-button>
      </div>
    </div>
    <qx-table
      border
      :header-cell-style="{ background: 'rgba(165,184,185,0.43)' }"
      :options="tableOptions"
      :data="tableData"
    >
    </qx-table>
  </div>
</template>

<style scoped></style>
