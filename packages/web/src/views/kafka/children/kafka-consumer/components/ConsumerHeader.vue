<template>
  <div class="child-a">
    <h2>搜索组件</h2>
    <!-- 动态加载下拉菜单选项 -->
    <el-select v-model="localSelectedTopic" placeholder="请选择主题" @change="handleChange">
      <el-option
        v-for="option in options"
        :key="option.value"
        :label="option.label"
        :value="option.value">
      </el-option>
    </el-select>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';

// 模拟动态获取的选项数据
const options = ref([]);

// 本地存储的选中主题
const localSelectedTopic = ref('');

// 模拟从API或其它异步操作中获取数据
function fetchOptions() {
  // 这里可以替换为实际的异步请求
  setTimeout(() => {
    options.value = [
      { label: 'topic1', value: 'topic1' },
      { label: 'topic2', value: 'topic2' },
      { label: 'topic3', value: 'topic3' }
    ];
  }, 1000); // 延迟1秒以模拟异步操作
}

// 触发自定义事件通知父组件主题变化
const emit = defineEmits(['select-topic']);

function handleChange() {
  emit('select-topic', localSelectedTopic.value);
}

onMounted(() => {
  fetchOptions(); // 在组件挂载后调用
});
</script>

<style scoped>
.child-a {
  margin-bottom: 20px;
}
</style>