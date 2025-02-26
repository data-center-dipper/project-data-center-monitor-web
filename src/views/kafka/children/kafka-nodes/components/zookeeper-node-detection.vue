<script setup lang="ts">
import { ref } from 'vue'
import { useDialog } from '@/components/dialog/useDialog.tsx'
import zkCodeWindow from './pop-up-window/zk-detail.vue'

function showZkDetail() {
  useDialog({
    title: 'zkNode详情查看',
    component: zkCodeWindow,
    props: {},
  })
}
</script>

<template>
  <el-card>
    <template #header>
      <div class="text-center md:text-left">
        <span class="font-bold">Zookeeper节点检测</span>
      </div>
    </template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <template v-for="item in 3" :key="item">
        <div class="border border-gray-200">
          <div class="border-b bg-gray-200/50 mb-2 p-3">
            <span class="text-gray-500">zk节点：</span>
            <span class="ml-2">1-zk-1:9092</span>
          </div>
          <div class="p-3 flex flex-col gap-3">
            <div class="flex gap-2">
              <div>角色：</div>
              <div class="flex items-center gap-2">
                <span class="bg-green-400 w-2 h-2 rounded-full"></span>
                <span>leader</span>
              </div>
            </div>
            <div class="flex gap-2">
              <div>连接状态：</div>
              <div class="flex items-center gap-2">
                <span class="bg-green-400 w-2 h-2 rounded-full"></span>
                <span>正常</span>
              </div>
            </div>
            <div class="flex gap-2">
              <div>broker一致性：</div>
              <div class="flex items-center gap-2">
                <span class="bg-red-400 w-2 h-2 rounded-full"></span>
                <span>不一致</span>
              </div>
            </div>
            <div class="flex gap-1">
              <div>元数据：</div>
              <el-button link type="primary" size="small" @click="showZkDetail"
                >查看详情</el-button
              >
            </div>
          </div>
        </div>
      </template>
    </div>
  </el-card>
</template>

<style scoped></style>
