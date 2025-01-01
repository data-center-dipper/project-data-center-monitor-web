<template>
  <ColorPicker
    v-model:color="selectedColor"
    :palettes="['#ff0000', '#00ff00', '#0000ff']"
    :disabled="isDisabled"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ColorPicker from '@/components/color-picker.vue';

const selectedColor = ref('#ff0000');
const isDisabled = ref(false);
</script>
