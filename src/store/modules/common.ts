import { watch, ref } from 'vue'
import { defineStore } from 'pinia'
import { useMobileDetection, useRouteChange } from '@/hooks'
import { useRoute } from 'vue-router'

export const useCommonStore = defineStore('common', () => {
  const route = useRoute()
  const isCollapse = ref(false)
  const activeMenu = ref(route.path)

  const { isMobile, isMediumScreen } = useMobileDetection()

  watch(isMediumScreen, (newVal) => {
    isCollapse.value = newVal
  })

  const toggleCollapse = () => {
    isCollapse.value = !isCollapse.value
  }

  const toggleMenu = (menu: string) => {
    activeMenu.value = menu
  }

  useRouteChange((newRoute) => {
    activeMenu.value = newRoute.path // 当路由变化时，更新 activeMenu
  })

  return {
    activeMenu,
    isCollapse,
    toggleCollapse,
    toggleMenu,
    isMobile,
    isMediumScreen,
  }
})
