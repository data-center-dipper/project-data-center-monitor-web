<template>
    <div class="child-a">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <!-- 主题选择部分 -->
            <el-form-item label="主题">
                <el-select v-model="formInline.selectedTopics"
                           multiple
                           placeholder="请选择主题"
                           @change="handleChangeTopics"
                           clearable
                           style="width: 420px;">
                    <el-option v-for="option in options"
                               :key="option.value"
                               :label="option.label"
                               :value="option.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- 消费组选择部分 -->
            <el-form-item label="消费组">
                <el-select v-model="formInline.selectedConsumerGroups"
                           multiple
                           placeholder="请选择消费组"
                           @change="handleChangeConsumerGroups"
                           clearable
                           style="width: 420px;">
                    <el-option v-for="group in consumerGroups"
                               :key="group.value"
                               :label="group.label"
                               :value="group.value">
                    </el-option>
                </el-select>
            </el-form-item>

            <!-- 增加消费组按钮 -->
            <el-form-item>
                <el-button type="primary" style="width: 100px;" @click="onAddItem">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, onMounted } from 'vue';

    // 表单数据对象
    const formInline = reactive({
        selectedTopics: [],
        selectedConsumerGroups: []
    });

    // 模拟动态获取的主题和消费组选项数据
    const options = ref([]);
    const consumerGroups = ref([]);

    // 模拟从API或其它异步操作中获取数据
    function fetchOptions() {
        // 这里可以替换为实际的异步请求
        setTimeout(() => {
            options.value = [
                { label: 'topic1', value: 'topic1' },
                { label: 'topic2', value: 'topic2' },
                { label: 'topic3', value: 'topic3' }
            ];
            consumerGroups.value = [
                { label: 'group1', value: 'group1' },
                { label: 'group2', value: 'group2' },
                { label: 'group3', value: 'group3' }
            ];
        }, 1000); // 延迟1秒以模拟异步操作
    }

    // 触发自定义事件通知父组件主题变化
    const emit = defineEmits(['select-topics', 'select-consumer-groups']);

    function handleChangeTopics() {
        emit('select-topics', formInline.selectedTopics);
    }

    function handleChangeConsumerGroups() {
        emit('select-consumer-groups', formInline.selectedConsumerGroups);
    }

    function onAddItem() {
        console.log('增加消费组');
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