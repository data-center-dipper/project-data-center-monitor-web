<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleGoHome = () => {
  router.push('/')
}
</script>

<template>
  <el-empty
    class="flex justify-center items-center h-screen w-screen"
    image="https://github.com/user-attachments/assets/6ffce1db-db9a-4243-b5ae-eec7354c696e"
    description="没有找到该页面, 请检查地址是否正确"
  >
    <el-button type="primary" size="small" @click="handleGoHome"
      >返回首页</el-button
    >
  </el-empty>
</template>
