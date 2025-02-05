<script setup lang="ts">
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
        <span class="font-bold">Kafka节点检测</span>
      </div>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-for="item in 3" :key="item">
        <div class="border border-gray-200">
          <div class="border-b bg-gray-200/50 mb-2 p-3">
            <span class="text-gray-500">kafka节点：</span>
            <span class="ml-2">1-kafka-1:9092</span>
          </div>
          <div class="p-3 flex flex-col gap-3">
            <div class="flex gap-2">
              <div>连接状态：</div>
              <div class="flex items-center gap-2">
                <span class="bg-green-400 w-2 h-2 rounded-full"></span>
                <span>正常</span>
              </div>
            </div>
            <div class="flex gap-2">
              <div>jmx连接状态：</div>
              <div class="flex items-center gap-2">
                <span class="bg-red-400 w-2 h-2 rounded-full"></span>
                <span>异常</span>
              </div>
            </div>
          </div>
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
