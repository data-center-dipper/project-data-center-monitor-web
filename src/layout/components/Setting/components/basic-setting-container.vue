<script setup lang="ts">
interface IProp {
  title: string
}

const props = withDefaults(defineProps<IProp>(), {
  title: '默认标题',
})
</script>

<template>
  <div
    class="relative flex items-center justify-between mt-[35px] text-black font-extralight !bg-transparent"
  >
    <span class="text-sm !bg-transparent">
      {{ title }}
    </span>
    <slot name="action" />
  </div>
</template>
