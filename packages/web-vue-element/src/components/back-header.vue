<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

interface Props {
  back: () => void;
  isDefault: boolean;
}

const props = defineProps<Props>();

const router = useRouter();
</script>

<template>
  <div class="header">
    <button @click="isDefault ? router.back() : back()"></button>
    <span class="title">
      <slot></slot>
    </span>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e4efff;
  padding-top: 12px;
  padding-left: 16px;
  
  .title {
    margin-left: 1px;
    width: 100%;
    font-size: 20px;
    line-height: 32px;
  }
}
</style>
