import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useMobileDetection } from '../../hooks'

export const useCommonStore = defineStore('common', () => {
  const isCollapse = ref(false)
  const activeMenu = ref('/kafka/kafka-nodes')
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

  return {
    activeMenu,
    isCollapse,
    toggleCollapse,
    toggleMenu,
    isMobile,
    isMediumScreen,
  }
})
