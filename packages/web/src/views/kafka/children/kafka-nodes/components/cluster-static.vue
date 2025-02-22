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
        <span class="font-bold">集群统计</span>
      </div>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


    <div class="border border-gray-200">
      <div class="border-b bg-gray-200/50 mb-2 p-3">
        <span class="text-gray-500">节点总数统计</span>
      </div>
      <div class="p-3 flex flex-col gap-3">
          <div class="flex gap-2">
            <div>节点总数：</div>
            <div class="flex items-center gap-2">
              <span>3</span>
            </div>
          </div>
        <div class="flex gap-2">
          <div>正常节点总数：</div>
          <div class="flex items-center gap-2">
            <span class="bg-green-400 w-2 h-2 rounded-full"></span>
            <span>3</span>
          </div>
        </div>
        <div class="flex gap-2">
          <div>异常节点数：</div>
          <div class="flex items-center gap-2">
            <span class="bg-red-400 w-2 h-2 rounded-full"></span>
            <span>正常</span>
          </div>
        </div>
      </div>
        </div>

        <div class="border border-gray-200">
          <div class="border-b bg-gray-200/50 mb-2 p-3">
            <span class="text-gray-500">topic统计</span>
          </div>
          <div class="p-3 flex flex-col gap-3">
              <div class="flex gap-2">
                <div>topic总数：</div>
                <div class="flex items-center gap-2">
                  <span>3</span>
                </div>
              </div>
            <div class="flex gap-2">
              <div>内置topic总数：</div>
              <div class="flex items-center gap-2">
                <span class="bg-green-400 w-2 h-2 rounded-full"></span>
                <span>3</span>
              </div>
            </div>
            <div class="flex gap-2">
              <div>自定义topic总数：</div>
              <div class="flex items-center gap-2">
                <span class="bg-red-400 w-2 h-2 rounded-full"></span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>


        <div class="border border-gray-200">
          <div class="border-b bg-gray-200/50 mb-2 p-3">
            <span class="text-gray-500">zookeeper统计</span>
          </div>
          <div class="p-3 flex flex-col gap-3">
              <div class="flex gap-2">
                <div>ZK节点总数：</div>
                <div class="flex items-center gap-2">
                  <span>3</span>
                </div>
              </div>
            <div class="flex gap-2">
              <div>正常节点总数：</div>
              <div class="flex items-center gap-2">
                <span class="bg-green-400 w-2 h-2 rounded-full"></span>
                <span>3</span>
              </div>
            </div>
            <div class="flex gap-2">
              <div>异常节点数：</div>
              <div class="flex items-center gap-2">
                <span class="bg-red-400 w-2 h-2 rounded-full"></span>
                <span>10</span>
              </div>
            </div>
          </div>
        </div>


        <div class="border border-gray-200">
          <div class="border-b bg-gray-200/50 mb-2 p-3">
            <span class="text-gray-500">消费者总数统计</span>
          </div>
          <div class="p-3 flex flex-col gap-3">
              <div class="flex gap-2">
                <div>消费者总数：</div>
                <div class="flex items-center gap-2">
                  <span>3</span>
                </div>
              </div>
            <div class="flex gap-2">
              <div>正常消费总数：</div>
              <div class="flex items-center gap-2">
                <span class="bg-green-400 w-2 h-2 rounded-full"></span>
                <span>3</span>
              </div>
            </div>
            <div class="flex gap-2">
              <div>异常消费总数：</div>
              <div class="flex items-center gap-2">
                <span class="bg-red-400 w-2 h-2 rounded-full"></span>
                <span>正常</span>
              </div>
            </div>
          </div>
        </div>

    </div>


  </el-card>
</template>

<style scoped></style>
