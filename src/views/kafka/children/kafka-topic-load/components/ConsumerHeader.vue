<template>
    <div class="child-a">
        <!-- 主题选择部分 -->
        <div>
            <label>主题</label>
            <el-select v-model="selectedTopic"
                       placeholder="请选择主题"
                       @change="onTopicChange"
                       clearable
                       style="width: 420px;">
                <el-option v-for="option in options"
                           :key="option.value"
                           :label="option.label"
                           :value="option.value">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

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

onMounted(() => {
    fetchOptions(); // 在组件挂载后调用
});
</script>