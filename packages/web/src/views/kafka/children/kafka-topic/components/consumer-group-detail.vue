<script setup lang="ts">
import { ref } from 'vue'
const tableOptions = ref([
  { label: '分区ID', prop: 'id', align: 'center', width: 180, sortable: true },
  { label: '当前offset', prop: 'offset', align: 'center', sortable: true },
  { label: 'start', prop: 'start', align: 'center', sortable: true },
  { label: 'end', prop: 'end', align: 'center', sortable: true },
  { label: 'size', prop: 'size', align: 'center', sortable: true },
  { label: 'lag', prop: 'lag', align: 'center', sortable: true },
])

const tableData = ref([
  { id: 0, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 1, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 2, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 3, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 4, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 5, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 6, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 7, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 8, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
  { id: 9, offset: 0, start: 0, end: 0, size: 0, lag: 0 },
])
</script>

<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-input>
          <template #prepend>
            <span>主题</span>
          </template>
        </el-input>
      </el-col>
      <el-col :span="12">
        <el-input>
          <template #prepend>
            <span>消费组ID</span>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <div class="flex justify-between items-center py-3">
      <div>消费状态</div>
      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1 cursor-pointer">
          <iconpark-icon name="refresh"></iconpark-icon>
          <span>刷新</span>
        </div>
        <div class="flex items-center gap-1 cursor-pointer">
          <iconpark-icon name="save"></iconpark-icon>
          <span>保存当前offset</span>
        </div>
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
