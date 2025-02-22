<template>
  <el-card class="w-full">
    <template #header>
      <div class="text-center md:text-left">
        <span class="font-bold">Kafka集群概览</span>
      </div>
    </template>
    <div class="flex flex-col items-center gap-2 md:flex-row md:gap-4">
      <div class="md:mr-4">
        <iconpark-icon
          name="kafka-topic"
          size="80"
          class="md:mb-0 mb-2"
        ></iconpark-icon>
      </div>
      <div class="flex flex-col items-center gap-2 md:items-start">
        <div class="flex flex-col items-center gap-1 md:flex-row md:gap-2">
          <div>Kafka集群已连续在线运行：</div>
          <div class="flex gap-1 items-center">
            <div
              class="w-8 h-10 bg-gray-400/20 rounded-lg text-center leading-10"
            >
              0
            </div>
            <div>天</div>
            <div
              class="w-8 h-10 bg-gray-400/20 rounded-lg text-center leading-10"
            >
              1
            </div>
            <div>小时</div>
            <div
              class="w-8 h-10 bg-gray-400/20 rounded-lg text-center leading-10"
            >
              47
            </div>
            <div>分</div>
            <div
              class="w-8 h-10 bg-gray-400/20 rounded-lg text-center leading-10"
            >
              32
            </div>
            <div>秒</div>
          </div>
        </div>
        <div class="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div>
            最大运行时常: <span class="text-red-500">4小时20分</span>
          </div>
          <div>
            最小运行时常: <span class="text-red-500">1小时20分</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<style scoped></style>
