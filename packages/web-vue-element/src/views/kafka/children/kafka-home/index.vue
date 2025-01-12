<script setup lang="ts">
</script>

<template>
  <div class="kafka-home">
    <div>
      <h1 class="text-nowrap text-lg font-bold text-gray-700">Kafka 集群概览</h1>
      <hr class="my-2" />
      <div class="flex items-center justify-between w-full h-full border border-gray-200 rounded-md p-3">
        <div>
          <span>在线运行时长:</span>
          <span>12 小时 30 分钟</span>
        </div>
        <div class="grid grid-cols-2 grid-rows-2 gap-2">
          <div>
            <span>在线节点个数:</span>
            <span class="text-red-700 ml-2">3个</span>
          </div>
          <div>
            <span>在线zk数:</span>
            <span class="text-red-700 ml-2">3个</span>
          </div>
          <div>
            <span>离线节点数:</span>
            <span class="text-red-700 ml-2">0个</span>
          </div>
          <div>
            <span>离线zk数:</span>
            <span class="text-red-700 ml-2">0个</span>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h1 class="text-nowrap text-lg font-bold text-gray-700 mt-2">Kafka 节点检测</h1>
      <hr class="my-2" />
      <div class="grid grid-cols-5 gap-4">
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

    <div>
      <h1 class="text-nowrap text-lg font-bold text-gray-700 mt-2">Zookeeper 连通性</h1>
      <hr class="my-2" />
      <div class="grid grid-cols-5 gap-4">
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
