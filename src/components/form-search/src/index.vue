<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { Option } from './interface.ts'

interface Props {
  labelWidth?: number | string
  size?: 'small' | 'default' | 'large'
  span?: number
  option: Option[]
  defaultValue?: any
}

type FormInstance = InstanceType<typeof ElForm>

const emit = defineEmits(['search', 'reset'])

const props = withDefaults(defineProps<Props>(), {
  size: 'default',
  span: 8,
  labelWidth: 100,
})

const searchRef = ref<FormInstance>()

// 搜索值
let searchVal: any = reactive({})

// 搜索
const search = () => {
  for (let i in searchVal) {
    if (searchVal[i] === undefined || searchVal[i] === '') {
      delete searchVal[i]
    }
  }
  emit('search', searchVal)
}

// 重置
const reset = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
  // 特别处理日期范围字段
  props.option.forEach((item: any) => {
    if (item.type === 'daterange') {
      searchVal[`${item.prop}Range`] = []
    }
  })
  // 确保清空非form绑定的字段
  Object.keys(searchVal).forEach((key) => {
    searchVal[key] = ''
  })
  emit('search', searchVal)
}

// 级联选择
const changeType = (value: any, data: Option) => {
  if (!value) value = []
  if (value.length > (data.max as number)) {
    searchVal[data.prop] = value.slice(0, 4)
    ElMessage.error('数量限制为4个')
  }
}

// 日期范围选择
const changeDateRange = (item: any) => {
  let dateArr = searchVal[item.prop + 'Range']
  if (dateArr && dateArr.length === 2) {
    searchVal[item.prop] = dateArr[0]
    searchVal[item.endProp] = dateArr[1]
  } else {
    searchVal[item.prop] = ''
    searchVal[item.endProp] = ''
  }
}

onMounted(() => {
  if (props.defaultValue) {
    props.option.forEach((p: any) => {
      // 处理时间范围选择
      if (p.type === 'daterange') {
        if (props.defaultValue[p.prop] && props.defaultValue[p.endProp]) {
          searchVal[p.prop + 'Range'] = [
            props.defaultValue[p.prop],
            props.defaultValue[p.endProp],
          ]
        }
      }
    })
    // 合并默认值
    searchVal = Object.assign(searchVal, props.defaultValue)
  }
})
</script>

<template>
  <div>
    <el-form
      ref="searchRef"
      :size="props.size"
      :model="searchVal"
      :label-width="props.labelWidth"
      v-bind="$attrs.formProps || {}"
    >
      <el-row :gutter="20">
        <el-col
          :xs="24"
          :sm="12"
          :md="12"
          :lg="props.span"
          v-for="(item, index) in props.option"
          :key="index"
          class="mb20"
        >
          <el-form-item
            v-if="item.type == 'input' || !item.type"
            @keyup.enter="search"
            :prop="item.prop"
            :label="item.label"
          >
            <el-input
              v-model="searchVal[item.prop]"
              :placeholder="item.placeholder"
              v-bind="item.elAttrs"
            ></el-input>
          </el-form-item>
          <el-form-item
            v-if="item.type == 'inputSelect'"
            label-width="0"
            :prop="item.prop"
          >
            <el-input
              v-model="searchVal[item.prop]"
              clearable
              :placeholder="item.placeholder"
            >
              <template #prepend>
                <el-select
                  v-model="searchVal[item.inputOptions.prop]"
                  :style="{ width: props.labelWidth + 'px' }"
                  v-bind="item.elAttrs"
                >
                  <el-option
                    v-for="(sItem, sIndex) in item.inputOptions.option"
                    :key="sIndex"
                    :label="sItem.label"
                    :value="sItem.value"
                  ></el-option>
                </el-select>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item
            v-else-if="item.type == 'select'"
            :prop="item.prop"
            :label="item.label"
          >
            <el-select
              v-model="searchVal[item.prop]"
              :filterable="item.filterable"
              :fit-input-width="true"
              style="width: 100%"
              :placeholder="item.placeholder"
              v-bind="item.elAttrs"
            >
              <el-option
                v-for="(sItem, sIndex) in item.option"
                :key="sIndex"
                :label="sItem[item.optionLabel || 'label']"
                :value="sItem[item.optionValue || 'value']"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            v-else-if="item.type == 'cascader'"
            :prop="item.prop"
            :label="item.label"
          >
            <el-cascader
              v-model="searchVal[item.prop]"
              :options="item.option"
              :placeholder="item.placeholder"
              clearable
              :props="{
                value: item.value || 'value',
                label: item.itemLabel || 'label',
                children: item.children || 'children',
                multiple: item.multiple || false,
                emitPath: item.emitPath || false,
                checkStrictly: item.checkStrictly || false,
              }"
              :show-all-levels="item.show || false"
              @change="(val: any) => changeType(val, item)"
              v-bind="item.elAttrs"
            />
          </el-form-item>
          <el-form-item
            v-else-if="item.type == 'date'"
            :prop="item.prop"
            :label="item.label"
          >
            <el-date-picker
              v-model="searchVal[item.prop]"
              type="date"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              :placeholder="item.placeholder"
              style="width: 100%"
              v-bind="item.elAttrs"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            v-else-if="item.type == 'datetime'"
            :prop="item.prop"
            :label="item.label"
          >
            <el-date-picker
              v-model="searchVal[item.prop]"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm"
              format="YYYY-MM-DD HH:mm"
              :placeholder="item.placeholder"
              style="width: 100%"
              v-bind="item.elAttrs"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            v-else-if="item.type == 'daterange'"
            :prop="item.prop"
            :label="item.label"
          >
            <el-date-picker
              v-model="searchVal[`${item.prop}Range`]"
              style="width: 100%"
              type="daterange"
              range-separator="~"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="YYYY-MM-DD"
              format="YYYY-MM-DD"
              @change="changeDateRange(item)"
              v-bind="item.elAttrs"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="props.span">
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset(searchRef)">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
