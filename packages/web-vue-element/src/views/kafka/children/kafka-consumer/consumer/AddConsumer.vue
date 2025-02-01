<template>
  <el-dialog
    :visible="show"
    @close="$emit('close')"
    title="新增消费者"
    width="600px"
  >
    <el-form :model="formData" label-width="100px" ref="formRef">
      <!-- 表单字段 -->
      <el-form-item label="Topic:" required>
        <el-input v-model="formData.topic"></el-input>
      </el-form-item>

      <el-form-item label="GroupId:" required>
        <el-input v-model="formData.groupId"></el-input>
      </el-form-item>

      <el-form-item label="业务属性:">
        <el-input v-model="formData.businessProperty"></el-input>
      </el-form-item>

      <el-form-item label="截止日期:">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.deadline"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { defineProps, defineEmits } from 'vue';

// 定义props属性
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  editMode: Boolean,
  modalData: Object,
});

// 定义emits事件
const emit = defineEmits(['close', 'add', 'update']);

// 初始化表单数据
const formData = ref({
  topic: props.modalData?.topic || '',
  groupId: props.modalData?.groupId || '',
  businessProperty: props.modalData?.businessProperty || '',
  deadline: props.modalData?.deadline || '',
});

// 提交处理函数
function handleSubmit() {
  if (props.editMode) {
    // 编辑模式下的逻辑
    emit('update', formData.value);
  } else {
    // 新增模式下的逻辑
    emit('add', formData.value);
  }
  // 清空表单
  Object.assign(formData.value, {
    topic: '',
    groupId: '',
    businessProperty: '',
    deadline: '',
  });
}
</script>

<style scoped>
/* 使用Tailwind CSS进行基础样式调整 */
.el-dialog__wrapper {
  @apply flex items-center justify-center;
}

.el-dialog {
  @apply rounded-lg shadow-lg;
}

.el-dialog__header {
  @apply bg-gray-100 p-4 rounded-t-lg;
}

.el-dialog__body {
  @apply p-6;
}

.el-dialog__footer {
  @apply p-4 border-t border-gray-200 flex justify-end space-x-2;
}

/* 根据需要添加其他样式 */
</style>
