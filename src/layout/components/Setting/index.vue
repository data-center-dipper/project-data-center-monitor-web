<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { mittBus } from '@/utils'
const showDrawer = ref(false)
import QxIcon from '@/components/Icon/src/index.vue'

const menuOpenWidth = ref(240)
const pageTransition = ref()
const customRadius = ref('0')
const pageTransitionOps = [
  {
    value: '',
    label: '无动画',
  },
  {
    value: 'fade',
    label: 'fade',
  },
  {
    value: 'slide-right',
    label: 'slide-right',
  },
  {
    value: 'slide-top',
    label: 'slide-top',
  },
  {
    value: 'slide-bottom',
    label: 'slide-bottom',
  },
]
const customRadiusOps = [
  {
    value: '0',
    label: '0',
  },
  {
    value: '0.25',
    label: '0.25',
  },
  {
    value: '0.5',
    label: '0.5',
  },
  {
    value: '0.75',
    label: '0.75',
  },
  {
    value: '1',
    label: '1',
  },
]

function openSetting() {
  showDrawer.value = true
}

function closeDrawer() {
  showDrawer.value = false
}

function setMenuOpenSize(val: number) {
  menuOpenWidth.value = val
}

function setPageTransition(val: string) {}

function setCustomRadius(val: string) {
  customRadius.value = val
}

onMounted(() => {
  mittBus.on('openSetting', openSetting)
})
</script>

<template>
  <el-drawer
    size="300px"
    v-model="showDrawer"
    :lock-scroll="false"
    :with-header="false"
    :before-close="closeDrawer"
    modal-class="setting-modal"
  >
    <div class="drawer-content">
      <!-- 关闭按钮图标 -->
      <div class="close-wrapper flex justify-end mt-[10px]">
        <qx-icon
          icon="close"
          size="1x"
          cursor="pointer"
          @click="closeDrawer"
        ></qx-icon>
      </div>
      <p class="title">主题风格</p>
      <p class="title">菜单布局</p>
      <p class="title">菜单风格</p>
      <p class="title">系统主题色</p>
      <p class="title">盒子样式</p>
      <p class="title">容器宽度</p>
      <p class="title">基础配置</p>
      <div class="basic-config relative z-10 bg-transparent">
        <div class="item flex">
          <span>侧边栏开启手风琴模式</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>显示折叠侧边栏按钮</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>显示重载页面按钮</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>显示全局面包屑导航</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>开启多标签页</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>显示多语言选择</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>显示顶部进度条</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>色弱模式</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>自动关闭设置中心</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>全局水印</span>
          <el-switch></el-switch>
        </div>
        <div class="item flex">
          <span>菜单宽度</span>
          <el-input-number
            :min="180"
            :max="320"
            size="default"
            :step="10"
            style="width: 120px"
            v-model="menuOpenWidth"
            controls-position="right"
            @change="setMenuOpenSize"
          />
        </div>
        <div class="item flex">
          <span>页面切换动画</span>
          <el-select
            v-model="pageTransition"
            placeholder="Select"
            size="default"
            style="width: 120px"
            @change="setPageTransition"
          >
            <el-option
              v-for="item in pageTransitionOps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="item flex">
          <span>自定义圆角</span>
          <el-select
            v-model="customRadius"
            placeholder="Select"
            size="default"
            style="width: 120px"
            @change="setCustomRadius"
          >
            <el-option
              v-for="item in customRadiusOps"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
    </div>
  </el-drawer>
</template>

<style scoped>
/*配置模块标题*/
.title {
  position: relative;
  font-size: 13px;
  color: #000;
  font-weight: 200;
  text-align: center;
}

.title:first-of-type {
  margin-top: 20px;
}

.title::before,
.title::after {
  position: absolute;
  top: 10px;
  width: 50px;
  margin: auto;
  content: '';
  border-bottom: 1px solid #dbdfe9;
}

.title::before {
  left: 0;
}

.title::after {
  right: 0;
}
/*基础配置项*/
.item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 35px;
  color: #000;
  font-weight: 200;
  background: transparent !important;
}
.item span {
  font-size: 14px;
  background: transparent !important;
}
</style>
