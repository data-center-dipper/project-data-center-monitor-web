<template>
    <div class="topicConsumerShow">
        <h2>展示组件</h2>
        <!-- 根据是否有数据决定显示的内容 -->
        <div v-if="loading">加载中...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else-if="consumers.length > 0">
            <!-- 使用卡片布局展示消费者信息列表 -->
            <ConsumerCard v-for="(consumer, index) in consumers"
                          :key="index"
                          :consumer="consumer" />
            <el-button class="mt-4" style="width: 100%" @click="onAddGroup()">增加消费组</el-button>
        </div>
        <div v-else>
            <p v-if="selectedTopics">请选择一个主题或消费组以查看相关内容。</p>
            <p v-else>没有选择任何主题或消费组。</p>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';
    import ConsumerCard from '@/views/kafka/children/kafka-topic-load/components/ConsumerCard.vue';
    // 其他导入保持不变

    // 定义响应式变量用于状态管理
    const loading = ref(false);
    const error = ref(null);
    const consumers = ref([]); // 初始化为空数组

    // 接收父组件传递的选中主题和消费组
    const props = defineProps({
        selectedTopics: String,
        selectedConsumerGroups: String
    });

    watch(() => [props.selectedTopics], async ([newTopic]) => {
        if (newTopic) {
            await fetchItems(newTopic); // 直接根据新主题获取数据
        }
    }, { immediate: true }); // 立即执行一次监听器

    async function fetchItems(topic) {
        console.warn('收到fetchItems', topic);
        loading.value = true;
        error.value = null;

        try {
            const mockData = {
                topic1: [
                    {
                        topic: 'Topic名称1',
                        groupId: '消费组A1',
                        businessProperty: '业务属性1',
                        lastUpdateTime: new Date().toLocaleString(),
                        deadline: '2025-01-01',
                        isDelayed: true,
                        avgConsumeRate: '100eps'
                    },
                    // 其他模拟数据...
                ],
                topic2: [
                    // 模拟其他主题的数据
                ],
                // 添加更多主题的数据...
            };

            await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟1秒模拟网络请求

            // 直接赋值，不加判断
            consumers.value = mockData[topic] || mockData['topic1']; // 如果没有匹配的数据，则使用topic1的数据

        } catch (err) {
            error.value = err.message || 'Failed to fetch data.';
        } finally {
            loading.value = false;
        }
    }

    function onAddGroup() {
        console.log(`添加新的消费组`);
        // 弹出对话框逻辑保持不变
    }
</script>

<style scoped>
    .topicConsumerShow {
        border-top: 1px solid #ccc;
        padding-top: 20px;
    }

    .mt-4 {
        margin-top: 1rem; /* 或者根据需要调整 */
    }
</style>