<template>
  <div class="py-3">
    <qx-form-search
      @search="handleSearch"
      :option="searchOptions"
    ></qx-form-search>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Option } from '@/components/form-search/src/interface.ts'

// 单选绑定的值
const selectedTopic = ref('');

// 模拟动态获取的主题选项数据
const options = ref([]);

// 模拟从API或其它异步操作中获取数据
function fetchOptions() {
    setTimeout(() => {
        options.value = [
            { label: 'topic1', value: 'topic1' },
            { label: 'topic2', value: 'topic2' },
            { label: 'topic3', value: 'topic3' }
        ];
    }, 1000); // 延迟1秒以模拟异步操作
}

// 触发自定义事件通知父组件主题变化
const emit = defineEmits(['searchForm']);

function onTopicChange(value) {
    console.log('主题选择变化:', value);
    emit('searchForm', { topics: selectedTopic.value });
}


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
  {
    label: '复选框',
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
  emit('header-search', value)
}

onMounted(() => {
    fetchOptions(); // 在组件挂载后调用
});
</script>