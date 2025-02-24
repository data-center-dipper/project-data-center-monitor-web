<template>
    <div class="topicConsumerShow">
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue';

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