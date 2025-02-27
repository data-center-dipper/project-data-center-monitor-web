<script setup lang="ts">
interface IProps {
  title: string
}

const props = withDefaults(defineProps<IProps>(), {
  title: '默认标题',
})
</script>

<template>
  <p
    class="relative text-[13px] text-black font-thin text-center first:mt-5 before:absolute before:top-1/2 before:left-0 before:w-[50px] before:border-b before:border-[#dbdfe9] before:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[50px] after:border-b after:border-[#dbdfe9] after:content-['']"
  >
    {{ title }}
  </p>
</template>

<style scoped></style>
