<script setup lang="ts">
</script>

<template>
  <div class="kafka-home p-4">
    <!-- Kafka 集群概览 -->
    <div>
      <h1 class="text-nowrap text-lg font-bold text-gray-700">Kafka 集群概览</h1>
      <hr class="my-2" />
      <div class="flex flex-col md:flex-row items-center justify-between w-full h-full border border-gray-200 rounded-md p-3">
        <div class="mb-2 md:mb-0 flex items-center justify-center">
          <span>在线运行时长:</span>
          <span class="ml-2">12 小时 30 分钟</span>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 gap-2 w-full md:w-auto flex justify-center"> <!-- 横向居中 -->
          <div class="flex items-center justify-center">
            <span>在线节点个数:</span>
            <span class="text-red-700 ml-2">3个</span>
          </div>
          <div class="flex items-center justify-center">
            <span>在线zk数:</span>
            <span class="text-red-700 ml-2">3个</span>
          </div>
          <div class="flex items-center justify-center">
            <span>离线节点数:</span>
            <span class="text-red-700 ml-2">0个</span>
          </div>
          <div class="flex items-center justify-center">
            <span>离线zk数:</span>
            <span class="text-red-700 ml-2">0个</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Kafka 节点检测 -->
    <div class="mt-6">
      <h1 class="text-nowrap text-lg font-bold text-gray-700">Kafka 节点检测</h1>
      <hr class="my-2" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div class="flex flex-col gap-2 border border-gray-200 rounded-md p-3" v-for="(item, index) in 40" :key="index">
          <div>
            <span>节点域名:</span>
            <span>1-kafka-1</span>
          </div>
          <div>
            <span>服务端口:</span>
            <span>
              <span>9092状态</span>
              <span class="ml-2 text-green-700">通畅</span>
            </span>
          </div>
          <div>
            <span>jxm端口:</span>
            <span>
              <span>12345状态</span>
              <span class="ml-2 text-green-700">通畅</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Zookeeper 连通性 -->
    <div class="mt-6">
      <h1 class="text-nowrap text-lg font-bold text-gray-700">Zookeeper 连通性</h1>
      <hr class="my-2" />
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <div class="flex flex-col gap-2 border border-gray-200 rounded-md p-3" v-for="(item, index) in 40" :key="index">
          <div>
            <span>节点域名:</span>
            <span>1-kafka-1</span>
          </div>
          <div>
            <span>服务端口:</span>
            <span>
              <span>9092状态</span>
              <span class="ml-2 text-green-700">通畅</span>
            </span>
          </div>
          <div>
            <span>信息:</span>
            <span>数据一致</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
