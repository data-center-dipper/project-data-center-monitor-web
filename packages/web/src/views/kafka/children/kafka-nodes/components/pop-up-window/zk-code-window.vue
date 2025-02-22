<script setup lang="ts">
import { ref } from 'vue'

</script>

<template>
  <div>
   <!-- 弹窗 -->
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h3 class="text-xl font-semibold mb-4">元数据详情</h3>
        <pre class="bg-gray-100 p-4 rounded overflow-auto">{{ codeContent }}</pre>
        <button @click="closeModal" class="mt-4 px-4 py-2 bg-red-500 text-white rounded">关闭</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
