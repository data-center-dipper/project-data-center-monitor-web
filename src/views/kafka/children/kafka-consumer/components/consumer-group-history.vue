<script setup lang="ts"></script>

<template>这里是多个折线图的图表</template>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  height: 60vh;
  background-color: lightpink;
}

.chart-item {
  flex: 1;
  margin-bottom: 20px;
}

.chart-item:last-child {
  margin-bottom: 0;
}
</style>
