<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, computed, onMounted } from 'vue'
import request from '@/api/index.ts' // 确保路径正确指向你的请求模块

// 声明响应式变量
const brokerTime = ref('') // 在线运行时长
const brokersInfo = ref([]) // Kafka Broker列表信息
const zookeeperView = ref([]) // Zookeeper集群视图信息

// 获取Kafka集群运行时长信息
const fetchBrokerTime = async () => {
  try {
    const response = await request.get(
      '/dipper/monitor/api/v1/kafka/broker/brokerTime',
    )
    brokerTime.value = response.data?.data?.uptime || '未知' // 根据实际返回的数据结构调整
  } catch (error) {
    console.error('获取Kafka集群运行时长失败:', error)
  }
}

// 获取Kafka Broker列表信息
const fetchBrokersInfo = async () => {
  try {
    const response = await request.get(
      '/dipper/monitor/api/v1/kafka/broker/brokerList',
    )
    brokersInfo.value = response.data?.data?.brokers || [] // 根据实际返回的数据结构调整
  } catch (error) {
    console.error('获取Kafka Broker列表失败:', error)
  }
}

// 获取Zookeeper集群视图信息
const fetchZookeeperView = async () => {
  try {
    const response = await request.get(
      '/dipper/monitor/api/v1/kafka/broker/zookeeper_list',
    )
    zookeeperView.value = response.data?.data?.zookeepers || [] // 根据实际返回的数据结构调整
  } catch (error) {
    console.error('获取Zookeeper集群视图失败:', error)
  }
}

// 在组件挂载完成后调用获取数据的方法
onMounted(() => {
  fetchBrokerTime()
  fetchBrokersInfo()
  fetchZookeeperView()
})
</script>

<template>
  <div class="kafka-nodes p-4">
    <!-- Kafka 集群概览部分 -->
    <div>
      <h1 class="text-nowrap text-lg font-bold text-gray-700">
        Kafka 集群概览
      </h1>
      <hr class="my-2" />
      <div
        class="flex flex-col md:flex-row items-center justify-between w-full h-full border border-gray-200 rounded-md p-3"
      >
        <div class="mb-2 md:mb-0 flex items-center justify-center">
          <span>在线运行时长:</span>
          <span class="ml-2">{{ brokerTime }}</span>
        </div>
        <div
          class="grid grid-cols-2 grid-rows-2 gap-2 w-full md:w-auto flex justify-center"
        >
          <div class="flex items-center justify-center">
            <span>在线节点个数:</span>
            <span class="text-red-700 ml-2"
              >{{
                brokersInfo.filter((broker) => broker.status === 'online')
                  .length
              }}个</span
            >
          </div>
          <div class="flex items-center justify-center">
            <span>在线zk数:</span>
            <span class="text-red-700 ml-2"
              >{{
                zookeeperView.filter((zk) => zk.status === 'online').length
              }}个</span
            >
          </div>
          <div class="flex items-center justify-center">
            <span>离线节点数:</span>
            <span class="text-red-700 ml-2"
              >{{
                brokersInfo.filter((broker) => broker.status !== 'online')
                  .length
              }}个</span
            >
          </div>
          <div class="flex items-center justify-center">
            <span>离线zk数:</span>
            <span class="text-red-700 ml-2"
              >{{
                zookeeperView.filter((zk) => zk.status !== 'online').length
              }}个</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Kafka 节点检测和 Zookeeper 连通性部分保持不变，但使用动态数据 -->
    <div class="mt-6">
      <h1 class="text-nowrap text-lg font-bold text-gray-700">
        Kafka 节点检测
      </h1>
      <hr class="my-2" />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(broker, index) in brokersInfo"
          :key="index"
          class="flex flex-col gap-2 border border-gray-200 rounded-md p-3"
        >
          <div>
            <span>节点域名:</span><span>{{ broker.name }}</span>
          </div>
          <div>
            <span>服务端口:</span
            ><span
              ><span>9092状态</span
              ><span class="ml-2 text-green-700">{{
                broker.status
              }}</span></span
            >
          </div>
          <div>
            <span>jxm端口:</span
            ><span
              ><span>12345状态</span
              ><span class="ml-2 text-green-700">{{
                broker.jmxStatus
              }}</span></span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6">
      <h1 class="text-nowrap text-lg font-bold text-gray-700">
        Zookeeper 连通性
      </h1>
      <hr class="my-2" />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <div
          v-for="(zk, index) in zookeeperView"
          :key="index"
          class="flex flex-col gap-2 border border-gray-200 rounded-md p-3"
        >
          <div>
            <span>节点域名:</span><span>{{ zk.name }}</span>
          </div>
          <div>
            <span>服务端口:</span
            ><span
              ><span>2181状态</span
              ><span class="ml-2 text-green-700">{{ zk.status }}</span></span
            >
          </div>
          <div>
            <span>信息:</span><span>{{ zk.info }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 这里可以添加组件专属的样式，但本例中未定义额外的样式 */
</style>
