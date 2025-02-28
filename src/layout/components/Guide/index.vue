<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import QxIcon from '@/components/Icon/src/index.vue'

const router = useRouter()
const popoverRef = ref()

interface Application {
  name: string
  description: string
  icon: string
  iconColor: string
  path: string
}

interface QuickLink {
  name: string
  path: string
}

const applications: Application[] = [
  {
    name: '工作台',
    description: '系统概览与数据统计',
    icon: '',
    iconColor: '#377dff',
    path: '',
  },
  {
    name: '分析页',
    description: '数据分析与可视化',
    icon: '',
    iconColor: '#ff3b30',
    path: '',
  },
  {
    name: '官方文档',
    description: '使用指南与开发文档',
    icon: '',
    iconColor: '#ffb100',
    path: '',
  },
  {
    name: '技术支持',
    description: '技术支持与问题反馈',
    icon: '',
    iconColor: '#ff6b6b',
    path: '',
  },
  {
    name: '更新日志',
    description: '版本更新与变更记录',
    icon: '',
    iconColor: '#38C0FC',
    path: '',
  },
  {
    name: '哔哩哔哩',
    description: '技术分享与交流',
    icon: '',
    iconColor: '#FB7299',
    path: '',
  },
]

const quickLinks: QuickLink[] = [
  { name: '登录', path: '/login' },
  { name: '注册', path: '/register' },
  { name: '忘记密码', path: '/forget-password' },
  { name: '定价', path: '/template/pricing' },
  { name: '个人中心', path: '/user/user' },
]

const handleAppClick = (path: string) => {
  if (path.startsWith('http')) {
    window.open(path, '_blank')
  } else {
    router.push(path)
  }
  popoverRef.value?.hide()
}
</script>

<template>
  <el-popover
    ref="popoverRef"
    :width="700"
    trigger="hover"
    popper-class="fast-enter-popover"
    :show-arrow="false"
    placement="bottom-start"
    :offset="0"
    popper-style="border: 1px solid var(--art-border-dashed-color); border-radius: calc(var(--custom-radius) / 2 + 4px); "
  >
    <template #reference>
      <div class="btn ml-2">
        <qx-icon
          icon="home"
          size="1x"
          cursor="pointer"
          class="bg-transparent p-2 hover:bg-gray-300/80"
          color="#C0C0C0"
        ></qx-icon>
      </div>
    </template>
    <div class="grid grid-cols-4 gap-4">
      <div class="apps-section col-span-3">
        <!-- 左侧应用列表 -->
        <el-scrollbar height="250px">
          <div class="apps-grid grid grid-cols-3 gap-4">
            <div
              class="app-item p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
              v-for="app in applications"
              :key="app.name"
              @click="handleAppClick(app.path)"
            >
              <div class="app-icon">
                <qx-icon :icon="app.icon" :color="app.iconColor"></qx-icon>
              </div>
              <div class="app-info mt-2">
                <h3 class="text-lg font-bold">{{ app.name }}</h3>
                <p class="text-gray-600">{{ app.description }}</p>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <!-- 右侧快速链接  -->
      <div class="quick-links col-span-1">
        <el-scrollbar height="250px">
          <h3 class="font-bold text-gray-800">快速链接</h3>
          <ul class="mt-2">
            <li
              class="p-2 rounded-lg hover:bg-gray-200 cursor-pointer"
              v-for="link in quickLinks"
              :key="link.name"
              @click="handleAppClick(link.path)"
            >
              <span>{{ link.name }}</span>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
  </el-popover>
</template>

<style scoped></style>
