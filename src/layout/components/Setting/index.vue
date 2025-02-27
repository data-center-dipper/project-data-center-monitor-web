<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mittBus } from '@/utils'
const showDrawer = ref(false)

function openSetting() {
  console.log('open setting')
  showDrawer.value = true
}

onMounted(() => {
  mittBus.on('openSetting', openSetting)
})
</script>

<template>
  <el-drawer
    size="300px"
    v-model="showDrawer"
    :lock-scroll="false"
    :with-header="false"
    modal-class="setting-modal"
  ></el-drawer>
</template>

<style scoped></style>
