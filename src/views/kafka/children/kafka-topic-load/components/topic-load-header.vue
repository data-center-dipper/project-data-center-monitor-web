<template>
  <qx-card>
    <qx-form-search
      @search="handleSearch"
      :option="searchOptions"
    ></qx-form-search>
  </qx-card>
</template>

<script setup lang="ts">
import QxCard from '@/components/Card/src/index.vue'
import QxFormSearch from '@/components/form-search/src/index.vue'

const emit = defineEmits(['header-search-action'])

const searchOptions = [
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
  {
    label: '指标',
    type: 'checkbox',
    prop: 'checkbox',
    option: [
      {
        label: '磁盘大小',
        value: 0,
      },
      {
        label: '入站速率/1min',
        value: 1,
      },
      {
        label: '入站速率/5min',
        value: 2,
      },
      {
        label: '出站速率/1min',
        value: 3,
      },
      {
        label: '出站速率/5min',
        value: 4,
      },
      {
        label: '写入速率(条)/1min',
        value: 5,
      },
      {
        label: '写入速率(条)/15min',
        value: 6,
      },
    ],
  },
]

const handleSearch = (value: any) => {
  emit('header-search-action', value)
}
</script>
