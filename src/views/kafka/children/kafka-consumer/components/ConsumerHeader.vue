<template>
  <div class="py-3">
    <qx-form-search
      @search="handleSearch"
      :option="searchOptions"
    ></qx-form-search>
  </div>
</template>

<script setup lang="ts">
import type { Option } from '@/components/form-search/src/interface.ts'

const emit = defineEmits(['header-search'])

const searchOptions: Option[] = [
  {
    label: '主题',
    prop: 'selectedTopics',
    placeholder: '请选择主题',
    type: 'select',
    option: [
      { label: 'topic1', value: 'topic1' },
      { label: 'topic2', value: 'topic2' },
      { label: 'topic3', value: 'topic3' },
    ],
    elAttrs: {
      multiple: true,
    },
  },
  {
    label: '消费组',
    prop: 'selectedConsumerGroups',
    placeholder: '请选择消费组',
    type: 'select',
    option: [
      { label: 'group1', value: 'group1' },
      { label: 'group2', value: 'group2' },
      { label: 'group3', value: 'group3' },
    ],
    elAttrs: {
      multiple: true,
    },
  },
]

const handleSearch = (value: any) => {
  emit('header-search', value)
}
</script>

<style scoped></style>
