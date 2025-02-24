<template>
  <div>
    <qx-form-search
      @search="handleSearch"
      :option="searchOptions"
    ></qx-form-search>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 主题选择部分 -->
      <el-form-item label="主题">
        <el-select
          v-model="formInline.selectedTopics"
          multiple
          placeholder="请选择主题"
          clearable
          style="width: 420px"
        >
          <el-option
            v-for="option in options"
            :key="option.value"
            :label="option.label"
            :value="option.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 消费组选择部分 -->
      <el-form-item label="消费组">
        <el-select
          v-model="formInline.selectedConsumerGroups"
          multiple
          placeholder="请选择消费组"
          clearable
          style="width: 420px"
        >
          <el-option
            v-for="group in consumerGroups"
            :key="group.value"
            :label="group.label"
            :value="group.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!-- 增加消费组按钮 -->
      <el-form-item>
        <el-button type="primary" style="width: 100px" @click="onSearch"
          >搜索</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import type { Option } from '@/components/form-search/src/interface.ts'

const handleSearch = (value: any) => {
  console.log('handleSearch', value)
}

const searchOptions: Option[] = [
  {
    label: '选择框',
    prop: 'selectA',
    placeholder: '请选择支付方式',
    type: 'select',
    option: [
      {
        label: '微信',
        value: 0,
      },
      {
        label: '支付宝',
        value: 1,
      },
    ],
    elAttrs: {
      multiple: true,
    },
  },
  {
    label: '选择框',
    prop: 'selectB',
    placeholder: '请选择支付方式',
    type: 'select',
    option: [
      {
        label: '微信',
        value: 0,
      },
      {
        label: '支付宝',
        value: 1,
      },
    ],
    elAttrs: {
      multiple: true,
    },
  },
]

// 表单数据对象
const formInline = reactive({
  selectedTopics: [],
  selectedConsumerGroups: [],
})

// 模拟动态获取的主题和消费组选项数据
const options = ref([])
const consumerGroups = ref([])

// 模拟从API或其它异步操作中获取数据
function fetchOptions() {
  setTimeout(() => {
    options.value = [
      { label: 'topic1', value: 'topic1' },
      { label: 'topic2', value: 'topic2' },
      { label: 'topic3', value: 'topic3' },
    ]
    consumerGroups.value = [
      { label: 'group1', value: 'group1' },
      { label: 'group2', value: 'group2' },
      { label: 'group3', value: 'group3' },
    ]
  }, 1000) // 延迟1秒以模拟异步操作
}

// 触发自定义事件通知父组件主题变化
const emit = defineEmits(['searchForm'])

function onSearch() {
  const topicsString = formInline.selectedTopics.join(',')
  const groupsString = formInline.selectedConsumerGroups.join(',')

  console.log('提交查询', formInline)

  // 发送自定义事件给父组件
  emit('searchForm', { topics: topicsString, consumerGroups: groupsString })
}

onMounted(() => {
  fetchOptions() // 在组件挂载后调用
})
</script>

<style scoped></style>
