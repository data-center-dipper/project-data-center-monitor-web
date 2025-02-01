<script setup lang="ts">
// 这里是用于组合式 API 的 <script setup> 部分。
// 如果有需要导入的模块或定义的逻辑，可以在这里进行。
// 本例中没有额外的逻辑，因此脚本部分为空。
</script>

<template>
  <!-- 主容器，使用 Tailwind CSS 类来设置内边距 -->
  <div class="kafka-nodes p-4">
    <!-- Kafka 集群概览部分 -->
    <div>
      <!-- 标题，使用 Tailwind CSS 类设置文本样式，包括字体大小、粗细和颜色 -->
      <h1 class="text-nowrap text-lg font-bold text-gray-700">
        Kafka 集群概览
      </h1>
      <!-- 分割线，上下留白 -->
      <hr class="my-2" />

      <!-- 统计信息容器，使用 Tailwind CSS 类设置布局、边框和内边距 -->
      <div
        class="flex flex-col md:flex-row items-center justify-between w-full h-full border border-gray-200 rounded-md p-3"
      >
        <!-- 在线运行时长信息 -->
        <div class="mb-2 md:mb-0 flex items-center justify-center">
          <span>在线运行时长:</span>
          <span class="ml-2">12 小时 30 分钟</span>
        </div>

        <!-- 节点状态信息，使用 Grid 布局，在桌面视图下横向排列 -->
        <div
          class="grid grid-cols-2 grid-rows-2 gap-2 w-full md:w-auto flex justify-center"
        >
          <!-- 每个状态项使用 Flex 布局居中显示 -->
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

    <!-- Kafka 节点检测部分 -->
    <div class="mt-6">
      <!-- 标题，使用 Tailwind CSS 类设置文本样式 -->
      <h1 class="text-nowrap text-lg font-bold text-gray-700">
        Kafka 节点检测
      </h1>
      <!-- 分割线，上下留白 -->
      <hr class="my-2" />

      <!-- 使用 Grid 布局展示多个节点检测卡片，根据屏幕宽度自动调整列数 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <!-- 循环生成节点检测卡片，v-for 指令用于迭代数组 -->
        <div
          v-for="(item, index) in 40"
          :key="index"
          class="flex flex-col gap-2 border border-gray-200 rounded-md p-3"
        >
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

    <!-- Zookeeper 连通性部分 -->
    <div class="mt-6">
      <!-- 标题，使用 Tailwind CSS 类设置文本样式 -->
      <h1 class="text-nowrap text-lg font-bold text-gray-700">
        Zookeeper 连通性
      </h1>
      <!-- 分割线，上下留白 -->
      <hr class="my-2" />

      <!-- 使用 Grid 布局展示多个 Zookeeper 状态卡片，根据屏幕宽度自动调整列数 -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
      >
        <!-- 循环生成 Zookeeper 状态卡片，v-for 指令用于迭代数组 -->
        <div
          v-for="(item, index) in 40"
          :key="index"
          class="flex flex-col gap-2 border border-gray-200 rounded-md p-3"
        >
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

<style scoped>
/* 这里可以添加组件专属的样式，但本例中未定义额外的样式 */
</style>
