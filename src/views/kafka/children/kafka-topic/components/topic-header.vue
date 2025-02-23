<script setup lang="ts"></script>

<template>
  <div class="flex justify-between mb-3">
    <div class="flex items-center gap-10">
      <div class="flex items-center gap-4">
        <el-input placeholder="请输入主题名称">
          <template #prepend>主题</template>
        </el-input>
        <div class="flex items-center text-nowrap gap-3">
          <span>显示自定义topic</span>
          <el-switch></el-switch>
        </div>
      </div>
      <div class="flex gap-5">
        <span>topic总数：<span class="text-blue-400">37</span></span>
        <span>消费组总数：<span class="text-blue-400">21</span></span>
      </div>
    </div>
    <div>
      <el-button type="primary">创建topic</el-button>
      <el-button type="danger">重建所有内置topic</el-button>
    </div>
  </div>
</template>

<style scoped></style>
