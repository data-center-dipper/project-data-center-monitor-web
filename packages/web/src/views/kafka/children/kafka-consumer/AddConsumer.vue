<template>
  <teleport to="body">
    <transition name="modal">
      <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-content">
          <header class="modal-header">
            <span>新增消费者</span>
            <button class="close-button" @click="$emit('close')">X</button>
          </header>
          <section class="modal-body">
            <form @submit.prevent="handleSubmit">
              <!-- 表单字段 -->
              <label for="topic">Topic:</label>
              <input id="topic" v-model="formData.topic" required />

              <label for="groupId">GroupId:</label>
              <input id="groupId" v-model="formData.groupId" required />

              <label for="businessProperty">业务属性:</label>
              <input id="businessProperty" v-model="formData.businessProperty" />

              <label for="deadline">截止日期:</label>
              <input id="deadline" type="date" v-model="formData.deadline" />
            </form>
          </section>
          <footer class="modal-footer">
            <button @click="$emit('close')">取消</button>
            <button type="submit" @click="handleSubmit">确定</button>
          </footer>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

// 定义props属性
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

// 定义emits事件
const emit = defineEmits(['close', 'add']);

// 定义表单数据对象
const formData = ref({
  topic: '',
  groupId: '',
  businessProperty: '',
  deadline: ''
});

// 提交处理函数
function handleSubmit() {
  // 这里添加提交逻辑，比如发送请求到服务器等
  console.log('提交的数据:', formData.value);
  emit('add', formData.value); // 发送表单数据给父组件
  // 清空表单
  Object.assign(formData.value, {
    topic: '',
    groupId: '',
    businessProperty: '',
    deadline: ''
  });
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.modal-body label {
  display: block;
  margin-bottom: 8px;
}

.modal-body input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  margin-left: 8px;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}
</style>