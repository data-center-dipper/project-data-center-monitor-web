<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import cloneDeep from 'lodash/cloneDeep'
import E from 'wangeditor'
import { FormOptions } from './interface.ts'

defineOptions({
  name: 'qx-form',
})

const props = defineProps<{
  // 表单项配置
  options: FormOptions[]
  // 用户自定义的文件上传方法
  httRequest?: () => void
}>()

const emits = defineEmits([
  'on-preview',
  'on-remove',
  'on-success',
  'on-error',
  'on-progress',
  'on-change',
  'before-remove',
  'before-upload',
  'on-exceed',
])

const form = ref<any>(null)

const model = ref(null)
const rules = ref({})

const edit = ref()

const initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop] = item.value
      r[item.prop] = item.rules
      if (item.type === 'editor') {
        // 初始化富文本编辑器
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            editor.create()
            // 初始富文本编辑器内容
            editor.txt.html(item.value)
            // 监听富文本编辑器内容变化, 给表单项赋值
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop] = newHtml
            }
            edit.value = editor
          }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

// 重置表单
const resetFields = () => {
  form.value.resetFields()
  if (props.options && props.options.length) {
    let editorItem = props.options.find((item) => item.type === 'editor')
    edit.value.txt.html(editorItem.value)
  }
}

// 表单验证
const validate = () => {
  return form.value!.validate
}

// 表单数据收集
const getFormData = () => {
  return model.value
}

watch(
  () => props.options,
  () => {
    initForm()
  },
  { deep: true },
)

const onPreview = (file: any) => {
  emits('on-preview', file)
}

const onRemove = (file: any, fileList: any) => {
  emits('on-remove', { file, fileList })
}

const onSuccess = (response: any, file: any, fileList: any) => {
  // 文件上传成功后, 给表单项进行赋值
  let uploadItem = props.options.find((item) => item.type === 'upload')
  model.value[uploadItem.prop] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}

const onError = (err: any, file: any, fileList: any) => {
  emits('on-error', { err, file, fileList })
}

const onProgress = (event: any, file: any, fileList: any) => {
  emits('on-progress', { event, file, fileList })
}

const onChange = (file: any, fileList: any) => {
  emits('on-change', { file, fileList })
}

const beforeRemove = (file: any, fileList: any) => {
  return emits('before-remove', { file, fileList })
}

const beforeUpload = (file: any) => {
  return emits('before-upload', file)
}

const onExceed = (files: any, fileList: any) => {
  emits('on-exceed', { files, fileList })
}

onMounted(() => {
  initForm()
})

defineExpose({
  resetFields,
  validate,
  getFormData,
})
</script>

<template>
  <el-form
    :validate-on-rule-change="false"
    v-bind="$attrs"
    :model="model"
    :rules="rules"
    v-if="model"
    ref="form"
  >
    <template v-for="(item, index) in options" :key="index">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        v-if="!item.children || !item.children.length"
      >
        <component
          v-if="item.type !== 'upload' && item.type !== 'editor'"
          v-bind="item.attrs"
          :is="`el-${item.type!}`"
          v-model="model[item.prop]"
        ></component>
        <el-upload
          v-if="item.type === 'upload'"
          v-bind="item.uploadAttrs"
          :on-preview="onPreview"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-change="onChange"
          :before-remove="beforeRemove"
          :before-upload="beforeUpload"
          :on-exceed="onExceed"
        >
          <!--     文件上传触发区域     -->
          <slot name="uploadTrigger"> </slot>
          <!--     文件上传提示信息     -->
          <slot name="uploadTip"> </slot>
        </el-upload>
        <div v-if="item.type === 'editor'" id="editor"></div>
      </el-form-item>
      <el-form-item
        v-if="item.children && item.children.length"
        :label="item.label"
        :prop="item.prop"
      >
        <component
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="model[item.prop]"
        >
          <component
            v-for="(child, index) in item.children"
            :key="index"
            :label="child.label"
            :value="child.value"
            :is="`el-${child.type}`"
          >
          </component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <!--   将表单实例通过作用域插槽暴露给外部调用其实例方法以及表单收集到的数据   -->
      <slot name="actions" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
