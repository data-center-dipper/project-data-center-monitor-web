<script setup lang="ts">
import Simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
</script>

<template>
  <div class="scrollbar">
    <Simplebar class="h-full">
      <slot />
    </Simplebar>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar {
  flex: 1;
  height: 100%;
  overflow: hidden;
}
</style>
