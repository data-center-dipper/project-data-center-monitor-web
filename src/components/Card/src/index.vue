<script lang="ts" setup></script>

<template>
  <el-card v-bind="$attrs">
    <div>
      <slot name="header"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </el-card>
</template>

<style scoped></style>
