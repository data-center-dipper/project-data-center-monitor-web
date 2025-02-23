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
        <span class="font-bold">节点稳定状态统计</span>
      </div>
    </template>
    <!-- 修改这里的grid布局 -->
    <div class="grid grid-cols-2 gap-2 p-2">
      <div class="border border-gray-200 p-6 rounded-lg shadow-md bg-white">
        <div class="border-b bg-gray-200/50 mb-2 p-3">
          <span class="text-gray-500">kafka节点稳定性统计</span>
        </div>
        <div class="p-3 flex flex-col gap-3">
          <div class="flex gap-2">
            <div>运行最稳定的节点：</div>
            <div class="flex items-center gap-2 w-full max-w-[300px]">
              <!-- 设置最大宽度 -->
              <span
                class="text-sm truncate text-ellipsis overflow-hidden"
                style="white-space: nowrap"
              >
                1-kafka-1(24小时),2-kafka-1(14小时),3-kafka-1(8小时)
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <div>运行最不稳定的节点：</div>
            <div class="flex items-center gap-2 w-full max-w-[300px]">
              <!-- 设置最大宽度 -->
              <span
                class="text-sm truncate text-ellipsis overflow-hidden"
                style="white-space: nowrap"
              >
                1-kafka-1(24小时),2-kafka-1(14小时),3-kafka-1(8小时)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="border border-gray-200 p-6 rounded-lg shadow-md bg-white">
        <div class="border-b bg-gray-200/50 mb-2 p-3">
          <span class="text-gray-500">zookeeper节点稳定性统计</span>
        </div>
        <div class="p-3 flex flex-col gap-3">
          <div class="flex gap-2">
            <div>运行最稳定的节点：</div>
            <div class="flex items-center gap-2 w-full max-w-[300px]">
              <!-- 设置最大宽度 -->
              <span
                class="text-sm truncate text-ellipsis overflow-hidden"
                style="white-space: nowrap"
              >
                1-zookeeper-1(24小时),2-zookeeper-1(14小时),3-zookeeper-1(8小时)
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <div>运行最不稳定的节点：</div>
            <div class="flex items-center gap-2 w-full max-w-[300px]">
              <!-- 设置最大宽度 -->
              <span
                class="text-sm truncate text-ellipsis overflow-hidden"
                style="white-space: nowrap"
              >
                1-zookeeper-1(24小时),2-zookeeper-1(14小时),3-zookeeper-1(8小时)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
/* 可根据需要添加额外样式 */
</style>
