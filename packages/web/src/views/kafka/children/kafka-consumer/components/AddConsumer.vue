<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <h2>{{ editMode ? '编辑' : '新增' }}消费者</h2>
      <form @submit.prevent="handleSubmit">
        <label>
          主题:
          <input type="text" v-model="formData.topic" required />
        </label>
        <label>
          消费者组ID:
          <input type="text" v-model="formData.groupId" required />
        </label>
        <label>
          业务属性:
          <input type="text" v-model="formData.businessProperty" required />
        </label>
        <label>
          截止日期:
          <input type="date" v-model="formData.deadline" required />
        </label>
        <button type="submit">{{ editMode ? '保存' : '添加' }}</button>
        <button type="button" @click="close">取消</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  show: Boolean,
  editMode: Boolean,
  modalData: Object,
});

const emit = defineEmits(['close', 'add', 'update']);

const formData = ref({ ...props.modalData });

watch(() => props.modalData, newData => {
  formData.value = { ...newData };
}, { deep: true });

function handleSubmit() {
  if (props.editMode) {
    emit('update', formData.value);
  } else {
    emit('add', formData.value);
  }
}

function close() {
  emit('close');
}
</script>

<style scoped>
/* 样式根据需要自行定义 */
</style>