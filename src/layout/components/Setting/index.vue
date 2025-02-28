<script setup lang="ts">
// TODO: 下一版本进行组件以及逻辑拆分, 暂时写到一起
import { ref, onMounted } from 'vue'
import { mittBus } from '@/utils'
const showDrawer = ref(false)
import {
  containerWidthList,
  boxStyleList,
  mainColorList,
  menuThemeList,
  settingThemeList,
} from '@/config'
import { systemThemeEnum, containerWidthEnum, boxStyleEnum } from '@/enums'
import QxIcon from '@/components/Icon/src/index.vue'
import SettingItemTitle from './components/setting-item-title.vue'
import BasicSettingContainer from './components/basic-setting-container.vue'

const menuOpenWidth = ref(240)
const pageTransition = ref()
const customRadius = ref('0')
const systemThemeMode = ref(systemThemeEnum.AUTO)
const containerWidth = ref('')
const boxStyle = ref('')
const currentMenuTheme = ref('')
const currentSystemTheme = ref('')
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

function setSystemAutoTheme() {}

function initSystemTheme() {
  if (systemThemeMode.value === systemThemeEnum.AUTO) {
    setSystemAutoTheme()
  } else {
  }
}

function setContainerWidth(width: containerWidthEnum) {
  containerWidth.value = width
}

function setBoxStyle(box: boxStyleEnum) {
  boxStyle.value = box
}

function setElementTheme() {}

function setMenuTheme(menuTheme: string) {
  currentMenuTheme.value = menuTheme
}

function setSystemTheme(theme: systemThemeEnum) {
  currentSystemTheme.value = theme
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
      <div class="close-drawer flex justify-end my-[15px]">
        <qx-icon
          icon="close"
          size="1x"
          cursor="pointer"
          @click="closeDrawer"
        ></qx-icon>
      </div>
      <setting-item-title title="主题风格"></setting-item-title>
      <div class="theme-wrap flex gap-2 flex-wrap w-full mt-[25px]">
        <div
          class="item w-[30%]"
          v-for="(item, index) in settingThemeList"
          :key="index"
          @click="setSystemTheme(item.theme)"
        >
          <div
            class="box relative flex h-[50px] overflow-hidden cursor-pointer border-2 border-gray-100 rounded-md shadow-sm transition-shadow duration-100 ease-in-out hover:shadow-lg"
            :class="{
              'border-green-300': currentSystemTheme === item.theme,
            }"
          >
            <div
              :style="{
                background: item.color[0],
              }"
              class="relative w-[50%] h-full"
            >
              <div
                v-for="(cItem, index) in 3"
                :key="index"
                :class="{
                  'mt-[13px]': index === 0,
                  'w-[10px]': index === 1,
                  'w-[13px]': index === 2,
                }"
                :style="{
                  background: item.leftLineColor,
                }"
                class="w-[15px] h-[2px] mt-[5px] ml-[10px]"
              ></div>
            </div>
            <div
              :style="{
                background: index === 2 ? item.color[1] : item.color[0],
              }"
              class="relative w-[50%] h-full"
            >
              <div
                v-for="(cItem, index) in 3"
                :key="index"
                :class="{
                  'w-[calc(100%-15px)]': index === 0,
                  'w-[calc(50%-5px)]': index === 1,
                  'w-[calc(52%)]': index === 2,
                }"
                :style="{
                  background: item.rightLineColor,
                }"
                class="h-[5px] mt-[6px] ml-[5px]"
              ></div>
            </div>
          </div>
          <p></p>
          <div class="dot-wrap w-full flex justify-center h-[13px] mt-[5px]">
            <div
              class="size-[8px] bg-green-300 rounded-full"
              v-show="currentSystemTheme === item.theme"
            ></div>
          </div>
        </div>
      </div>
      <setting-item-title title="菜单布局"></setting-item-title>
      <div></div>
      <setting-item-title title="菜单风格"></setting-item-title>
      <div class="menu-theme-wrap pt-[20px]">
        <div class="flex flex-wrap gap-2">
          <div
            class="item w-[30%] mb-[15px]"
            v-for="(item, index) in menuThemeList"
            :key="index"
            @click="setMenuTheme(item.theme)"
          >
            <div
              class="box relative h-[50px] overflow-hidden cursor-pointer bg-[#f5f7f9] border-2 border-gray-100 rounded-md shadow-sm transition-shadow duration-100 ease-in-out hover:shadow-lg"
              :class="{
                'border-green-300': currentMenuTheme === item.theme,
              }"
            >
              <div
                class="top w-full h-[8px]"
                :style="{
                  background: item.tabBarBackground + '!important',
                }"
              ></div>
              <div
                class="left absolute top-0 left-0 w-[22px] h-full"
                :style="{
                  background: item.background,
                }"
              >
                <div class="absolute top-0 left-0 w-[22px] h-full">
                  <div
                    v-for="(cItem, index) in 3"
                    :key="index"
                    class="h-[2px] mt-[5px] ml-[4px]"
                    :class="{
                      'mt-[15px] w-[15px] ': index === 0,
                      'w-[10px]': index === 1,
                      'w-[13px]': index === 2,
                    }"
                    :style="{ background: item.leftLineColor }"
                  ></div>
                </div>
              </div>
              <div class="right absolute top-0 right-0 w-[46px] h-full">
                <div
                  v-for="(cItem, index) in 3"
                  :key="index"
                  class="h-[6px] mt-[5px] ml-[5px]"
                  :class="{
                    'w-[calc(100%-15px)] mt-[12px]': index === 0,
                    'w-[calc(50%-5px)]': index === 1,
                    'w-[calc(52%)]': index === 2,
                  }"
                  :style="{
                    background: item.rightLineColor,
                  }"
                ></div>
              </div>
            </div>
            <div class="dot-wrap w-full flex justify-center h-[13px] mt-[5px]">
              <div
                class="size-[8px] bg-green-300 rounded-full"
                v-show="currentMenuTheme === item.theme"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <setting-item-title title="系统主题色"></setting-item-title>
      <div class="main-color-wrap my-[20px]">
        <div class="offset flex flex-wrap gap-2 justify-center">
          <div
            v-for="color in mainColorList"
            :key="color"
            class="flex items-center justify-center w-[25px] h-[25px] cursor-pointer rounded-full"
            :style="{ background: `${color}` }"
            @click="setElementTheme(color)"
          ></div>
        </div>
      </div>
      <setting-item-title title="盒子样式"></setting-item-title>
      <div
        class="flex w-full items-center gap-1 p-[4px] my-[20px] bg-gray-200 shadow-sm rounded-[7px]"
      >
        <div
          v-for="(item, index) in boxStyleList"
          :key="index"
          class="flex-1 flex items-center justify-center h-[34px] text-[13px] text-center cursor-pointer select-none rounded-[5px] transition-all duration-100 ease-in-out text-gray-500 hover:text-gray-800 [&:not(.is-active)]:hover:bg-black/[4%]"
          :class="{
            'bg-white text-gray-800 is-active': item.value === boxStyle,
          }"
          @click="setBoxStyle(item.value)"
        >
          {{ item.label }}
        </div>
      </div>
      <setting-item-title title="容器宽度"></setting-item-title>
      <div class="container-width-wrap flex gap-3">
        <div
          v-for="(item, index) in containerWidthList"
          :key="index"
          class="flex flex-1 items-center justify-center h-[60px] mt-[20px] mb-[15px] cursor-pointer border-2 border-[#eaebf1] shadow-sm gap-1"
          :class="{
            'border-green-300': containerWidth === item.value,
          }"
          @click="setContainerWidth(item.value)"
        >
          <qx-icon :icon="item.icon"></qx-icon>
          <span class="text-gray-500 text-[13px]">
            {{ item.label }}
          </span>
        </div>
      </div>
      <setting-item-title title="基础配置"></setting-item-title>
      <div class="basic-config-wrap relative z-10 bg-transparent">
        <BasicSettingContainer title="侧边栏开启手风琴模式">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="显示折叠侧边栏按钮">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="显示重载页面按钮">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="显示全局面包屑导航">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="开启多标签页">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="显示多语言选择">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="显示顶部进度条">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="色弱模式">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="自动关闭设置中心">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="全局水印">
          <template #action>
            <el-switch></el-switch>
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="菜单宽度">
          <template #action>
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
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="页面切换动画">
          <template #action>
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
          </template>
        </BasicSettingContainer>
        <BasicSettingContainer title="自定义圆角">
          <template #action>
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
          </template>
        </BasicSettingContainer>
      </div>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
