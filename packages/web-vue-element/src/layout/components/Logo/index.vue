<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCommonStore } from '@/store/modules/common.ts';

const commonStore = useCommonStore();
const { isCollapse } = storeToRefs(commonStore);
</script>

<template>
  <div class="w-full py-[10px] justify-center items-center flex gap-2">
    <img class="w-[35px]" src="@/assets/logo.svg" alt="logo" />
    <span v-show="!isCollapse">Kafka监控平台</span>
  </div>
</template>

<style scoped></style>
