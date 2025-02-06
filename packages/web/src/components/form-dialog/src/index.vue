<script setup lang="ts">
import { type PropType, ref, watch } from 'vue'
import type { FormOptions } from '../../form/src/interface.ts'

const form = ref<any>(null)

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true,
  },
  isScroll: {
    type: Boolean,
    default: false,
  },
  onPreview: {
    type: Function,
    default: () => {},
  },
  onRemove: {
    type: Function,
    default: () => {},
  },
  beforeRemove: {
    type: Function,
    default: () => true,
  },
  onSuccess: {
    type: Function,
    default: () => {},
  },
  onExceed: {
    type: Function,
    default: () => {},
  },
  beforeUpload: {
    type: Function,
    default: () => true,
  },
  onChange: {
    type: Function,
    default: () => {},
  },
})

const emits = defineEmits(['update:visible'])

const dialogVisible = ref(props.visible)

watch(
  () => props.visible,
  (value) => {
    dialogVisible.value = value
  },
)

watch(dialogVisible, (value) => {
  emits('update:visible', value)
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    v-bind="$attrs"
    :class="{ 'is-scroll': isScroll }"
  >
    <template #default>
      <qx-form
        ref="form"
        :options="options"
        @on-preview="onPreview"
        @on-remove="onRemove"
        @before-remove="beforeRemove"
        @on-success="onSuccess"
        @on-exceed="onExceed"
        @beforeUpload="beforeUpload"
        @on-change="onChange"
      >
        <template #uploadTrigger>
          <slot name="uploadTrigger"></slot>
        </template>
        <template #uploadTip>
          <slot name="uploadTip"></slot>
        </template>
      </qx-form>
    </template>
    <template #footer>
      <slot name="footer" :form="form"></slot>
    </template>
  </el-dialog>
</template>

<style scoped></style>
