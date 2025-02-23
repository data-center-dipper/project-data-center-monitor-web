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
    <el-row :gutter="20" class="pb-3">
      <el-col :span="12">
        <el-form-item label="主题">
          <el-select>
            <el-option label="分区ID" value="id"></el-option>
            <el-option label="当前offset" value="offset"></el-option>
            <el-option label="start" value="start"></el-option>
            <el-option label="end" value="end"></el-option>
            <el-option label="size" value="size"></el-option>
            <el-option label="lag" value="lag"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
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
