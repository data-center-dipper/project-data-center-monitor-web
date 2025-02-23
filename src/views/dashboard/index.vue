<script setup lang="ts">
const handleCurrentPageChange = (currentPage: number) => {
  console.log(currentPage)
}

const handlePageSizeChange = (pageSize: number) => {
  console.log(pageSize)
}
</script>

<template>
  <!--  &lt;!&ndash; 测试分页组件 &ndash;&gt;-->
  <qx-pagination
    layout="prev, pager, next"
    :total="50"
    background
    @qx-current-change="handleCurrentPageChange"
    @qx-size-change="handlePageSizeChange"
  ></qx-pagination>
</template>

<style scoped></style>
